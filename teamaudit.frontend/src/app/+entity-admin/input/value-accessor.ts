import {ControlValueAccessor} from '@angular/forms';
import {FieldComponent} from "../model/field";

export abstract class ValueAccessorBase<T> extends FieldComponent implements ControlValueAccessor {
    private innerValue: T;

    private changed = [];
    private touched = [];

    get value(): T {
        return this.innerValue;
    }

    set value(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    writeValue(value: T) {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: T) => void) {
        this.changed.push(fn);
    }

    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    touch() {
        this.touched.forEach(f => f());
    }
}