export class Category {
    Id: string;
    Name: string;
    ChildCategories?: Category[];

    constructor(id: string, name: string, childCategories?: Category[]) {
        this.Id = id;
        this.Name = name;
        if (childCategories) {
            this.ChildCategories = childCategories;
        }
    }
}