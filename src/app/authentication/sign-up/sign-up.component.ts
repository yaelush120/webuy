import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "../must-match.validator";
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router } from '@angular/router';
import { DALService } from 'src/app/Services/DAL.service';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
 
    types: SelectItem[];
    // selectedType: string;

  constructor(private formBuilder: FormBuilder,private router: Router,private dal: DALService) {
    this.types = [
      { label: 'פרטי', value: 1 },
      { label: 'עסקי', value: 2 }
  ];
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      let newUser = {
        UserId: null,
        UserName: this.registerForm.controls.userName.value,
        FirstName: this.registerForm.controls.firstName.value,
        lastName: this.registerForm.controls.lastName.value,
        Type: parseInt(this.registerForm.controls.type.value),
        Email: this.registerForm.controls.email.value,
        Phone: this.registerForm.controls.phone.value,
        Password: this.registerForm.controls.password.value,
        CompanyName: 'aaaa'
      };

      this.dal.saveUser(newUser).subscribe(res => {
        alert("משתמש נוסף בהצלחה!");
        this.router.navigate(['/']);
      });
  }
}
