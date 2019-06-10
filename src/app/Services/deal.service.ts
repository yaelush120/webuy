import { Injectable } from '@angular/core';
import { Deal } from '../Entities/Deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  private data:Deal[]=[new Deal(1,'שואב אבק דייסון','שואב אבק דייסון אלחוטי המתקדם ביותר דגם V8 יבואן רשמי','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzHWaOXLng7qt_zgq8r0lWEN-jac84PkYlwhroq3eIFncxWgmQ'),
  new Deal(2,'סט 3 מזוודות SWISS','סט 3 מזוודות SWISS קלות משקל עם 4 גלגלים לניוד קל ','/assets/images/mizvadot.jpg'),
  new Deal(3,'מעבד מזון סאוטר Sauter','מעבד מזון Sauter עם 2 מהירויות ומצב פולסים','/assets/images/blender.jpg'),
  new Deal(4,'מכונת קפה Nespresso','מכונת קפה Nespresso INISSIA עם 14 קפסולות','/assets/images/kafe.jpg'),
  new Deal(5,'שייקר נוטרי NINJA','שייקר מקצועי להכנת משקאות, רטבים, מחית לתינוק ואוכל בריא לכל המשפחה','/assets/images/sheiker.PNG'),
  new Deal(6,'כורסת טלוויזיה מעור','כורסת מסאז דגם נוסטרה בעלת מנגנון המשלב 3 סוגי עיסוי','/assets/images/kursa.jpg'),
  new Deal(7,'שואב אבק דייסון','שואב אבק דייסון אלחוטי המתקדם ביותר דגם V8 יבואן רשמי','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzHWaOXLng7qt_zgq8r0lWEN-jac84PkYlwhroq3eIFncxWgmQ'),
  new Deal(9,'סט 3 מזוודות SWISS','סט 3 מזוודות SWISS קלות משקל עם 4 גלגלים לניוד קל ','/assets/images/mizvadot.PNG'),
  new Deal(10,'מעבד מזון סאוטר Sauter','מעבד מזון Sauter עם 2 מהירויות ומצב פולסים','/assets/images/blender.jpg'),
  new Deal(11,'מכונת קפה Nespresso','מכונת קפה Nespresso INISSIA עם 14 קפסולות','/assets/images/kafe.jpg'),
  new Deal(12,'שייקר נוטרי NINJA','שייקר מקצועי להכנת משקאות, רטבים, מחית לתינוק ואוכל בריא לכל המשפחה','/assets/images/sheiker.PNG'),
  new Deal(13,'כורסת טלוויזיה מעור','כורסת מסאז דגם נוסטרה בעלת מנגנון המשלב 3 סוגי עיסוי','/assets/images/kursa.jpg')]

  constructor() { }

  getDeals()
  {
    return this.data;
  }

}
