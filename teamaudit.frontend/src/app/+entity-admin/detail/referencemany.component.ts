import {Component, Input} from '@angular/core';

@Component({
    selector: 'reference-many',
    template: `
    <md-sidenav-container>
        <md-sidenav #sidenav align="end">
            <!--<edit [entityName]="entityName" [entityId]="entityId"></edit>-->
            <button md-button (click)="sidenav.close()">Close</button>
        </md-sidenav>
    </md-sidenav-container>
    <datagrid [entityName]="entityName" (onEdit)="entityId = $event; sidenav.open()"></datagrid>
    `
})
export class ReferenceManyComponent {
    @Input() entityName: string;
    entityId: string;

    constructor() {
    }
}