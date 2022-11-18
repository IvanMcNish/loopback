import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';
import { LoginComponent } from './login/login.component';

//import { NuevoclieDialog } from './crud-usuarios/nuevo-clie';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'jefeoperacion', component: CrudUsuariosComponent },
  { path: 'cliente', component: CrudVehiculosComponent },
  { path: "login", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
