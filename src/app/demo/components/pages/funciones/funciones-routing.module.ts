import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuncionesComponent } from './funciones.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FuncionesComponent }
	])],
	exports: [RouterModule] 
})
export class FuncionesRoutingModule { }
