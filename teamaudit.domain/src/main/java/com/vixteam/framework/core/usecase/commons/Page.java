package com.vixteam.framework.core.usecase.commons;

public class Page {
    private Integer number = 0;
    private Integer size = 10;
    private Integer totalItens;

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getTotalItems() {
        return totalItens;
    }

    public void setTotalItems(Integer totalItens) {
        this.totalItens = totalItens;
    }

    public int getFirstItemIndex() {
        return this.size * this.number;
    }
}
