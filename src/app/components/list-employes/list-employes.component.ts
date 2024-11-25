import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../core/models/empleado.model';
import { EmployesService } from '../../services/employes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-employes',
  templateUrl: './list-employes.component.html',
  styleUrls: ['./list-employes.component.css'],
})
export class ListEmployesComponent implements OnInit {
  empleados: Empleado[] = [];

  constructor(
    private empleadoService: EmployesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listAllEmployes();
  }

  private listAllEmployes(): void {
    this.empleadoService.getAllEmployes().subscribe(
      (datos) => {
        this.empleados = datos;
      },
      (error) => {
        console.error('Error al listar a los empleados', error);
      }
    );
  }

  public updateEmploye(id: number): void {
    this.router.navigate(['actualizar-empleado', id]);
  }

  public detailsViewEmploye(id: number): void {
    this.router.navigate(['empleado-detalles', id]);
  }

  public deleteEmploye(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al empleado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.deleteEmploye(id).subscribe({
          next: (dato) => {
            console.log('Empleado eliminado:', dato);
            this.listAllEmployes();
            Swal.fire({
              title: 'Empleado eliminado',
              text: 'El empleado ha sido eliminado con éxito.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          },
          error: (err) => {
            console.error('Error al eliminar el empleado:', err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar el empleado.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        });
      }
    });
  }
}
