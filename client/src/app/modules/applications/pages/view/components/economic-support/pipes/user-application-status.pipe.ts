import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userApplicationStatus'
})
export class UserApplicationStatusPipe implements PipeTransform {

  transform(value: unknown): string {
    switch (value) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Aprobada';
      case 2:
        return 'Rechazada';
      default:
        return '';
    }
  }

}
