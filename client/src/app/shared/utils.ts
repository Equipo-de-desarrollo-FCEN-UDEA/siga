import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";


export class CustomValidators {
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        return password?.value === confirmPassword?.value ? null : { notmatched: true };
    }
}