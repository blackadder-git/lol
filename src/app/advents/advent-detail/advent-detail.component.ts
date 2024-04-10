import { Component } from '@angular/core';
import { Advent } from '../advent.model';
import { AdventService } from '../advent.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'lol-advent-detail',
  templateUrl: './advent-detail.component.html',
  styleUrl: './advent-detail.component.css'
})
export class AdventDetailComponent {
  advent: Advent;

  constructor(private adventService: AdventService, 
              private router: Router, 
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.advent = this.adventService.getAdvent(params["id"]);
    });
  }

  onDelete() {
    this.adventService.deleteAdvent(this.advent);
    this.router.navigateByUrl("/advents");
  }
}