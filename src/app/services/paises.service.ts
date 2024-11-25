import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../core/models/pais.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private BASE_URL = environment.apiUrl;

  constructor(private httpClient:HttpClient ) { }


  public getAllCountries():Observable<Pais[]>{
    return this.httpClient.get<Pais[]>(`${this.BASE_URL}/paises`)
  }



}
