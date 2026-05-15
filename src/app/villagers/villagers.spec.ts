import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Villagers } from './villagers';

describe('Villagers', () => {
  let component: Villagers;
  let fixture: ComponentFixture<Villagers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Villagers],
    }).compileComponents();

    fixture = TestBed.createComponent(Villagers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
