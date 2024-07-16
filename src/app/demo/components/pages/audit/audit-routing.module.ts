import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuditComponent } from './audit.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AuditComponent }
	])],
	exports: [RouterModule] 
})
export class AuditRoutingModule { }
