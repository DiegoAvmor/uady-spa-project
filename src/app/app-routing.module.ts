import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResourceDetailsView } from "./views/resource-details-view/resource-details-view.component";
import { AnimesViewComponent } from "./views/animes-view/animes-view.component";
import { MangasViewComponent } from "./views/mangas-view/mangas-view.component";
import { ContactViewComponent } from "./views/contact-view/contact-view.component";
import { SearchViewComponent } from "./views/search-view/search-view.component";

const routes: Routes = [
  { path: "resource/:type/:id", component: ResourceDetailsView },
  { path: "animes", component: AnimesViewComponent },
  { path: "mangas", component: MangasViewComponent },
  { path: "contact", component: ContactViewComponent },
  { path: "search", component: SearchViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
