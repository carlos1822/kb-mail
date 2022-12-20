import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YahooComponent } from './pages/login/yahoo.component';
import { HttpClientModule } from '@angular/common/http';
import { YahooRoutingModule } from './yahoo-routing.module';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../shared/services/services.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [YahooComponent, HomeComponent],
  imports: [
    CommonModule,
    YahooRoutingModule,
    FormsModule,
    HttpClientModule,
    ServicesModule,
  ],
})
export class YahooModule {}
