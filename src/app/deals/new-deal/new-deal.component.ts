import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateValidator } from "src/app/general/Date.validator";
import { DALService } from "src/app/Services/DAL.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-new-deal",
  templateUrl: "./new-deal.component.html",
  styleUrls: ["./new-deal.component.scss"]
})
export class NewDealComponent implements OnInit {
  createDealForm: FormGroup;
  submitted = false;

  AllCategories: any;
  Categories1: any;
  Categories2: any;
  Categories3: any;
  dealImages: any;

  constructor(private formBuilder: FormBuilder, private dal: DALService,private router: Router) {}

  ngOnInit() {
    this.createDealForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      startPrice: ["", [Validators.required]],
      dueDate: ["", [Validators.required, DateValidator]],
      category1: ["0", Validators.required],
      category2: ["0", Validators.required],
      category3: ["0", Validators.required]
    });

    this.dal.getAllCategories().then(x => {
      this.AllCategories = x;
      this.Categories1 = x
        .filter(x => x.level == 1)
        .sort((a, b) => (a.name < b.name ? 1 : -1));
    });
  }

  onSelect1(event) {
    let parentVal = this.Categories1[event.selectedIndex - 1].categoryId;
    this.Categories2 = this.AllCategories.filter(
      x => x.level == 2 && x.parentId == parentVal
    ).sort((a, b) => (a.name < b.name ? 1 : -1));
  }

  onSelect2(event) {
    let parentVal = this.Categories2[event.selectedIndex - 1].categoryId;
    this.Categories3 = this.AllCategories.filter(
      x => x.level == 3 && x.parentId == parentVal
    ).sort((a, b) => (a.name < b.name ? 1 : -1));
  }

  get f() {
    return this.createDealForm.controls;
  }

  myUploader(event) {
    this.dealImages = event.files;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createDealForm.invalid) {
      return;
    }

    let newDeal = {
      DealId: null,
      Name: this.createDealForm.controls.name.value,
      Description: this.createDealForm.controls.description.value,
      DueDate: this.createDealForm.controls.dueDate.value,
      StartPrice: parseInt(this.createDealForm.controls.startPrice.value),
      Category1: parseInt(this.createDealForm.controls.category1.value.categoryId),
      Category2: parseInt(this.createDealForm.controls.category2.value.categoryId),
      Category3: parseInt(this.createDealForm.controls.category3.value.categoryId),
      Img1: null,
      Img2: null,
      Img3: null,
      Img4: null
    };

    // if (this.dealImages.length > 0) {
    //   newDeal.img1 = this.dealImages[0].objectURL.changingThisBreaksApplicationSecurity;
    //   if (this.dealImages.length > 1) {
    //     newDeal.img2 = this.dealImages[1].objectURL.changingThisBreaksApplicationSecurity;
    //   }
    //   if (this.dealImages.length > 2) {
    //     newDeal.img3 = this.dealImages[2].objectURL.changingThisBreaksApplicationSecurity;
    //   }
    //   if (this.dealImages.length > 3) {
    //     newDeal.img4 = this.dealImages[3].objectURL.changingThisBreaksApplicationSecurity;
    //   }
    // }

    this.dal.saveDeal(newDeal).subscribe(res => {
      alert("הדיל נוסף בהצלחה!");
      this.router.navigate(['/']);
    });
  }
}
