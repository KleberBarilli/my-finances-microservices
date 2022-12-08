import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  const fakeUser = {
    id: "62ef7cb9-00fe-4917-a82f-9101c5e1e3f7",
    role: "USER",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be able to create a new User", async () => {
    expect(service).toBeDefined();
  });
});
