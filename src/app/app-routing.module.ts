import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DistanceFormComponent } from './distance-form/distance-form.component'
import { PopularSearchComponent } from './popular-search/popular-search.component';
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: DistanceFormComponent },
  { path: "popular-search", component: PopularSearchComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
