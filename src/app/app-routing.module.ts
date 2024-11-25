import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployesComponent } from './components/list-employes/list-employes.component';
import { RegisterEmployeComponent } from './components/register-employe/register-employe.component';
import { UpdateEmployeComponent } from './components/update-employe/update-employe.component';
import { DetailsEmployeComponent } from './components/details-employe/details-employe.component';

const routes: Routes = [
  {
    path: 'empleados',
    component: ListEmployesComponent,
  },
  {
    path: 'registrar-empleado',
    component: RegisterEmployeComponent,
  },
  {
    path: 'actualizar-empleado/:id',
    component: UpdateEmployeComponent,
  },
  {
    path:'empleado-detalles/:id',
    component:DetailsEmployeComponent
  },
  {
    path: '',
    redirectTo: 'empleados',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'empleados',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
