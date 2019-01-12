import {FormGroup} from "@angular/forms";
import {FormFieldSchema, FormViewSchema} from "./schema";

export abstract class FieldComponent<T> {
    group: FormGroup;
    schema: FormFieldSchema<T>;

    source: string;
    label: string;
    record: any = {};
}