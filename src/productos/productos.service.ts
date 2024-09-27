import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Prisma} from '@prisma/client'

@Injectable()
export class ProductosService {

  constructor(private prismaSerice: PrismaService) {}

  async create(createProductoDto: CreateProductoDto) {
    try{
      return await this.prismaSerice.product.create({
        data: createProductoDto,
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === "P2002"){
          throw new ConflictException(
            `Product with name ${createProductoDto.name} already exists`,
          );
        }
      }
    }
  }

  findAll() {
    return this.prismaSerice.product.findMany()
  }

  async findOne(id: number) {
    const productFound = await this.prismaSerice.product.findUnique({
      where:{
        id: id
      }
    })

    if (!productFound){
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return productFound;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const productFound = await this.prismaSerice.product.update({
      where: {
        id
      },
      data: updateProductoDto
    })

    if(!productFound){
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return productFound;
  }

  async remove(id: number) {
    const deleteProduct = await this.prismaSerice.product.delete({
      where: {
        id
      }
    })
    if (!deleteProduct){
      throw new NotFoundException('Product with id ${id} not found');
    }
    return deleteProduct;
  }
}
