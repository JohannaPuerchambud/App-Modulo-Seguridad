import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
        { path: 'role-user', loadChildren: () => import('./role-user/rolUser.module').then(m => m.rolUserModule) }, 
        { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) }, 
        { path: 'role-functions', loadChildren: () => import('./role-functions/rolFunctions.module').then(m => m.rolFunctionsModule) }, 
        { path: 'functions', loadChildren: () => import('./funciones/funciones.module').then(m => m.FuncionesModule) }, 
        { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) }, 
        { path: 'audit', loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule) }, 
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { } 
