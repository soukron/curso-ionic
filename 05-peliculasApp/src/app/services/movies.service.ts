import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    return this.http.get<T>( query );
  }

  getFeature() {
    return this.ejecutarQuery<RespuestaMDB>('/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31');
  }

  getPopulares() {
    const query = '/discover/movie?sort_by=popularity.desc';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
}
