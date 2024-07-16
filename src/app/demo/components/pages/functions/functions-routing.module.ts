import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FunctionsComponent } from './functions.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FunctionsComponent }
	])],
	exports: [RouterModule] 
})
export class FunctionsRoutingModule { }
