// src/mongo/vuelo/dto/update-vuelo.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateVueloDto } from './create-vuelo.dto';

export class UpdateVueloDto extends PartialType(CreateVueloDto) {}