import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { User, UserRole } from 'src/users/entity/user.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            searchProducts: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      description: 'Test description',
      price: 100,
    };
    const user: User = {
      id: 1,
      username: 'Test',
      password: 'Test',
      role: UserRole.USER,
      products: [],
      // add other user properties here
    };
    const product: Product = {
      id: 1,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      user: user,
      // add other product properties here
    };

    jest.spyOn(service, 'create').mockResolvedValueOnce(product);

    expect(await controller.create(dto, user)).toBe(product);
  });

  it('should return all products', async () => {
    const user: User = {
      id: 1,
      username: 'Test',
      password: 'Test',
      role: UserRole.USER,
      products: [],
      // add other user properties here
    };
    const result: Product[] = [];

    jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);

    expect(await controller.findAll(user)).toBe(result);
  });

  it('should search products', async () => {
    const user: User = {
      id: 1,
      username: 'Test',
      password: 'Test',
      role: UserRole.USER,
      products: [],
      // add other user properties here
    };
    const result: Product[] = [];

    jest.spyOn(service, 'searchProducts').mockResolvedValueOnce(result);

    expect(await controller.searchProducts('test', user)).toBe(result);
  });

  it('should update a product', async () => {
    const dto: UpdateProductDto = {
      name: 'Test',
      description: 'Test description',
      price: 100,
    };
    const user: User = {
      id: 1,
      username: 'Test',
      password: 'Test',
      role: UserRole.USER,
      products: [],
      // add other user properties here
    };
    const result: Product = {
      id: 1,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      user: user,
      // add other product properties here
    };

    jest.spyOn(service, 'update').mockResolvedValueOnce(result);

    expect(await controller.update(1, dto, user)).toBe(result);
  });

  it('should remove a product', async () => {
    const user: User = {
      id: 1,
      username: 'Test',
      password: 'Test',
      role: UserRole.ADMIN,
      products: [],
      // add other user properties here
    };

    jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);
    await expect(controller.delete(1, user)).resolves.not.toThrow();
  });
});
