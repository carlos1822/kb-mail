import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutlookRoutingModule } from './outlook-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from '../shared/services/services.module';
import { OutlookComponent } from './pages/login/outlook.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [OutlookComponent, HomeComponent],
  imports: [
    CommonModule,
    OutlookRoutingModule,
    FormsModule,
    HttpClientModule,
    ServicesModule,
  ],
})
export class OutlookModule {}
