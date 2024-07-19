import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rolFunctionsComponent } from './rolFunctions.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: rolFunctionsComponent }
	])],
	exports: [RouterModule] 
})
export class rolFunctionsRoutingModule { }
