import { Test, TestingModule } from '@nestjs/testing';
import { AttemptedexamsService } from './attemptedexams.service';

describe('AttemptedexamsService', () => {
  let service: AttemptedexamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttemptedexamsService],
    }).compile();

    service = module.get<AttemptedexamsService>(AttemptedexamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
