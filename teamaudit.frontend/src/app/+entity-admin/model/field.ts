import {FormGroup} from "@angular/forms";
import {FormFieldSchema, FormViewSchema} from "./schema";

export abstract class FieldComponent {
    group: FormGroup;
    schema: FormFieldSchema;
    formSchema: FormViewSchema;

    source: string;
    label: string;
    record: any = {};
}