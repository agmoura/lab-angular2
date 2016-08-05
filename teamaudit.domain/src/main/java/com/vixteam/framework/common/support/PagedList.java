package com.vixteam.framework.common.support;

import java.io.Serializable;
import java.util.List;

public class PagedList implements Serializable {
    private List list;
    private Page page;
    private Schema schema;

    public PagedList(){
    }

    public PagedList(List list, Page page, Schema schema){
        setList(list);
        setPage(page);
        setSchema(schema);
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Schema getSchema() {
        return schema;
    }

    public void setSchema(Schema schema) {
        this.schema = schema;
    }
}