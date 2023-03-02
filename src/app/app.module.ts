import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PantryComponent } from './components/edit-pantry/edit-pantry.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchRecipesService } from './services/search-recipes.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChildSearchRecipeComponent } from './child-search-recipe/child-search-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    PantryComponent,
    RecipesComponent,
    FavoritesComponent,
    PageNotFoundComponent,
    ChildSearchRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [SearchRecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
