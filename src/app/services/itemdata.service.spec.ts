import { TestBed } from '@angular/core/testing';

import { ItemDataService } from './itemdata.service';

describe('ItemdataService', () => {
  let service: ItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
