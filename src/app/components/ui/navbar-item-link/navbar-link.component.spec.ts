import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavbarItemLinkComponent } from "./navbar-link.component";

describe("NavbarItemLinkComponent", () => {
  let component: NavbarItemLinkComponent;
  let fixture: ComponentFixture<NavbarItemLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarItemLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
