import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuditApiService } from 'src/app/demo/components/pages/service/audit.service';

@Component({
    templateUrl: './audit.component.html',
    providers: [MessageService]
})
export class AuditComponent implements OnInit {

    auditDialog: boolean = false;
    deleteAuditDialog: boolean = false;
    deleteAuditsDialog: boolean = false;

    audits: any[] = [];
    audit: any = {};
    selectedAudits: any[] = [];
    submitted: boolean = false;

    cols: any[] = [
        { field: 'aud_id', header: 'ID' },
        { field: 'aud_usuario', header: 'Usuario' },
        { field: 'aud_fecha', header: 'Fecha' },
        { field: 'aud_accion', header: 'Acción' },
        { field: 'aud_modulo', header: 'Módulo' },
        { field: 'aud_funcionalidad', header: 'Funcionalidad' },
        { field: 'aud_observacion', header: 'Observación' }
    ];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private auditApiService: AuditApiService, private messageService: MessageService) { }

    ngOnInit() {
        this.getAudit();
    }

    getAudit() {
        this.auditApiService.getAudit().subscribe(
            (data: any) => {
                console.log('Datos recibidos: ', data);
                this.audits = data.auditoria; // Asegúrate de que 'data.auditoria' contiene el array de auditorías
            },
            (error: any) => {
                console.error('Error fetching audits: ', error);
            }
        );
    }

    openNew() {
        this.audit = {};
        this.submitted = false;
        this.auditDialog = true;
    }

    deleteSelectedAudits() {
        this.deleteAuditsDialog = true;
    }

    editAudit(audit: any) {
        this.audit = { ...audit };
        this.auditDialog = true;
    }

    deleteAudit(audit: any) {
        this.deleteAuditDialog = true;
        this.audit = { ...audit };
    }

    confirmDeleteSelected() {
        this.deleteAuditsDialog = false;
        this.audits = this.audits.filter(val => !this.selectedAudits.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Auditorías Eliminadas', life: 3000 });
        this.selectedAudits = [];
    }

    confirmDelete() {
        this.deleteAuditDialog = false;
        this.audits = this.audits.filter(val => val.aud_id !== this.audit.aud_id);
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Auditoría Eliminada', life: 3000 });
        this.audit = {};
    }

    hideDialog() {
        this.auditDialog = false;
        this.submitted = false;
    }

    saveAudit() {
        this.submitted = true;

        if (this.audit.aud_usuario?.trim() && this.audit.aud_accion?.trim() && this.audit.aud_modulo?.trim() && this.audit.aud_funcionalidad?.trim() && this.audit.aud_observacion?.trim()) {
            if (this.audit.aud_id) {
                const index = this.findIndexById(this.audit.aud_id);
                if (index !== -1) {
                    this.audits[index] = this.audit;
                    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Auditoría Actualizada', life: 3000 });
                }
            } else {
                this.audit.aud_id = this.createId();
                this.audits.push(this.audit);
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Auditoría Creada', life: 3000 });
            }

            this.audits = [...this.audits];
            this.auditDialog = false;
            this.audit = {};
        }
    }

    findIndexById(id: number): number {
        return this.audits.findIndex(audit => audit.aud_id === id);
    }

    createId(): number {
        return Math.floor(Math.random() * 1000000);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
