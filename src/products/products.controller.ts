import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/users/entity/user.entity';
import { Product } from './entity/product.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { LoggerInterceptor } from 'src/interceptors/logging.interceptors';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggerInterceptor)
  @Post()
  async create(
    @Body() payload: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.create(payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggerInterceptor)
  @Get('all')
  async findAll(@GetUser() user: User) {
    return await this.productService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchProducts(
    @Query('search') search: string,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productService.searchProducts(search, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productService.update(id, payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @GetUser() user: User) {
    return this.productService.remove(id, user);
  }
}
