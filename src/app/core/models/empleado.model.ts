export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  pais: {
    id: number;
    nombre: string;
  };
  estado: {
    id: number;
    nombre: string;
    pais: {
      id: number;
      nombre: string;
    };
  };
}
