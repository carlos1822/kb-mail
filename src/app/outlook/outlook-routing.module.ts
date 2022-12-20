import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OutlookComponent } from './pages/login/outlook.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: OutlookComponent },
      { path: 'outlook', component: OutlookComponent },
      { path: 'home', component: HomeComponent },
      { path: 'inicio', component: HomeComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutlookRoutingModule {}
