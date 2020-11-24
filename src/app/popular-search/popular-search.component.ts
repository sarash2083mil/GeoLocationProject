import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDistanceService } from '../services/get-distance.service';
import { PopularSearchService } from '../services/popular-search.service';

@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrls: ['./popular-search.component.scss']
})
export class PopularSearchComponent implements OnInit {

  constructor(private router: Router, private popularSearchService: PopularSearchService,
    private getDistanceService: GetDistanceService) { }
  origin: string;
  destination: string;
  numOfRequests;
  distanceInKm;
  popularSearchesList = [];

  ngOnInit(): void {
    this.getDistance();
    this.getPopularSearch();
    this.getPopularSearchesList();
  }

  getDistance() {
    this.getDistanceService.distanceInKm
      .subscribe((dis) => {
          this.distanceInKm = dis["distance"];
      })
  }

  getPopularSearch() {
    this.popularSearchService.getPopularSearch()
      .subscribe((data) => {
        console.log(data);
        this.origin = data["source"];
        this.destination = data["destination"];
        this.numOfRequests = data["hits"];
        // {source: THE_SOURCE, destination: THE_DESTINATION,
        //   hits: TOTAL_NUMBER_OF_HITS}
      });
  }

  getPopularSearchesList() {
    this.popularSearchService.getPopularSearchsList().subscribe(
      (data) => {
        console.log(data);
        //assign to poular search list
      }
    )
  }

  close() {
    this.router.navigateByUrl('/home');
  }




}
