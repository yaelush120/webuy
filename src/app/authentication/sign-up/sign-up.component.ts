import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "../must-match.validator";
import { SelectItem } from "primeng/components/common/selectitem";
import { Router } from "@angular/router";
import { DALService } from "src/app/Services/DAL.service";
import { MessageService } from "primeng/api";
import { AuthenticationService } from 'src/app/Services/authentication.service.';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  types: SelectItem[];
  // selectedType: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dal: DALService,
    private authService:AuthenticationService,
    private messageService: MessageService
  ) {
    this.types = [{ label: "פרטי", value: 1 }, { label: "עסקי", value: 2 }];
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        userName: ["", Validators.required],
        type: [1, Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required]],
        companyName: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      if (
        this.registerForm.controls.firstName.errors != null ||
        this.registerForm.controls.lastName.errors != null ||
        this.registerForm.controls.userName.errors != null ||
        this.registerForm.controls.type.errors != null ||
        this.registerForm.controls.email.errors != null ||
        this.registerForm.controls.phone.errors != null ||
        (this.registerForm.controls.companyName.errors != null &&
          this.registerForm.controls.type.value == 2) ||
        this.registerForm.controls.password.errors != null ||
        this.registerForm.controls.confirmPassword.errors != null
      ) {
        return;
      }
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
      CompanyName: this.registerForm.controls.companyName.value
    };

    this.authService.saveUser(newUser).subscribe(res => {
      if (res == true) {
        this.messageService.add({
          severity: "success",
          summary: "המשתמש נוסף בהצלחה!",
          detail: ""
        });
      } else {
        this.messageService.add({
          severity: "error",
          summary: "שגיאה בהוספת משתמש!",
          detail: ""
        });
      }
    });
  }

  redirectToHome() {
    this.router.navigate(["/"]);
  }
}
