import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string): Date {
    const date = new Date(value);

    // Validar si la fecha es válida
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Invalid date format: '${value}'. Must be a valid ISO 8601 date string.`);
    }

    return date; // Aquí hacemos la transformación del string a Date
  }
}


