import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayApiDataComponent } from './display-api-data/display-api-data.component';

const routes: Routes = [
  {path:'', component: DisplayApiDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
