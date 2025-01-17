import { Injectable, Logger,OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductusService');

  onModuleInit() {
    
    this.$connect();
    this.logger.log('Datebase connected');
  }


  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    });
    
  }


  async findAll(paginationDto: PaginationDto ) {

    const {page, limit} = paginationDto;

    const totalPages = await this.product.count();
    const lastPages = Math.ceil( totalPages / limit);
 

    return {
      data: await this.product.findMany({
      skip: (page -1) * limit,
      take: limit
    }) ,
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPages,
      }
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} product`;
  }


  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }


  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
