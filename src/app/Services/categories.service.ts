import { Injectable } from '@angular/core';
import { Category } from '../Entities/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private data: Category[] = [
    {
      Id: '111',
      Name: 'חשמל ומחשוב',
      ChildCategories: [
        {
          Id:'122',
          Name:'מחשבים וציוד היקפי'
        },
        {
          Id:'133',
          Name:'סלולר ותקשורת'
        },
        {
          Id:'144',
          Name:'שואבי אבק'
        },
        {
          Id:'155',
          Name:'מוצרי חשמל למטבח'
        }
      ]
    },
    {
      Id:'222',
      Name:'ריהוט',
      ChildCategories: [
        {
          Id:'233',
          Name:'רהיטים לסלון'
        },
        {
          Id:'244',
          Name:'פינות אוכל'
        },
        {
          Id:'255',
          Name:'חדרי שינה'
        },
        {
          Id:'266',
          Name:'ריהוט גן'
        }
      ]
    },
    {
      Id:'333',
      Name:'לתינוק ולילד',
      ChildCategories: [
        {
          Id:'344',
          Name:'כסאות בטיחות לרכב'
        },
        {
          Id:'355',
          Name:'עגלות'
        },
        {
          Id:'455',
          Name:'ריהוט לתינוקות'
        },
        {
          Id:'566',
          Name:'צעצועים'
        }
      ]
    }
  ]

  constructor() { }

  getCategories()
  {
    return this.data;
  }
}
