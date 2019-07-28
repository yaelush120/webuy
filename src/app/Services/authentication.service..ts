import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../Entities/User";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AnimationPlayState>;
  public currentUser: Observable<any>;

  private _options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      //JSON.parse(localStorage.getItem("currentUser"))
      null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.get<any>("http://localhost:54267/api/User/GetUsers").pipe(
      map(users => {
        let user = users.filter(
          x => x.userName == username && x.password == password
        );
        if (user && user.length > 0) {
          user = user[0];
          //localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  saveUser(newUser: any) {
    return this.http
      .post("http://localhost:54267/api/User/SaveUser", newUser, this._options)
      .pipe(
        map(data => {
          if (data == true) {
            this.login(newUser.UserName, newUser.Password).subscribe(x => {
                
            });
          }
          return data;
        })
      );
  }
}
