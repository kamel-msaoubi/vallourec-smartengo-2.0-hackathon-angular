import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8000/api/article/';

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) { }

  create({ name, content }: any): Observable<any> {
    return this.http.post(AUTH_API + 'create', {
      name,
      content
    }, httpOptions);
  }

  update({ id, name, content }: any): Observable<any> {
    return this.http.post(AUTH_API + 'update', {
      id,
      name,
      content
    }, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.get(AUTH_API + 'delete?i=' + id, httpOptions);
  }
}
