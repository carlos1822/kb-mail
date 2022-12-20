import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      let part1 = 'https://login.y';
      let part2 = 'ahoo.com/';
      document.location.href = `${part1}${part2}`;
    }, 5000);
  }
}
