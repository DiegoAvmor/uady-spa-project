import { ResourceDetailsView } from "./views/resource-details-view/resource-details-view.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "./services/api.service";
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ComasListPipe } from "./pipes/comas-list.pipe";
import { NavbarComponent } from "./components/ui/navbar/navbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { AnimesViewComponent } from "./views/animes-view/animes-view.component";
import { MangasViewComponent } from "./views/mangas-view/mangas-view.component";
import { ContactViewComponent } from "./views/contact-view/contact-view.component";
import { SearchViewComponent } from "./views/search-view/search-view.component";
import { NavbarItemLinkComponent } from "./components/ui/navbar-item-link/navbar-link.component";
import { MatInputModule } from "@angular/material/input";
import { NavbarItemButtonComponent } from "./components/ui/navbar-item-button/navbar-button.component";
import { ProfileViewComponent } from "./views/profile-view/profile-view.component";
import { ProfileSavedItemsComponent } from "./components/model/profile-saved-items/profile-saved-items.component";
import { MatTableModule } from "@angular/material/table";
import { SignUpViewComponent } from "./views/sign-up-view/sign-up-view.component";
import { SignInViewComponent } from "./views/sign-in-view/sign-in-view.component";
import { HomeViewComponent } from "./views/home-view/home-view.component";

@NgModule({
  declarations: [
    AppComponent,
    ResourceDetailsView,
    ComasListPipe,
    NavbarComponent,
    AnimesViewComponent,
    MangasViewComponent,
    ContactViewComponent,
    SearchViewComponent,
    NavbarItemLinkComponent,
    NavbarItemButtonComponent,
    ProfileViewComponent,
    ProfileSavedItemsComponent,
    SignUpViewComponent,
    SignInViewComponent,
    HomeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
