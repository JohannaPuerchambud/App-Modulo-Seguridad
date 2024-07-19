import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { rolFunctionsApiService } from 'src/app/demo/components/pages/service/rolFunctions.service'; // Asegúrate de usar el servicio correcto

@Component({
  templateUrl: './rolFunctions.component.html',
  providers: [MessageService]
})
export class rolFunctionsComponent implements OnInit {

  functionDialog: boolean = false;
  deleteFunctionDialog: boolean = false;
  deleteFunctionsDialog: boolean = false;

  roleFunctions: any[] = [];
  roleFunction: any = {};
  selectedRoleFunctions: any[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'rol_func_id', header: 'ID' },
    { field: 'rol_role', header: 'Rol' },
    { field: 'func_name', header: 'Función' },
    { field: 'func_module', header: 'Módulo' },
    { field: 'func_state_function', header: 'Estado Función' },
    { field: 'rol_description', header: 'Descripción Rol' },
    { field: 'rol_allowed_users', header: 'Usuarios Permitidos' },

    { field: 'rol_func_role', header: 'Rol' },
    { field: 'rol_func_function', header: 'Función' },
    { field: 'rol_func_state', header: 'Estado ' }

  ];

  statuses: any[] = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' }
  ];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private rolFunctionsApiService: rolFunctionsApiService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getRoleFunctions();
  }

  getRoleFunctions() {
    this.rolFunctionsApiService.getRoleFunctions().subscribe(
      (data: any) => {
        console.log('Datos recibidos: ', data);
        this.roleFunctions = data.roleFunctions;
      },
      (error: any) => {
        console.error('Error fetching role functions: ', error);
      }
    );
  }

  openNew() {
    this.roleFunction = {};
    this.submitted = false;
    this.functionDialog = true;
  }

  deleteSelectedRoleFunctions() {
    this.deleteFunctionsDialog = true;
  }

  editRoleFunction(roleFunction: any) {
    this.roleFunction = { ...roleFunction };
    this.functionDialog = true;
  }

  deleteRoleFunction(roleFunction: any) {
    this.deleteFunctionDialog = true;
    this.roleFunction = { ...roleFunction };
  }

  confirmDeleteSelected() {
    this.deleteFunctionsDialog = false;
    this.roleFunctions = this.roleFunctions.filter(val => !this.selectedRoleFunctions.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asignaciones Eliminadas', life: 3000 });
    this.selectedRoleFunctions = [];
  }

  confirmDelete() {
    this.deleteFunctionDialog = false;
    this.roleFunctions = this.roleFunctions.filter(val => val.rol_func_id !== this.roleFunction.rol_func_id);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asignación Eliminada', life: 3000 });
    this.roleFunction = {};
  }

  hideDialog() {
    this.functionDialog = false;
    this.submitted = false;
  }

  saveRoleFunction() {
    this.submitted = true;

    if (this.roleFunction.rol_role?.trim() && this.roleFunction.func_name?.trim() && this.roleFunction.func_state_function?.trim()) {
      if (this.roleFunction.rol_func_id) {
        this.rolFunctionsApiService.updateRoleFunction(this.roleFunction.rol_func_id, this.roleFunction).subscribe(
          (updatedRoleFunction: any) => {
            const index = this.findIndexById(updatedRoleFunction.rol_func_id);
            if (index !== -1) {
              this.roleFunctions[index] = updatedRoleFunction;
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asignación Actualizada', life: 3000 });
            }
          },
          (error: any) => {
            console.error('Error updating role function: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la asignación', life: 3000 });
          }
        );
      } else {
        this.rolFunctionsApiService.createRoleFunction(this.roleFunction).subscribe(
          (newRoleFunction: any) => {
            this.roleFunctions.push(newRoleFunction);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asignación Creada', life: 3000 });
          },
          (error: any) => {
            console.error('Error creating role function: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la asignación', life: 3000 });
          }
        );
      }

      this.roleFunctions = [...this.roleFunctions];
      this.functionDialog = false;
      this.roleFunction = {};
    }
  }

  findIndexById(id: number): number {
    return this.roleFunctions.findIndex(roleFunction => roleFunction.rol_func_id === id);
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
