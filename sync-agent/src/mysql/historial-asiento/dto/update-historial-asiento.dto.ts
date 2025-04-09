import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialAsientoDto } from './create-historial-asiento.dto';

export class UpdateHistorialAsientoDto extends PartialType(CreateHistorialAsientoDto) {}