import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
        { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) }, 
        { path: 'functions', loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule) }, 
        { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) }, 
        { path: 'audit', loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule) }, 
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { } 
