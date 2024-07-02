import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsersApiService } from 'src/app/demo/components/pages/service/users.service';

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService]
})
export class UsersComponent implements OnInit {

    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;

    users: any[] = [];
    user: any = {};
    selectedUsers: any[] = [];
    submitted: boolean = false;

    cols: any[] = [
        { field: 'usr_id', header: 'ID' },
        { field: 'usr_first_name', header: 'Primer Nombre' },
        { field: 'usr_second_name', header: 'Segundo Nombre' },
        { field: 'usr_first_lastname', header: 'Primer Apellido' },
        { field: 'usr_second_lastname', header: 'Segundo Apellido' },
        { field: 'usr_full_name', header: 'Nombre Completo' },
        { field: 'usr_user', header: 'Nombre de Usuario' },
        { field: 'usr_email', header: 'Email' },
        { field: 'usr_state', header: 'Estado' }
    ];

    statuses: any[] = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
    ];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private usersApiService: UsersApiService, private messageService: MessageService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.usersApiService.getUsers().subscribe(
            (data: any) => {
                this.users = data.users; // Asegúrate de que 'data.users' contiene el array de usuarios
            },
            (error: any) => {
                console.error('Error fetching users: ', error);
            }
        );
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: any) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: any) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuarios Eliminados', life: 3000 });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.usr_id !== this.user.usr_id);
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Eliminado', life: 3000 });
        this.user = {};
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.usr_first_name?.trim() && this.user.usr_user?.trim() && this.user.usr_email?.trim() && this.user.usr_password?.trim()) {
            if (this.user.usr_id) {
                const index = this.findIndexById(this.user.usr_id);
                if (index !== -1) {
                    this.users[index] = this.user;
                    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Actualizado', life: 3000 });
                }
            } else {
                this.user.usr_id = this.createId();
                this.users.push(this.user);
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Creado', life: 3000 });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        }
    }

    findIndexById(id: string): number {
        return this.users.findIndex(user => user.usr_id === id);
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
