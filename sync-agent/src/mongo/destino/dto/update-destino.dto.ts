// src/mongo/destino/dto/update-destino.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinoDto } from './create-destino.dto';

export class UpdateDestinoDto extends PartialType(CreateDestinoDto) {}