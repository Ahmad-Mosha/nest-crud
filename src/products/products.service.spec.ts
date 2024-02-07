import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entity/product.entity';
import { User } from '../../src/users/entity/user.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should return all products', async () => {
    const user = new User();
    user.id = 1;
    const product = new Product();
    product.user = user;
    jest.spyOn(repo, 'find').mockResolvedValueOnce([product]);

    expect(await service.findAll(user)).toEqual([product]);
  });

  it('should find one product', async () => {
    const product = new Product();
    product.id = 1;
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(product);

    expect(await service.findOne(1)).toEqual(product);
  });

  it('should create a product', async () => {
    const user = new User();
    user.id = 1;
    const product = new Product();
    product.name = 'Test';
    product.description = 'Test description';
    product.price = 100;
    product.user = user;
    jest.spyOn(repo, 'save').mockResolvedValueOnce(product);

    expect(await service.create(product, user)).toEqual(product);
  });

  it('should remove a product', async () => {
    const user = new User();
    user.id = 1;
    const product = new Product();
    product.id = 1;
    product.user = user;
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(product);
    jest.spyOn(repo, 'remove').mockResolvedValueOnce(undefined);

    await service.remove(1, user);
    expect(repo.remove).toHaveBeenCalledWith(product);
  });

  it('should update a product', async () => {
    const user = new User();
    user.id = 1;
    const product = new Product();
    product.id = 1;
    product.name = 'Test';
    product.description = 'Test description';
    product.price = 100;
    product.user = user;
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(product);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(product);

    expect(await service.update(1, product, user)).toEqual(product);
  });
});
