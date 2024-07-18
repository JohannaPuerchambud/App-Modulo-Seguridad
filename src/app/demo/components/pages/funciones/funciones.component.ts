import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FuncionesApiService } from 'src/app/demo/components/pages/service/funciones.service';

@Component({
  templateUrl: './funciones.component.html',
  providers: [MessageService]
})
export class FuncionesComponent implements OnInit {

  functionDialog: boolean = false;
  deleteFunctionDialog: boolean = false;
  deleteFunctionsDialog: boolean = false;

  funciones: any[] = [];
  func: any = {};
  selectedFunctions: any[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'func_id', header: 'ID' },
    { field: 'func_name', header: 'Nombre' },
    { field: 'func_module', header: 'Módulo' },
    { field: 'func_state', header: 'Estado' }
  ];

  statuses: any[] = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' }
  ];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private funcionesApiService: FuncionesApiService, private messageService: MessageService) {}

  ngOnInit() {
    this.getFunciones();
  }

  getFunciones() {
    this.funcionesApiService.getFunciones().subscribe(
      (data: any[]) => {
        console.log('Datos recibidos: ', data);
        this.funciones = data;
      },
      (error: any) => {
        console.error('Error fetching functions: ', error);
      }
    );
  }

  openNew() {
    this.func = {};
    this.submitted = false;
    this.functionDialog = true;
  }

  deleteSelectedFunctions() {
    this.deleteFunctionsDialog = true;
  }

  editFunction(func: any) {
    this.func = { ...func };
    this.functionDialog = true;
  }

  deleteFunction(func: any) {
    this.deleteFunctionDialog = true;
    this.func = { ...func };
  }

  confirmDeleteSelected() {
    this.deleteFunctionsDialog = false;
    this.funciones = this.funciones.filter(val => !this.selectedFunctions.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Funciones Eliminadas', life: 3000 });
    this.selectedFunctions = [];
  }

  confirmDelete() {
    this.deleteFunctionDialog = false;
    this.funciones = this.funciones.filter(val => val.func_id !== this.func.func_id);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Función Eliminada', life: 3000 });
    this.func = {};
  }

  hideDialog() {
    this.functionDialog = false;
    this.submitted = false;
  }

  saveFunction() {
    this.submitted = true;

    if (this.func.func_name?.trim() && this.func.func_state?.trim()) {
        if (this.func.func_id) {
        this.funcionesApiService.updateFuncion(this.func.func_id, this.func).subscribe(
          (updatedFunc: any) => {
            const index = this.findIndexById(updatedFunc.func_id);
            if (index !== -1) {
              this.funciones[index] = updatedFunc;
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Función Actualizada', life: 3000 });
            }
          },
          (error: any) => {
            console.error('Error updating function: ', error);
          }
        );
      } else {
        this.funcionesApiService.createFuncion(this.func).subscribe(
          (newFunc: any) => {
            newFunc.func_id = this.createId();
            this.funciones.push(newFunc);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Función Creada', life: 3000 });
          },
          (error: any) => {
            console.error('Error creating function: ', error);
          }
        );
      }

      this.funciones = [...this.funciones];
      this.functionDialog = false;
      this.func = {};
    }
  }

  findIndexById(id: string): number {
    return this.funciones.findIndex(func => func.func_id === id);
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
