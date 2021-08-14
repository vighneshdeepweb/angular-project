import { Test, TestingModule } from '@nestjs/testing';
import { AssignexamService } from './assignexam.service';

describe('AssignexamService', () => {
  let service: AssignexamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignexamService],
    }).compile();

    service = module.get<AssignexamService>(AssignexamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
