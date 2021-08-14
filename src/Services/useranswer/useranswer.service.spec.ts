import { Test, TestingModule } from '@nestjs/testing';
import { UseranswerService } from './useranswer.service';

describe('UseranswerService', () => {
  let service: UseranswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseranswerService],
    }).compile();

    service = module.get<UseranswerService>(UseranswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
