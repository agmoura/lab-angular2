import {FormGroup} from "@angular/forms";
import {FormFieldSchema} from "./schema";

export abstract class FieldComponent {
    group: FormGroup;
    schema: FormFieldSchema;

    source: string;
    label: string;
    record: any = {};
}