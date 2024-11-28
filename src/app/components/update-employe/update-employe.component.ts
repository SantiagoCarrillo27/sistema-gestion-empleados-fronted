import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/core/models/estado.model';
import { Pais } from 'src/app/core/models/pais.model';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';
import { PaisesService } from '../../services/paises.service';
import { EstadosService } from 'src/app/services/estados.service';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css'],
})
export class UpdateEmployeComponent implements OnInit {
  employeForm: FormGroup;
  id: number = 0;
  paises: Pais[] = [];
  estados: Estado[] = [];

  constructor(
    private fb: FormBuilder,
    private employeService: EmployesService,
    private route: ActivatedRoute,
    private router: Router,
    private paisService:PaisesService,
    private estadoService:EstadosService
  ) {
    this.employeForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pais:['', Validators.required],
      estado:['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params[('id')];

    this.employeForm.get('email')?.valueChanges.subscribe(value => {
      const emailLowerCase = value ? value.toLowerCase() : '';
      this.employeForm.get('email')?.setValue(emailLowerCase, { emitEvent: false });
    });

    this.paisService.getAllCountries().subscribe({
      next: (data) =>{
        console.log(data);
        this.paises = data;

      },
      error: (err) =>{
        console.log("Ocurrio un error", err);

      }
    })

    this.estadoService.getAllStatesByIdCountry(this.id).subscribe({
      next:(data) =>{
        console.log(data);
        this.estados = data;
      },
      error: (err) =>{
        console.log("Error", err);

      }
    })



    this.employeService.getEmployeById(this.id).subscribe({
      next: (empleado) => {
        console.log(empleado);

        this.employeForm.patchValue({
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          email: empleado.email,
          pais: empleado.pais, // Asignamos el objeto completo de pais
          estado: empleado.estado // Asignamos el objeto completo de estado
        });
      },
      error: (err) => {
        console.error('Error al cargar el empleado:', err);
        this.router.navigate(['/empleados']);
      },
    });
  }

  updateEmploye(): void {
    if (this.employeForm.valid) {

      const formValueEmploye = { ...this.employeForm.value };
      formValueEmploye.email = formValueEmploye.email.toLowerCase();
      this.employeService.updateEmploye(this.id, formValueEmploye).subscribe({
        next: (dato) => {
          Swal.fire({
            title:'Empleado actualizado',
            text:'El empleado se actualizo correctamente',
            icon:'success',
            confirmButtonText:'Aceptar'
        }).then(() =>{
          this.router.navigate(['/empleados']);
        });
        },
        error: (err) => {
          console.error('Error al actualizar el empleado:', err);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un problema al Actualizar el empleado. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos antes de enviar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }


  listaEmpleados(){
    this.router.navigate(['/empleados']);
  }

}
