import {FieldSchema, FormViewSchema, ListViewSchema, ResourceSchema, TreeViewSchema} from "./schema";

export class ResourceSchemaFactory {

    public static create(resource: string, schema: ResourceSchema): ResourceSchema {
        ResourceSchemaFactory.initialize(resource, schema);
        return schema;
    }

    private static initialize(resource: string, schema: ResourceSchema) {
        schema.resource = resource;
        schema.listView.fields.forEach((item, index) => ResourceSchemaFactory.initializeFields(resource, item, index));
        schema.formView.fields.forEach((item, index) => ResourceSchemaFactory.initializeFields(resource, item, index));

        if (schema.formView.references) {
            schema.formView.references.forEach(
                item => ResourceSchemaFactory.initialize(item.resource, item)
            );
        }
    }

    private static initializeFields(resource: string, item: FieldSchema, index: number) {
        item.index = index;
        if (!item.label) item.label = (resource + '.' + item.source).toUpperCase();
    }
}

export class ResourceSchemaBase implements ResourceSchema {
    readonly resource?: string;
    readonly listView: ListViewSchema;
    readonly formView: FormViewSchema;
    readonly treeView?: TreeViewSchema;

    constructor(resource: string, schema?: ResourceSchema) {
        Object.assign(this, schema);
        this.initialize(resource, this);
    }

    private initialize(resource: string, schema: ResourceSchema) {
        schema.resource = resource;
        schema.listView.fields.forEach((item, index) => this.initializeFields(item, index));
        schema.formView.fields.forEach((item, index) => this.initializeFields(item, index));

        if (schema.formView.references) {
            schema.formView.references.forEach(
                item => this.initialize(item.resource, item)
            );
        }
    }

    private initializeFields(item: FieldSchema, index: number) {
        item.index = index;
        if (!item.label) item.label = (this.resource + '.' + item.source).toUpperCase();
    }
}