import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarItemButtonComponent } from './navbar-item-button.component';

describe('NavbarItemButtonComponent', () => {
  let component: NavbarItemButtonComponent;
  let fixture: ComponentFixture<NavbarItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarItemButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
