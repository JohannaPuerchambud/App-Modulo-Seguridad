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
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/users'] }, // Cambiado a 'pi-users'
                    { label: 'Roles', icon: 'pi pi-fw pi-shield', routerLink: ['/pages/roles'] }, // Cambiado a 'pi-shield'
                    { label: 'Funciones', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages/functions'] }, // Cambiado a 'pi-briefcase'
                    { label: 'Módulos', icon: 'pi pi-fw pi-cog', routerLink: ['/pages/modules'] }, // Cambiado a 'pi-cog'
                    { label: 'Auditoría', icon: 'pi pi-fw pi-search', routerLink: ['/pages/audit'] } // Cambiado a 'pi-search'
                ]                
            },
        ];
    }
}
