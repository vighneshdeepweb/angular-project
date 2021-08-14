import { TestBed } from '@angular/core/testing';

import { ExcelExportService } from './excel-export.service';

describe('ExcelExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelExportService = TestBed.get(ExcelExportService);
    expect(service).toBeTruthy();
  });
});
