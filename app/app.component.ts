import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

  /** Error when invalid control is dirty, touched, or submitted. */
export class ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    registerForm: FormGroup;
    matcher = new ErrorStateMatcher().isErrorState;


    constructor(private formBuilder: FormBuilder) { 
       this.registerForm = this.formBuilder.group({
            firstName: ['', { validators: Validators.required, asyncValidators: this.testValidation() }],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        console.log("this.registerForm ", this.registerForm);
    }

    testValidation = () => {
      return (control: FormControl) => { 
          return of(null).pipe(
            delay(2000),
            tap(() => console.log("test validation returned"))
          )
      }
    }
    

    onSubmit() {
        console.log("this.registerForm ", this.registerForm);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }
}
