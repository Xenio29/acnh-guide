import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandCreate } from './island-create';

describe('IslandCreate', () => {
  let component: IslandCreate;
  let fixture: ComponentFixture<IslandCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IslandCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(IslandCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
