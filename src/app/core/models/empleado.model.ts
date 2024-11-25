import { Estado } from "./estado.model";
import { Pais } from "./pais.model";

export interface Empleado{
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  // pais:Pais;
  // estado:Estado;
}
