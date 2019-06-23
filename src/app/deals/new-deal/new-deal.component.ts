import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-deal',
  templateUrl: './new-deal.component.html',
  styleUrls: ['./new-deal.component.scss']
})
export class NewDealComponent implements OnInit {

  createDealForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createDealForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', [Validators.required]],
      startPrice: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      mainCategory:['', Validators.required],
      subCategory:['', Validators.required]
  });
  }

  get f() { return this.createDealForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createDealForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.createDealForm.value))
}

}
