import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesViewComponent } from './animes-view.component';

describe('AnimesViewComponent', () => {
  let component: AnimesViewComponent;
  let fixture: ComponentFixture<AnimesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
