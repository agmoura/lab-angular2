package com.vixteam.teamaudit.core.usecase.commons;

import java.util.Collection;

/**
 * Facilidade para retorno de listas paginadas.
 * <p>
 *
 *
 * @param <T>
 */
@Deprecated
public class ListaPaginada<T> {

    private Long total;

    private Collection<T> itens;

    public ListaPaginada() {
    }

    public ListaPaginada(Long total, Collection<T> itens) {
        this.total = total;
        this.itens = itens;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Collection<T> getItens() {
        return itens;
    }

    public void setItens(Collection<T> itens) {
        this.itens = itens;
    }

}
