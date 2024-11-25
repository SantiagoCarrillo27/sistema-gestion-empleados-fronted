import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pais } from 'src/app/core/models/pais.model';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';
import { PaisesService } from '../../services/paises.service';
import { Estado } from 'src/app/core/models/estado.model';
import { EstadosService } from '../../services/estados.service';

@Component({
  selector: 'app-register-employe',
  templateUrl: './register-employe.component.html',
  styleUrls: ['./register-employe.component.css'],
})
export class RegisterEmployeComponent implements OnInit {
  employeForm: FormGroup;
  paises: Pais[] = [];
  estados:Estado[] = [];
  id:number = 0;

  constructor(
    private fb: FormBuilder,
    private employeService: EmployesService,
    private router: Router,
    private paisService:PaisesService,
    private estadoService:EstadosService
  ) {
    this.employeForm = this.fb.group({
      nombre: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(13)]],
      apellido: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      paises:['', Validators.required],
      estados:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeForm.get('email')?.valueChanges.subscribe(value => {
      const emailLowerCase = value ? value.toLowerCase() : '';
      this.employeForm.get('email')?.setValue(emailLowerCase, { emitEvent: false });
    });
    this.getAllCountries()


  this.employeForm.get('paises')?.valueChanges.subscribe(value => {
    this.estadoService.getAllStatesByIdCountry(value.id).subscribe({
      next: (dato) =>{
        this.estados = dato;
      },
      error: (err) =>{
        console.error("Ocurrió un error", err);

      }
    })
  });

  }

  registrarEmpleado() {

    if (this.employeForm.valid) {
      const formValueEmploye = { ...this.employeForm.value };


      formValueEmploye.email = formValueEmploye.email.toLowerCase();
      formValueEmploye.paises = formValueEmploye.paises.id;
      formValueEmploye.estados = formValueEmploye.estados.id;

      console.log(formValueEmploye);

      this.employeService.registerEmploye(formValueEmploye).subscribe({
        next: (dato) => {
          Swal.fire({
            title: 'Empleado registrado',
            text: 'El empleado se registró correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/empleados']);
          });
        },
        error: (error) => {
          console.error('Error al registrar empleado: ', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un problema al registrar el empleado. Intente nuevamente.',
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
    this.router.navigate(['empleados'])
  }

  getAllCountries(){
    this.paisService.getAllCountries().subscribe({
      next : (dato)=>{
        this.paises = dato
      },
      error: (err) =>{
        console.error("Ocurrió un error", err)
      }
    })
  }

  // getAllStatesByIdCountries(idPais: number) {
  //   console.log('Recibido idPais:', idPais); // Verifica el valor recibido
  //   if (!idPais) {
  //     console.error("El idPais es undefined o null");
  //     return;
  //   }

  //   console.log('Buscando estados para el país con id:', idPais);

  //   this.estadoService.getAllStatesByIdCountry(idPais).subscribe({
  //     next: (dato) => {
  //       this.estados = dato;
  //       console.log('Estados para el país:', this.estados);
  //     },
  //     error: (err) => {
  //       console.error("Algo ha fallado al obtener los estados", err);
  //     }
  //   });
  // }




}
