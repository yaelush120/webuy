import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateValidator } from "src/app/general/Date.validator";
import { DALService } from "src/app/Services/DAL.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-new-deal",
  templateUrl: "./new-deal.component.html",
  styleUrls: ["./new-deal.component.scss"],
  providers: [MessageService]
})
export class NewDealComponent implements OnInit {
  createDealForm: FormGroup;
  submitted = false;

  dueDateCal: Date;
  minDate:Date;
  maxDate:Date;

  AllCategories: any;
  Categories1: any;
  Categories2: any;
  Categories3: any;
  dealImages: any;
  imagesFiles: any;
  newDeal: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private dal: DALService,
    private router: Router,
    private messageService: MessageService
  ) {
 
    let currDate1=new Date();
    this.minDate=currDate1;
    this.minDate.setDate(this.minDate.getDate() + 6);

    let currDate2=new Date();
    this.maxDate=currDate2;
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  ngOnInit() {
    this.createDealForm = this.formBuilder.group({
      name: ["", Validators.required],
      dueDate: [null],
      description: ["", Validators.required],
      startPrice: ["", [Validators.required]],
      category1: ["0"],
      category2: ["0"],
      category3: ["0"]
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

    this.newDeal.DealId = null;
    this.newDeal.Name = this.createDealForm.controls.name.value;
    this.newDeal.Description = this.createDealForm.controls.description.value;
    this.newDeal.DueDate = this.dueDateCal;
    this.newDeal.StartPrice = parseInt(
      this.createDealForm.controls.startPrice.value
    );
    this.newDeal.Category1 = parseInt(
      this.createDealForm.controls.category1.value.categoryId
    );
    this.newDeal.Category2 = parseInt(
      this.createDealForm.controls.category2.value.categoryId
    );
    this.newDeal.Category3 = parseInt(
      this.createDealForm.controls.category3.value.categoryId
    );

    this.dal.uploadImages(this.imagesFiles);

    this.dal.saveDeal(this.newDeal).subscribe(res => {
      if (res == true) {
        this.messageService.add({
          severity: "success",
          summary: "הדיל נוסף בהצלחה!",
          detail: ""
        });
      } else {
        this.messageService.add({
          severity: "error",
          summary: "הוספת הדיל נכשלה!",
          detail: ""
        });
      }
    });
  }

  redirectToHome() {
    this.router.navigate(["/"]);
  }

  public uploadFile = event => {
    if (event.files.length === 0) {
      return;
    }

    for (let i = 0; i < event.files.length; i++) {
      switch (i) {
        case 0: {
          this.newDeal.img1 = event.files[i].name;
          break;
        }

        case 1: {
          this.newDeal.img2 = event.files[i].name;
          break;
        }

        case 2: {
          this.newDeal.img3 = event.files[i].name;
          break;
        }

        case 3: {
          this.newDeal.img4 = event.files[i].name;
          break;
        }
      }
    }
    this.imagesFiles = event.files;
  };
}
