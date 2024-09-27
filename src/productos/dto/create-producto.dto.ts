//export class CreateProductoDto {}

import {Product} from '@prisma/client'

export type CreateProductoDto = Omit<Product, 'id' | 'createAt' | 'updateAt'>