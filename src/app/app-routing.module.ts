import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'initial',
    pathMatch: 'full',
  },
  {
    path: 'init',
    component: InitialComponent,
  },
  {
    path: 'initial',
    component: InitialComponent,
  },
  {
    path: 'outlook',
    component: InitialComponent,
  },
  {
    path: 'yahoo',
    component: InitialComponent,
  },
  {
    path: 'information',
    component: InformationComponent,
  },

  // OUTLOOK ROUTES
  {
    path: 'live',
    loadChildren: () =>
      import('./outlook/outlook.module').then((m) => m.OutlookModule),
  },
  // END

  // YAHOO ROUTES
  {
    path: 'mail',
    loadChildren: () =>
      import('./yahoo/yahoo.module').then((m) => m.YahooModule),
  },
  // END

  { path: '**', component: InitialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
