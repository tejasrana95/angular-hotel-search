import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'app', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule) },
  {
    path: '**',
    redirectTo: '/app',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
