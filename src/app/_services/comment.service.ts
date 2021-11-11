import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const COMMENT_API = 'http://localhost:8000/api/comment/';

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  create({ content, article }: any): Observable<any> {
    return this.http.post(COMMENT_API + 'create', {
      content,
      article
    }, httpOptions);
  }
}
