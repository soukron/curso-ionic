import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  getTopHeadlines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d2517b840a1a47a8a6ed79cae6fcaad9`);
  }
}
