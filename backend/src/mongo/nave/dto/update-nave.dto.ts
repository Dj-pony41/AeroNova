// src/mongo/nave/dto/update-nave.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateNaveDto } from './create-nave.dto';

export class UpdateNaveDto extends PartialType(CreateNaveDto) {}