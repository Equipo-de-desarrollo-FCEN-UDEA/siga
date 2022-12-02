import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";


export class CustomValidators {
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        return password?.value === confirmPassword?.value ? null : { notmatched: true };
    }
}


export function LaboralDays(startDate : Date, endDate : Date): number {
    var result = 0;
    var currentDate = startDate;
    while (currentDate <= endDate)  {  

        var weekDay = currentDate.getDay();
        if(weekDay == 5 || weekDay == 6)
        {
            currentDate.setDate(currentDate.getDate()+1);
            continue
        } else {
            currentDate.setDate(currentDate.getDate()+1);
            result+=1;
        }
            
    }
    return result;
}


export function lastElement(elements:any[]):any{
    return elements[elements.length-1]
} 
