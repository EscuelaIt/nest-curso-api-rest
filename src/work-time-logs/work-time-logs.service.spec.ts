import { Test, TestingModule } from '@nestjs/testing';
import { WorkTimeLogsService } from './work-time-logs.service';

describe('WorkTimeLogsService', () => {
  let service: WorkTimeLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkTimeLogsService],
    }).compile();

    service = module.get<WorkTimeLogsService>(WorkTimeLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
