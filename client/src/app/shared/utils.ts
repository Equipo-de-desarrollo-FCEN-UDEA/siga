import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Holiday } from '@interfaces/holiday';

export class CustomValidators {
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password?.value === confirmPassword?.value
      ? null
      : { notmatched: true };
  }
}

export function LaboralDays(
  startDate: Date,
  endDate: Date,
  holidays: Holiday[]
): number {
  var result = 0;
  var currentDate = startDate;

  while (currentDate <= endDate) {
    var weekDay = currentDate.getDay();

    // Si es fin de semana no cuenta como día laboral
    if (weekDay == 5 || weekDay == 6) {
      currentDate.setDate(currentDate.getDate() + 1);
      continue;
    } else {
      let aux = 1;
      holidays.forEach((element) => {
        if (
          new Date(currentDate).toUTCString() ==
          new Date(element.holiday_date).toUTCString()
        ) {
          // Si es festivo no se tiene en cuenta como día laboral
          aux = 0;
        }
      });

      currentDate.setDate(currentDate.getDate() + 1);
      // van sumando los días laborales
      result = result + aux;
    }
  }
  return result;
}

export function lastElement(elements: any[]): any {
  return elements[elements.length - 1];
}
