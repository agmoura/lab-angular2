package com.vixteam.teamaudit.repositories;

import com.vixteam.teamaudit.core.usecase.commons.Page;

import java.util.List;

public class QueryObject {
    private Page page;
    private List<String> projections;
    private List<String> predicates;
    private List<String> sorts;
    private String entityName;

    public QueryObject() {
    }

    public QueryObject(Integer pageNumber, Integer pageSize, List<String> projections, List<String> predicates, List<String> sorts) {
        setPage(pageNumber != null || pageSize != null ? new Page() : null);
        if (pageNumber != null) getPage().setNumber(pageNumber);
        if (pageSize != null) getPage().setSize(pageSize);
        setProjections(projections);
        setPredicates(predicates);
        setSorts(sorts);
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

    public List<String> getPredicates() {
        return predicates;
    }

    public void setPredicates(List<String> predicates) {
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

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    //TODO: Solução Muito Fraca. É necessário revisar.
    private String concatenate(List<String> items, String separator) {
        String result = "";
        for (int i = 0; i < items.size(); i++) {
            result += (i > 0 ? separator : "") + "e." + items.get(i);
        }
        return result;
    }

    private String buildProjections() {
        if (projections == null || projections.size() == 0) return "select e";
        return "select " + concatenate(projections, ", ");
    }

    private String buildPredicates() {
        if (predicates == null || predicates.size() == 0) return "";
        return " where " + concatenate(predicates, " and ");
    }

    private String buildOrderBy() {
        if (sorts == null || sorts.size() == 0) return "";
        return " order by " + concatenate(sorts, ", ");
    }

    public String buildQuery() {
        return buildProjections() + " from " + this.entityName + " e" + buildPredicates() + buildOrderBy();
    }

    public String buildCountQuery() {
        return "select count(e) from " + this.entityName + " e" + buildPredicates();
    }

}
