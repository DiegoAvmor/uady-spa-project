import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResourceDetailsView } from "./views/resource-details-view/resource-details-view.component";
import { AnimesViewComponent } from "./views/animes-view/animes-view.component";
import { MangasViewComponent } from "./views/mangas-view/mangas-view.component";
import { ContactViewComponent } from "./views/contact-view/contact-view.component";
import { SearchViewComponent } from "./views/search-view/search-view.component";
import { ProfileViewComponent } from "./views/profile-view/profile-view.component";
import { SignUpViewComponent } from "./views/sign-up-view/sign-up-view.component";
import { SignInViewComponent } from "./views/sign-in-view/sign-in-view.component";

const routes: Routes = [
  { path: "resource/:type/:id", component: ResourceDetailsView },
  { path: "animes", component: AnimesViewComponent },
  { path: "mangas", component: MangasViewComponent },
  { path: "contact", component: ContactViewComponent },
  { path: "search", component: SearchViewComponent },
  { path: "users/:username", component: ProfileViewComponent },
  { path: "register", component: SignUpViewComponent },
  { path: "login", component: SignInViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
