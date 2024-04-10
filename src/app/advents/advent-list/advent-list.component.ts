import { Component, OnInit, OnDestroy } from '@angular/core';
import { Advent } from '../advent.model';
import { AdventService } from '../advent.service';
import { Subscription } from 'rxjs';
// import { AdventsFilterPipe } from '../advents-filter.pipe';

@Component({
  selector: 'lol-advent-list',
  templateUrl: './advent-list.component.html',
  styleUrl: './advent-list.component.css'
})
export class AdventListComponent implements OnInit, OnDestroy {
  advents: Advent[] = [];
  private subscription: Subscription;
  // term: string = "";

  constructor(private adventService: AdventService) {}

  ngOnInit(): void {

    // listen for the adventListChangedEvent, when it happens, get a list of advents
    this.subscription = this.adventService.adventListChangedEvent
    .subscribe(
      (advents: Advent[]) => {
        this.advents = advents;
        console.log("All Advents in list", this.advents);
      }
    );

    // load advents
    this.adventService.getAdvents();
  }

  /*search(value: string) {
    console.log("search:", value);
    this.term = value;
  }*/

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("destroy the subscription");
      this.subscription.unsubscribe();
    }
  }
}