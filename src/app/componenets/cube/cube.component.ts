import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cube } from '../../model/cube';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  @Input() cube: Cube;
  @Output() cubeClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click() {
    // this.cube.value ="X";
    this.cubeClicked.emit(this.cube);
  }

}
