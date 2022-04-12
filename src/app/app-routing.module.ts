import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';

const routes: Routes = [
  {path:"resource/:type/:id", component:ResourceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
