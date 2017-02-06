import {Component, Input} from '@angular/core';

@Component({
    selector: 'reference-many',
    template: `
    <style>
        .detail-panel {
            position: absolute;
            right: 0px;
            top:0px;
            max-width: 500px;
        }
        
    </style>
    <md-sidenav #sidenav align="end" class="detail-panel">
        <edit *ngIf="entityId" [entityName]="entityName" [entityId]="entityId"></edit>
        <button md-button (click)="sidenav.close()">Close</button>
    </md-sidenav>
    <datagrid [entityName]="entityName" (onEdit)="entityId = $event; sidenav.open()"></datagrid>
    `
})
export class ReferenceManyComponent {
    @Input() entityName: string;
    entityId: string;

    constructor() {
    }
}