// import { Component, OnInit, Inject } from '@angular/core';
// import { Router } from '@angular/router';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// @Component({
//   selector: 'app-general-modal',
//   template: `
//   <button [mat-dialog-close] class="close" aria-label="Close">
//     <span aria-hidden="true" style='font-size: 30px;'>&times;</span>
//   </button>
//   <div>
//     <router-outlet></router-outlet>
//   </div>`,
//   styles: [`
  
//   `]
// })
// export class GeneralModalComponent implements OnInit {

//   constructor(public dialogRef: MatDialogRef<GeneralModalComponent>, private router: Router,
//   @Inject(MAT_DIALOG_DATA) public data:any) {
    
//   }

//   ngOnInit() {

//     // this.router.navigate(['/'+this.data.url+'/'+this.data.id]);
//     this.router.navigate(['/'+this.data.url]);
//   }

//   ngOnDestroy()
//   {
//     this.router.navigateByUrl('/'+this.data.origion);
//   }

// }