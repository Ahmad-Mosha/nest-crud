import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/users/entity/user.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(user: User): Promise<Product[]> {
    if (!user) {
      throw new Error('User is not defined');
    }
    return this.productsRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async findByUser(user: User): Promise<Product[]> {
    return this.productsRepository.find({ where: { user } });
  }

  async searchProducts(search: string, user: User): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');

    query.where('product.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(product.name) LIKE LOWER(:search)', {
            search: `%${search}%`,
          }).orWhere('LOWER(product.description) LIKE LOWER(:search)', {
            search: `%${search}%`,
          });
        }),
      );
    }

    const products = await query.getMany();
    return products;
  }

  async create(product: CreateProductDto, user: User): Promise<Product> {
    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.user = user;
    return this.productsRepository.save(newProduct);
  }

  async remove(id: number, user: User): Promise<void> {
    const foundProduct = await this.productsRepository.findOne({
      where: { id, user },
    });

    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }

    await this.productsRepository.remove(foundProduct);
  }

  async update(id: number, product: UpdateProductDto, user: User) {
    const foundProduct = await this.productsRepository.findOne({
      where: { id, user },
    });

    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }

    foundProduct.name = product.name;
    foundProduct.description = product.description;
    foundProduct.price = product.price;

    return this.productsRepository.save(foundProduct);
  }
}
