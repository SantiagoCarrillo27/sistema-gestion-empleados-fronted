import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployesComponent } from './components/list-employes/list-employes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { RegisterEmployeComponent } from './components/register-employe/register-employe.component';
import { UpdateEmployeComponent } from './components/update-employe/update-employe.component';
import { DetailsEmployeComponent } from './components/details-employe/details-employe.component';
import { EmpleadoFormularioComponent } from './shared/empleado-formulario/empleado-formulario.component'

@NgModule({
  declarations: [
    AppComponent,
    ListEmployesComponent,
    NavBarComponent,
    RegisterEmployeComponent,
    UpdateEmployeComponent,
    DetailsEmployeComponent,
    EmpleadoFormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
