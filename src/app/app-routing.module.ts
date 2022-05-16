import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResourceDetailsView } from "./views/resource-details-view/resource-details-view.component";
import { ContactViewComponent } from "./views/contact-view/contact-view.component";
import { SearchViewComponent } from "./views/search-view/search-view.component";
import { ProfileViewComponent } from "./views/profile-view/profile-view.component";
import { SignUpViewComponent } from "./views/sign-up-view/sign-up-view.component";
import { SignInViewComponent } from "./views/sign-in-view/sign-in-view.component";

const routes: Routes = [
  //User routes
  { path: "resource/:type/:id", component: ResourceDetailsView },
  { path: "contact", component: ContactViewComponent },
  { path: "search", component: SearchViewComponent },
  { path: "users/:username", component: ProfileViewComponent },
  { path: "signup", component: SignUpViewComponent },
  { path: "signin", component: SignInViewComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeViewComponent },
  //Admin routes
  { path: "admin/users/list", component: AdminViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
