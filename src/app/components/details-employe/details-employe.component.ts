import { Component, OnInit } from '@angular/core';
import { EmployesService } from '../../services/employes.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/core/models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-employe',
  templateUrl: './details-employe.component.html',
  styleUrls: ['./details-employe.component.css']
})
export class DetailsEmployeComponent implements OnInit {

  id:number = 0;
  empleado:Empleado;
  constructor(private employeSerice:EmployesService, private route:ActivatedRoute){
    this.empleado = {
      id:0,
      nombre: '',
      apellido: '',
      email: '',

    };
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.employeSerice.getEmployeById(this.id).subscribe({
      next: (data) => {
        this.empleado = data;
        Swal.fire({
          title: `Detalles empleado/a: ${this.empleado.nombre}`,
          confirmButtonText:'Aceptar'
        });
      },
      error: (err) => {
        console.error('Error al obtener los datos del empleado:', err);
      }
    });


  }


}
