import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/users'] }, 
                    { label: 'Roles', icon: 'pi pi-fw pi-shield', routerLink: ['/pages/roles'] }, 
                    { label: 'Funciones', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages/functions'] }, 
                    { label: 'Módulos', icon: 'pi pi-fw pi-cog', routerLink: ['/pages/modules'] }, 
                    { label: 'Auditoría', icon: 'pi pi-fw pi-search', routerLink: ['/pages/audit'] } 
                ]                
            },
        ];
    }
}
