import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangasViewComponent } from './mangas-view.component';

describe('MangasViewComponent', () => {
  let component: MangasViewComponent;
  let fixture: ComponentFixture<MangasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangasViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
