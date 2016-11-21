package com.vixteam.teamaudit.core.usecase.commons;

import java.io.Serializable;
import java.util.List;

public class PagedList implements Serializable {
    private List list;
    private Page page;

    public PagedList(){
    }

    public PagedList(List list, Page page){
        setList(list);
        setPage(page);
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
}