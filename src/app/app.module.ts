import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistanceFormComponent } from './distance-form/distance-form.component';
import { CommonModule } from '@angular/common';
import { GetDistanceService } from './services/get-distance.service';
import { PopularSearchComponent } from './popular-search/popular-search.component';
import { PopularSearchService } from './services/popular-search.service';
import { ListItemComponent } from './popular-search/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DistanceFormComponent,
    PopularSearchComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GetDistanceService,
    PopularSearchService
  ],
  entryComponents: [
    ListItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
