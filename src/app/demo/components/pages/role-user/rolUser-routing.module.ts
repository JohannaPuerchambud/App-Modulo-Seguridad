import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rolUserComponent } from './rolUser.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: rolUserComponent }
	])],
	exports: [RouterModule] 
})
export class rolUserRoutingModule { }
