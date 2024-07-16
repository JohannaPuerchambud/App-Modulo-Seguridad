import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolesApiService } from 'src/app/demo/components/pages/service/roles.service';

@Component({
    templateUrl: './roles.component.html',
    providers: [MessageService]
})
export class RolesComponent implements OnInit {

    rolesDialog: boolean = false;
    deleteRolesDialog: boolean = false;
    deleteRoleDialog: boolean = false;

    roles: any[] = [];
    role: any = {};
    selectedRoles: any[] = [];
    submitted: boolean = false;

    cols: any[] = [ 
        { field: 'rol_id', header: 'ID' },
        { field: 'rol_role', header: 'Rol' },
        { field: 'rol_description', header: 'Descripción' },
        { field: 'rol_allowed_users', header: 'Usuarios Permitidos' },
        { field: 'rol_state', header: 'Estado' }
    ];

    statuses: any[] = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
    ];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private rolesApiService: RolesApiService, private messageService: MessageService) { }

    ngOnInit() {
        this.getRoles();
    }

    getRoles() {
        this.rolesApiService.getRoles().subscribe(
            (data: any) => {
                this.roles = data.roles; // Asegúrate de que 'data.roles' contiene el array de roles
            },
            (error: any) => {
                console.error('Error fetching roles: ', error);
            }
        );
    }

    openNew() {
        this.role = {};
        this.submitted = false;
        this.rolesDialog = true;
    }

    deleteSelectedRoles() {
        this.deleteRolesDialog = true;
    }

    editRole(role: any) {
        this.role = { ...role };
        this.rolesDialog = true;
    }

    deleteRole(role: any) {
        this.deleteRoleDialog = true;
        this.role = { ...role };
    }

    confirmDeleteSelected() {
        this.deleteRolesDialog = false;
        this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Roles Eliminados', life: 3000 });
        this.selectedRoles = [];
    }

    confirmDelete() {
        this.deleteRoleDialog = false;
        this.roles = this.roles.filter(val => val.rol_id !== this.role.rol_id);
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Rol Eliminado', life: 3000 });
        this.role = {};
    }

    hideDialog() {
        this.rolesDialog = false;
        this.submitted = false;
    }

    saveRole() {
        this.submitted = true;

        if (this.role.rol_role?.trim() && this.role.rol_description?.trim()) {
            if (this.role.rol_id) {
                const index = this.findIndexById(this.role.rol_id);
                if (index !== -1) {
                    this.roles[index] = this.role;
                    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Rol Actualizado', life: 3000 });
                }
            } else {
                this.role.rol_id = this.createId();
                this.roles.push(this.role);
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Rol Creado', life: 3000 });
            }

            this.roles = [...this.roles];
            this.rolesDialog = false;
            this.role = {};
        }
    }

    findIndexById(id: number): number {
        return this.roles.findIndex(role => role.rol_id === id);
    }

    createId(): number {
        return Math.floor(Math.random() * 1000); // Replace with your actual ID creation logic
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
