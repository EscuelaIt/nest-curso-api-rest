import { Test, TestingModule } from '@nestjs/testing';
import { TotalTimeLogsController } from './total-time-logs.controller';
import { TotalTimeLogsService } from './total-time-logs.service';

describe('TotalTimeLogsController', () => {
  let controller: TotalTimeLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalTimeLogsController],
      providers: [TotalTimeLogsService],
    }).compile();

    controller = module.get<TotalTimeLogsController>(TotalTimeLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
