import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from 'src/app/core/models/estado.model';
import { Pais } from 'src/app/core/models/pais.model';

@Component({
  selector: 'app-empleado-formulario',
  templateUrl: './empleado-formulario.component.html',
  styleUrls: ['./empleado-formulario.component.css']
})
export class EmpleadoFormularioComponent {

  errorCampoVacio:string = "El dato es obligatorio, por favor diligencie los campos.";
  errorValidacionMensajePatron: string = "El email debe tener un dominio válido (por ejemplo, @hotmail, @gmail, @org etc).";

  @Input() paises: Pais[] = [];
  @Input() estados: Estado[] = [];
  @Input() formGroup!: FormGroup;
  @Input() titulo: string = 'Formulario Empleado';
  @Input() botonTexto: string = 'Guardar';
  @Input() esRegistro: boolean = true;

  @Output() onSubmit = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();


  ngOnInit(): void {

    this.formGroup.get('estado')?.disable();
    this.formGroup.get('pais')?.valueChanges.subscribe((value) => {
      if (value && value.id !== 0) {
        this.formGroup.get('estado')?.enable();
      } else {
        this.formGroup.get('estado')?.disable();
        this.formGroup.get('estado')?.setValue(null);
      }
    });
  }


}
