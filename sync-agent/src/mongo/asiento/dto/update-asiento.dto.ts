// src/mongo/asiento/dto/update-asiento.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAsientoDto } from './create-asiento.dto';

export class UpdateAsientoDto extends PartialType(CreateAsientoDto) {}