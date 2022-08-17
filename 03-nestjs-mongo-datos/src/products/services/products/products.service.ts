import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  update(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`product #${id} no fount`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
