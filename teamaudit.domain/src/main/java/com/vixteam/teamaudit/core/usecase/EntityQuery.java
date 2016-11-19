package com.vixteam.teamaudit.core.usecase;

import com.vixteam.framework.core.usecase.commons.Page;
import com.vixteam.framework.core.usecase.commons.PagedList;
import com.vixteam.framework.core.usecase.commons.QueryPaginada;

import java.util.HashMap;
import java.util.List;

public class EntityQuery extends QueryPaginada<PagedList> {
    private Page page;
    private List<String> projections;
    private HashMap<String, Object> predicates;
    private List<String> sorts;
    private String entityPath;

    public EntityQuery() {
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public List<String> getProjections() {
        return projections;
    }

    public HashMap<String, Object>  getPredicates() {
        return predicates;
    }

    public void setPredicates(HashMap<String, Object>  predicates) {
        this.predicates = predicates;
    }

    public void setProjections(List<String> projections) {
        this.projections = projections;
    }

    public List<String> getSorts() {
        return sorts;
    }

    public void setSorts(List<String> sorts) {
        this.sorts = sorts;
    }

    public String getEntityPath() {
        return this.entityPath;
    }

    public void setEntityPath(String entityPath) {
        this.entityPath = entityPath;
    }

    @Override
    protected PagedList execute() throws Exception {
        return null;
    }
}
