import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [ProductosModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
