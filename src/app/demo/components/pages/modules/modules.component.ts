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

    constructor(private modulesApiService: ModulesApiService, private messageService: MessageService) { }

    ngOnInit() {
        this.getModules();
    }

    getModules() {
        this.modulesApiService.getModules().subscribe(
            (data: any) => {
                this.modules = data; // Assuming 'data' directly contains the array of modules
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
        this.modules = this.modules.filter(val => !this.selectedModules.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Módulos Eliminados', life: 3000 });
        this.selectedModules = [];
    }

    confirmDelete() {
        this.deleteModuleDialog = false;
        this.modules = this.modules.filter(val => val.mod_id !== this.module.mod_id);
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Módulo Eliminado', life: 3000 });
        this.module = {};
    }

    hideDialog() {
        this.moduleDialog = false;
        this.submitted = false;
    }

    saveModule() {
        this.submitted = true;

        if (this.module.mod_name?.trim()) {
            if (this.module.mod_id) {
                const index = this.findIndexById(this.module.mod_id);
                if (index !== -1) {
                    this.modules[index] = this.module;
                    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Módulo Actualizado', life: 3000 });
                }
            } else {
                // Simulating creation of mod_id
                this.module.mod_id = this.createId();
                this.modules.push(this.module);
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Módulo Creado', life: 3000 });
            }

            this.modules = [...this.modules];
            this.moduleDialog = false;
            this.module = {};
        }
    }

    findIndexById(id: number): number {
        return this.modules.findIndex(module => module.mod_id === id);
    }

    createId(): number {
        return Math.floor(Math.random() * 1000); // Replace with your actual ID creation logic
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
