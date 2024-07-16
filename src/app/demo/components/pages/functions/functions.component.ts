import { Component, OnInit } from '@angular/core';
import { F } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FuncionesApiService } from 'src/app/demo/components/pages/service/funciones.service';

@Component({
    templateUrl: './functions.component.html',
    providers: [MessageService]
})
export class FunctionsComponent implements OnInit {

    functionDialog: boolean = false;
    deleteFunctionDialog: boolean = false;
    deleteFunctionsDialog: boolean = false;

    functions: any[] = [];
    func: any = {};
    selectedFunctions: any[] = [];
    submitted: boolean = false;

    cols: any[] = [
        { field: 'func_id', header: 'ID' },
        { field: 'func_name', header: 'Nombre de la Función' },
        { field: 'func_module', header: 'Módulo' },
        { field: 'func_state', header: 'Estado' }
    ];

    statuses: any[] = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
    ];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private functionsApiService: FuncionesApiService, private messageService: MessageService) { }

    ngOnInit() {
        this.getFunctions();
        this.getHoy();
    }

    
    

    getFunctions() {
        this.functionsApiService.getFunciones().subscribe(
            (data: any) => {
                this.functions = data.functions; // Ensure 'data.functions' contains the array of functions
            },
            (error: any) => {
                console.error('Error fetching functions: ', error);
            }
        );
    }

    getHoy (){
    this.functionsApiService.getFunciones().subscribe(
      (res:any)=>{console.log(res)},
      (error:any)=> {console.log(error)});
    
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
        this.functions = this.functions.filter(val => !this.selectedFunctions.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Funciones Eliminadas', life: 3000 });
        this.selectedFunctions = [];
    }

    confirmDelete() {
        this.deleteFunctionDialog = false;
        this.functions = this.functions.filter(val => val.func_id !== this.func.func_id);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Función Eliminada', life: 3000 });
        this.func = {};
    }

    hideDialog() {
        this.functionDialog = false;
        this.submitted = false;
    }

    saveFunction() {
        this.submitted = true;

        if (this.func.func_name?.trim() && this.func.func_module && this.func.func_state) {
            if (this.func.func_id) {
                const index = this.findIndexById(this.func.func_id);
                if (index !== -1) {
                    this.functions[index] = this.func;
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Función Actualizada', life: 3000 });
                }
            } else {
                this.func.func_id = this.createId();
                this.functions.push(this.func);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Función Creada', life: 3000 });
            }

            this.functions = [...this.functions];
            this.functionDialog = false;
            this.func = {};
        }
    }

    findIndexById(id: number): number {
        return this.functions.findIndex(func => func.func_id === id);
    }

    createId(): number {
        return Math.floor(Math.random() * 1000); // Example random ID generation
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
