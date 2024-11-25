import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../core/models/empleado.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  constructor(private httpClient : HttpClient) { }


  private BASE_URL = environment.apiUrl;

  getAllEmployes():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.BASE_URL}/empleados`).pipe(
      catchError((error) =>{
        let errorMessage = 'Error al obtener la lista de empleados.';
      if (error.status === 404) {
        errorMessage = 'No se encontraron empleados.';
      } else if (error.status === 500) {
        errorMessage = 'Error en el servidor. Inténtalo más tarde.';
      }
      console.error('Error en getAllEmployes:', error);
      return throwError(() => new Error(errorMessage));
      })
    )
  }


  registerEmploye(empleado:Empleado):Observable<object>{
    return this.httpClient.post(`${this.BASE_URL}/empleado`, empleado).pipe(
      catchError((error) =>{
        let errorMessage = 'Ocurrió un error inesperado.';
        if (error.status === 400) {
          errorMessage = 'Datos inválidos.';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor.';
        }
        return throwError(() => new Error(errorMessage));

      })
    )
  }


  getEmployeById(id: number) {
    return this.httpClient.get<Empleado>(`${this.BASE_URL}/empleado/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el empleado:', error);
        let errorMessage = 'No se pudo obtener el empleado.';

        if (error.status === 404) {
          errorMessage = `Empleado con ID ${id} no encontrado.`;
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor.';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }


  updateEmploye(id:number, empleado:Empleado ){
    return this.httpClient.put(`${this.BASE_URL}/empleado/${id}`, empleado).pipe(
      catchError((error) =>{
        let errorMessage = "Ocurrió un error insperado.";
        if (error.status === 400) {
          errorMessage = 'Datos inválidos.';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor.';
        }
        return throwError(() => new Error(errorMessage));
      })
    )
  }


  deleteEmploye(id:number):Observable<object>{
    return this.httpClient.delete(`${this.BASE_URL}/empleado/${id}`).pipe(
      catchError((error) =>{
        let errorMessage = "Ocurrió un error al eliminar el empleado.";
        if (error.status === 400) {
          errorMessage = 'Datos inválidos.';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor.';
        }
        return throwError(() => new Error(errorMessage));
      })
    )
  }


}
