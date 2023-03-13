import { Test, TestingModule } from '@nestjs/testing';
import { RentingRequestService } from './renting-request.service';

describe('RentingRequestService', () => {
  let service: RentingRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentingRequestService],
    }).compile();

    service = module.get<RentingRequestService>(RentingRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
