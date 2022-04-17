import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSavedItemsComponent } from './profile-saved-items.component';

describe('ProfileSavedItemsComponent', () => {
  let component: ProfileSavedItemsComponent;
  let fixture: ComponentFixture<ProfileSavedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSavedItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSavedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
