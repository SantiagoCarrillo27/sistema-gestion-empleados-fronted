import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css'],
})
export class UpdateEmployeComponent implements OnInit {
  employeForm: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private employeService: EmployesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {

    this.employeForm.get('email')?.valueChanges.subscribe(value => {
      const emailLowerCase = value ? value.toLowerCase() : '';
      this.employeForm.get('email')?.setValue(emailLowerCase, { emitEvent: false });
    });

    this.id = this.route.snapshot.params[('id')];
    this.employeService.getEmployeById(this.id).subscribe({
      next: (empleado) => {
        this.employeForm.patchValue(empleado);
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
