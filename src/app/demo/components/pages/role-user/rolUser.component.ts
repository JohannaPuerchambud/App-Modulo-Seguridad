import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { rolUserApiService } from 'src/app/demo/components/pages/service/rolUser.service';

@Component({
  templateUrl: './rolUser.component.html',
  providers: [MessageService]
})
export class rolUserComponent implements OnInit {
  rolUserDialog: boolean = false;
  deleteRolUserDialog: boolean = false;
  deleteRolUsersDialog: boolean = false;

  rolUsers: any[] = [];
  rolUser: any = {};
  selectedRolUsers: any[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'rol_usr_id', header: 'ID' },
    { field: 'rol_usr_role', header: 'Rol ID' },
    { field: 'rol_usr_state', header: 'Estado' },
    { field: 'rol_usr_user', header: 'Usuario ID' },
    { field: 'role_name', header: 'Nombre del Rol' },
    { field: 'user_name', header: 'Nombre de Usuario' }
  ];

  statuses: any[] = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' }
  ];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private rolUserApiService: rolUserApiService, private messageService: MessageService) {}

  ngOnInit() {
    this.getRolUsers();
  }

  getRolUsers() {
    this.rolUserApiService.getRolUsers().subscribe(
      (data: any) => {
        console.log('Datos recibidos: ', data);
        this.rolUsers = data.roleUsers; // Ajusta para que tome los datos del array 'roleUsers'
      },
      (error: any) => {
        console.error('Error fetching role users: ', error);
      }
    );
  }

  openNew() {
    this.rolUser = {};
    this.submitted = false;
    this.rolUserDialog = true;
  }

  deleteSelectedRolUsers() {
    this.deleteRolUsersDialog = true;
  }

  editRolUser(rolUser: any) {
    this.rolUser = { ...rolUser };
    this.rolUserDialog = true;
  }

  deleteRolUser(rolUser: any) {
    this.deleteRolUserDialog = true;
    this.rolUser = { ...rolUser };
  }

  confirmDeleteSelected() {
    this.deleteRolUsersDialog = false;
    this.rolUsers = this.rolUsers.filter(val => !this.selectedRolUsers.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Roles de Usuario Eliminados', life: 3000 });
    this.selectedRolUsers = [];
  }

  confirmDelete() {
    this.deleteRolUserDialog = false;
    this.rolUserApiService.deleteRolUser(this.rolUser.rol_usr_id).subscribe(
      () => {
        this.rolUsers = this.rolUsers.filter(val => val.rol_usr_id !== this.rolUser.rol_usr_id);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol de Usuario Eliminado', life: 3000 });
        this.rolUser = {};
      },
      (error: any) => {
        console.error('Error deleting role user: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el rol de usuario', life: 3000 });
      }
    );
  }

  hideDialog() {
    this.rolUserDialog = false;
    this.submitted = false;
  }

  saveRolUser() {
    this.submitted = true;

    if (this.rolUser.rol_usr_user?.trim() && this.rolUser.rol_usr_state?.trim()) {
      if (this.rolUser.rol_usr_id) {
        this.rolUserApiService.updateRolUser(this.rolUser.rol_usr_id, this.rolUser).subscribe(
          (updatedRolUser: any) => {
            const index = this.findIndexById(updatedRolUser.rol_usr_id);
            if (index !== -1) {
              this.rolUsers[index] = updatedRolUser;
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol de Usuario Actualizado', life: 3000 });
            }
          },
          (error: any) => {
            console.error('Error updating role user: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el rol de usuario', life: 3000 });
          }
        );
      } else {
        this.rolUserApiService.createRolUser(this.rolUser).subscribe(
          (newRolUser: any) => {
            this.rolUsers.push(newRolUser);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol de Usuario Creado', life: 3000 });
          },
          (error: any) => {
            console.error('Error creating role user: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el rol de usuario', life: 3000 });
          }
        );
      }

      this.rolUserDialog = false;
      this.rolUser = {};
    }
  }

  findIndexById(id: string): number {
    return this.rolUsers.findIndex(rolUser => rolUser.rol_usr_id === id);
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rolUsers = this.rolUsers.filter((rolUser) =>
      rolUser.user_name.includes(filterValue) || rolUser.role_name.includes(filterValue) || rolUser.rol_usr_state.includes(filterValue)
    );
  }
}
