import { Test, TestingModule } from '@nestjs/testing';
import { RentingRequestController } from './renting-request.controller';

describe('RentingRequestController', () => {
  let controller: RentingRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentingRequestController],
    }).compile();

    controller = module.get<RentingRequestController>(RentingRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
