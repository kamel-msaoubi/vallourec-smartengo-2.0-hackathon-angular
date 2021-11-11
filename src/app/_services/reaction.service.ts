import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const REACTION_API = 'http://localhost:8001/api/reaction/';

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  constructor(private http: HttpClient) { }

  create({ type, article }: any): Observable<any> {
    return this.http.post(REACTION_API + 'create', {
      type,
      article
    }, httpOptions);
  }
}
