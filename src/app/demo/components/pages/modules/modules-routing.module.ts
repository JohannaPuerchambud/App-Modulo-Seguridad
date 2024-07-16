import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ModulesComponent }
	])],
	exports: [RouterModule] 
})
export class ModulesRoutingModule { }
