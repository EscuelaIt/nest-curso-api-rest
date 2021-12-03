import { Test, TestingModule } from '@nestjs/testing';
import { WorkTimeLogsController } from './work-time-logs.controller';
import { WorkTimeLogsService } from './work-time-logs.service';

describe('WorkTimeLogsController', () => {
  let controller: WorkTimeLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkTimeLogsController],
      providers: [WorkTimeLogsService],
    }).compile();

    controller = module.get<WorkTimeLogsController>(WorkTimeLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
