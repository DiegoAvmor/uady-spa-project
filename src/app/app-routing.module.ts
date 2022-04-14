import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResourceDetailsView } from "./views/resource-details-view/resource-details-view.component";

const routes: Routes = [
  { path: "resource/:type/:id", component: ResourceDetailsView },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
