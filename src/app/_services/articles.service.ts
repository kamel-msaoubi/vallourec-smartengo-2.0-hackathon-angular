import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ARTICLE_API = 'http://localhost:8001/api/article/';

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) { }

  create({ name, content }: any): Observable<any> {
    return this.http.post(ARTICLE_API + 'create', {
      name,
      content
    }, httpOptions);
  }

  update({ id, name, content }: any): Observable<any> {
    return this.http.post(ARTICLE_API + 'update', {
      id,
      name,
      content
    }, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.get(ARTICLE_API + 'delete?i=' + id, httpOptions);
  }

  findAllTags(): Observable<any> {
    return this.http.get('http://localhost:8001/api/tags/' + 'list', httpOptions);
  }

  list(pre: string, tag: any, orderby: string, page: number): Observable<any> {
    const id = tag && tag.id ? tag.id : -1;
    const pageNumber = page ? page : 0;
    return this.http.post(ARTICLE_API + 'list', {
      pre,
      id,
      orderby,
      pageNumber
    }, httpOptions);
  }
}
