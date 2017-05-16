package com.vixteam.teamaudit.core.usecase.commons;

import java.io.Serializable;
import java.util.List;

public class PagedList<T> implements Serializable {
    private List<T> list;
    private Page page;

    public PagedList(){
    }

    public PagedList(List<T> list, Page page){
        setList(list);
        setPage(page);
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }
}