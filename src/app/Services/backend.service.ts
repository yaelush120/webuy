import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
   config = {
     apiPath: ''
  };
  httpOptions: any;
  constructor(private http: HttpClient) {
   
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(name, password) {
    return this.http.get(this.config.apiPath + 'user/login/' + name + '/' + password);
  }

  getMultiple(obj, paths) {
    var res = [];
    for (var i = 0; i < paths.length; i++) {
      res.push(this.http.get(this.config.apiPath + paths[i] + obj))
    }
    return forkJoin(res);
  }

  get(obj, path) {
    if (obj && obj != null)
      return this.http.get(this.config.apiPath + path + obj);
    else
      return this.http.get(this.config.apiPath + path);
  }
  update(obj: any, path) {
    return this.http.put(this.config.apiPath + path, obj, this.httpOptions);
  }
  insert(obj: any, path) {
    return this.http.post(this.config.apiPath + path, obj, this.httpOptions);
  }

  delete(ids: any[], path) {

    return this.http.post(this.config.apiPath + path, ids, this.httpOptions);

  }

  uploadImage(img: any, path) {
    var form = new FormData();
    form.append('img', img, img.name);
   
    return this.http.post(this.config.apiPath + path, form);
  }

}
