import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { YahooComponent } from './pages/login/yahoo.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: YahooComponent },
      { path: 'yahoo', component: YahooComponent },
      { path: 'portal', component: HomeComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YahooRoutingModule {}
