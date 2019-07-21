import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealComponent } from '../deals/deal/deal.component';
import { DealListComponent } from '../deals/deal-list/deal-list.component';
import { DealDetailsComponent } from '../deals/deal-details/deal-details.component';
import { NewDealComponent } from '../deals/new-deal/new-deal.component';
import { DealsRoutingModule } from './deals-routing.module';
import { ShareComponent } from './share/share.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {GalleriaModule} from 'primeng/galleria';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [
    DealComponent,
    DealListComponent,
    DealDetailsComponent,
    NewDealComponent,
    ShareComponent,
    MyDealsComponent
  ],
  imports: [
    CommonModule,
    DealsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GalleriaModule,
    FileUploadModule
  ]
})
export class DealsModule { }
