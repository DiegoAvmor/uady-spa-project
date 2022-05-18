import { TestBed } from '@angular/core/testing';

import { SavedItemService } from './saved-item.service';

describe('SavedItemService', () => {
  let service: SavedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
