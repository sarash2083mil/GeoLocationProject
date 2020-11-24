import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PopularSearchService {

  rootURL = '/api';
  constructor(private http: HttpClient) { }

  getPopularSearch(){
  return this.http.get(this.rootURL + "/popular-search" );
  }

  getPopularSearchsList(){
    return this.http.get(this.rootURL + "/popular-search-list" );
    }
}
