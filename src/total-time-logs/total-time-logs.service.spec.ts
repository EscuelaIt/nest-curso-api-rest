import { Test, TestingModule } from '@nestjs/testing';
import { TotalTimeLogsService } from './total-time-logs.service';

describe('TotalTimeLogsService', () => {
  let service: TotalTimeLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotalTimeLogsService],
    }).compile();

    service = module.get<TotalTimeLogsService>(TotalTimeLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
