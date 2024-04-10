import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Advent } from '../advent.model';
import { AdventService } from '../advent.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'lol-advent-edit',
  templateUrl: './advent-edit.component.html',
  styleUrl: './advent-edit.component.css'
})
export class AdventEditComponent implements OnInit {
  originalAdvent: Advent;
  advent: Advent;
  editMode: boolean = false;

  constructor(private adventService: AdventService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe ((params: Params) => {
        // Get the id from the currently active route
        const id = params["id"];
        if (id === undefined || id === null) {
          // No id was found therefore a new advent is being added
          this.editMode = false;
          return;
        }

        // Get existing advent
        this.originalAdvent = this.adventService.getAdvent(id);

        if (this.originalAdvent === undefined || this.originalAdvent === null) {
          // The requested document does not exist
          return;
        }

        // Advent was found and is set to edit
        this.editMode = true;
        // Clone an object: https://www.freecodecamp.org/news/clone-an-object-in-javascript/
        // this.advent = { ...this.originalAdvent }
        this.advent = JSON.parse(JSON.stringify(this.originalAdvent));
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let advent = form.value;
    let newAdvent = new Advent("", advent.name, advent.description, advent.link, advent.timestamp);

    if (this.editMode == true) {
      // Update takes care of assigning the new id
      this.adventService.updateAdvent(this.originalAdvent, newAdvent);
    }
    else {
      // Add a new advent
      this.adventService.addAdvent(newAdvent)
    }

    this.router.navigate(["/advents"]);
  }

  onCancel() {
    this.router.navigate(["/advents"]);
  }
}
