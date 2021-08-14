import { Test, TestingModule } from '@nestjs/testing';
import { CommonserviceService } from './commonservice.service';

describe('CommonserviceService', () => {
  let service: CommonserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonserviceService],
    }).compile();

    service = module.get<CommonserviceService>(CommonserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
