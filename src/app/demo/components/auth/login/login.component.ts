import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    password!: string;
    selectedModule: any;
    modules: any[];

    constructor(public layoutService: LayoutService) {
        this.modules = [
            { label: 'Módulo 1', value: 'modulo1' },
            { label: 'Módulo 2', value: 'modulo2' },
            { label: 'Módulo 3', value: 'modulo3' }
        ];
    }
}
