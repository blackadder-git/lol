import { Component, Input } from '@angular/core';
import { Advent } from '../advent.model';

@Component({
  selector: 'lol-advent-item',
  templateUrl: './advent-item.component.html',
  styleUrl: './advent-item.component.css'
})
export class AdventItemComponent {
  @Input() advent: Advent;
}
