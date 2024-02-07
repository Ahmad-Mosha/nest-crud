import { Product } from 'src/products/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
