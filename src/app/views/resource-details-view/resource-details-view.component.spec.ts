import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResourceDetailsView } from "./resource-details-view.component";

describe("ResourceDetailsComponent", () => {
  let component: ResourceDetailsView;
  let fixture: ComponentFixture<ResourceDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceDetailsView],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
