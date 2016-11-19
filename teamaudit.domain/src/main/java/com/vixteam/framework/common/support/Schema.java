package com.vixteam.framework.common.support;

import java.util.ArrayList;
import java.util.List;

@Deprecated
public class Schema {

    public class Item {
        private String field;
        private String label;
        private String type;

        public Item(String field, String label, String type){
            setField(field);
            setLabel(label);
            setType(type);
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

    private List<Item> items = new ArrayList<Item>();

    public Item addItem(String field, String label, String type) {
        Item item = new Item(field, label, type);
        items.add(item);
        return item;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
