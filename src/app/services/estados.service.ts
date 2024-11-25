import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../core/models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private BASE_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  getAllStatesByIdCountry(idPais:number):Observable<Estado[]>{
    return this.httpClient.get<Estado[]>(`${this.BASE_URL}/estados-pais/${idPais}`)
  }

}
