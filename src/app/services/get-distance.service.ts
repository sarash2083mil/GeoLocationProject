import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetDistanceService {

  rootURL = '/api';
  distanceInKm = new Subject();

  constructor(private http: HttpClient) { }
  getDistance(source: string, destination: string) {
    return this.http.get(this.rootURL + '/distance?source=' + source + '&destination=' + destination)
      .pipe(
        map(data => this.distanceInKm.next(data['distance'])),
        catchError(err => this.handleError(err))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
