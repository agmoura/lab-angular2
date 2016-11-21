package com.vixteam.teamaudit.core.usecase.commons;

/**
 * Facilidade para implementacao de queries paginadas.
 * <p>
 *
 *
 * @param <T> tipo a ser consultado
 */
public abstract class PagedQuery<T> extends UseCase<T> {

    private static final long serialVersionUID = 2061186501421702182L;

    private int firstResult;

    private int maxResult;

    public int getFirstResult() {
        return firstResult;
    }

    public void setFirstResult(int firstResult) {
        this.firstResult = firstResult;
    }

    public int getMaxResult() {
        return maxResult;
    }

    public void setMaxResult(int maxResult) {
        this.maxResult = maxResult;
    }

}
