import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather/LWX', pathMatch: 'full' },
  { path: 'weather/:location', component: WeatherComponent },
  { path: '**', redirectTo: '/weather/LWX' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
