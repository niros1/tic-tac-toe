import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeComponent } from './cube.component';
import { Cube } from '../../model/cube';

fdescribe('CubeComponent', () => {
  let component: CubeComponent;
  let fixture: ComponentFixture<CubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CubeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeComponent);
    component = fixture.componentInstance;
    component.cube = new Cube();
    component.cube.index = 0;
    component.cube.value = 'x';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
