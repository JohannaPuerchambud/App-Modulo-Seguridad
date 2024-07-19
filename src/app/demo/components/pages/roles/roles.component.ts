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
                console.log('Datos recibidos: ', data);
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
        const deleteRequests = this.selectedRoles.map(role => this.rolesApiService.deleteRoleById(role.rol_id));
        Promise.all(deleteRequests).then(() => {
            this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Roles Eliminados', life: 3000 });
            this.selectedRoles = [];
        }).catch(error => {
            console.error('Error deleting selected roles: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar los roles', life: 3000 });
        });
    }

    confirmDelete() {
        this.rolesApiService.deleteRoleById(this.role.rol_id).subscribe(() => {
            this.roles = this.roles.filter(val => val.rol_id !== this.role.rol_id);
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Rol Eliminado', life: 3000 });
            this.role = {};
        }, error => {
            console.error('Error deleting role: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el rol', life: 3000 });
        });
    }

    hideDialog() {
        this.rolesDialog = false;
        this.submitted = false;
    }

    saveRole() {
        this.submitted = true;

        if (this.role.rol_role?.trim() && this.role.rol_description?.trim()) {
            if (this.role.rol_id) {
                this.rolesApiService.updateRoleById(this.role.rol_id, this.role).subscribe(
                    updatedRole => {
                        const index = this.findIndexById(this.role.rol_id);
                        if (index !== -1) {
                            this.roles[index] = updatedRole;
                            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Rol Actualizado', life: 3000 });
                        }
                    },
                    error => {
                        console.error('Error updating role: ', error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el rol', life: 3000 });
                    }
                );
            } else {
                this.rolesApiService.createRole(this.role).subscribe(
                    newRole => {
                        this.roles.push(newRole);
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Rol Creado', life: 3000 });
                    },
                    error => {
                        console.error('Error creating role: ', error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el rol', life: 3000 });
                    }
                );
            }
            this.roles = [...this.roles];
            this.rolesDialog = false;
            this.role = {};
        }
    }


    findIndexById(id: number): number {
        return this.roles.findIndex(role => role.rol_id === id);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
