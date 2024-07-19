import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModulesApiService } from 'src/app/demo/components/pages/service/modules.service';

@Component({
  templateUrl: './modules.component.html',
  providers: [MessageService]
})
export class ModulesComponent implements OnInit {

  moduleDialog: boolean = false;
  deleteModuleDialog: boolean = false;
  deleteModulesDialog: boolean = false;

  modules: any[] = [];
  module: any = {};
  selectedModules: any[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'mod_id', header: 'ID' },
    { field: 'mod_name', header: 'Nombre' },
    { field: 'mod_state', header: 'Estado' }
  ];

  statuses: any[] = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' }
  ];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private modulesApiService: ModulesApiService, private messageService: MessageService) {}

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.modulesApiService.getModules().subscribe(
      (data: any[]) => {
        console.log('Datos recibidos: ', data);
        this.modules = data;
      },
      (error: any) => {
        console.error('Error fetching modules: ', error);
      }
    );
  }

  openNew() {
    this.module = {};
    this.submitted = false;
    this.moduleDialog = true;
  }

  deleteSelectedModules() {
    this.deleteModulesDialog = true;
  }

  editModule(module: any) {
    this.module = { ...module };
    this.moduleDialog = true;
  }

  deleteModule(module: any) {
    this.deleteModuleDialog = true;
    this.module = { ...module };
  }

  confirmDeleteSelected() {
    this.deleteModulesDialog = false;
    const idsToDelete = this.selectedModules.map(module => module.mod_id);
    idsToDelete.forEach(id => {
      this.modulesApiService.deleteModule(id).subscribe(
        () => {
          this.modules = this.modules.filter(val => !this.selectedModules.includes(val));
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Módulos Eliminados', life: 3000 });
          this.selectedModules = [];
        },
        (error: any) => {
          console.error('Error deleting modules: ', error);
        }
      );
    });
  }

  confirmDelete() {
    this.deleteModuleDialog = false;
    this.modulesApiService.deleteModule(this.module.mod_id).subscribe(
      () => {
        this.modules = this.modules.filter(val => val.mod_id !== this.module.mod_id);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Módulo Eliminado', life: 3000 });
        this.module = {};
      },
      (error: any) => {
        console.error('Error deleting module: ', error);
      }
    );
  }

  hideDialog() {
    this.moduleDialog = false;
    this.submitted = false;
  }

  saveModule() {
    this.submitted = true;
  
    if (this.module.mod_name?.trim() && this.module.mod_state?.trim()) {
      if (this.module.mod_id) {
        this.modulesApiService.updateModule(this.module.mod_id, this.module).subscribe(
          (updatedModule: any) => {
            const index = this.findIndexById(updatedModule.mod_id);
            if (index !== -1) {
              this.modules[index] = updatedModule;
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Módulo Actualizado', life: 3000 });
            }
          },
          (error: any) => {
            console.error('Error updating module: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el módulo', life: 3000 });
          }
        );
      } else {
        console.log('Creating user with data:', this.module); // Log the user data before sending

        this.modulesApiService.createModule(this.module).subscribe(
          (newModule: any) => {
            this.modules.push(newModule);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Módulo Creado', life: 3000 });
          },
          (error: any) => {
            console.error('Error creating module: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el módulo', life: 3000 });
          }
        );
      }
  
      this.modules = [...this.modules]; // Actualiza la lista de módulos
      this.moduleDialog = false;
      this.module = {};
    }
  }
  

  findIndexById(id: number): number {
    return this.modules.findIndex(module => module.mod_id === id);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
