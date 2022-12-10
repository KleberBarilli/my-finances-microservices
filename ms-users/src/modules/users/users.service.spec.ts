import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../prisma/prisma.service";
import { UsersRepository } from "./repositories/users-repository";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  // let prisma: PrismaService;
  const fakeUser = {
    id: "62ef7cb9-00fe-4917-a82f-9101c5e1e3f7",
    role: "USER",
    name: "Kleber",
    email: "kleber@gmail.com",
    password: "1223466",
  };

  const prismaMock = {
    post: {
      create: jest.fn().mockReturnValue(fakeUser),
      // findMany: jest.fn().mockResolvedValue(fakePosts),
      // findUnique: jest.fn().mockResolvedValue(fakePosts[0]),
      // update: jest.fn().mockResolvedValue(fakePosts[0]),
      // delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    // prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to create a new User", async () => {
    const response = await service.create(fakeUser);

    expect(response).toBe(fakeUser);
    // expect(prisma.user.create).toHaveBeenCalledTimes(1);
    // expect(prisma.user.create).toHaveBeenCalledWith({
    //   data: fakeUser,
    // });
  });
});
