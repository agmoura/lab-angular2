package com.vixteam.framework.common.support;

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

    public Integer getTotalItens() {
        return totalItens;
    }

    public void setTotalItens(Integer totalItens) {
        this.totalItens = totalItens;
    }

    public int getFirstItemIndex() {
        return this.size * this.number;
    }
}
