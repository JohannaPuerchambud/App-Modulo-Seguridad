import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginApiService } from 'src/app/demo/components/auth/service/login.service';
import { Router } from '@angular/router';

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
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    username: string = '';
    password: string = '';
    selectedModule: string = '';

    constructor(
        public layoutService: LayoutService, 
        private loginService: LoginApiService, 
        private router: Router  // Añadir el Router aquí
    ) { }

    ngOnInit() {
        // No se necesita cargar los módulos desde el servicio
    }

    login() {
        console.log('username:', this.username);
        console.log('password:', this.password);
        console.log('selectedModule:', this.selectedModule);

        if (this.username && this.password && this.selectedModule) {
            this.loginService.login(this.username, this.password, this.selectedModule).subscribe(
                response => {
                    console.log('Login successful', response);
                    // Redirige al usuario después del login exitoso
                    this.router.navigate(['/app']); // Redirige al layout principal
                },
                error => {
                    console.error('Login failed', error);
                    // Maneja los errores aquí
                }
            );
        } else {
            console.error('Por favor, rellene todos los campos');
        }
    }
}
