package com.vixteam.framework.common.support;

import java.util.Arrays;

public class QueryObject {
    private Page page;
    private String[] projections;
    private String[] predicates;
    private String[] sorts;
    private String entityName;

    public QueryObject() {

    }

    public QueryObject(Integer pageNumber, Integer pageSize, String[] projections, String[] predicates, String[] sorts) {
        setPage(pageNumber != null || pageSize != null ? new Page() : null);
        if(pageNumber != null ) getPage().setNumber(pageNumber);
        if(pageSize != null ) getPage().setSize(pageSize);
        setProjections(projections);
        setPredicates(predicates);
        setSorts(sorts);
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page  = page;
    }

    public String[] getProjections() {
        return projections;
    }

    public String[] getPredicates() {
        return predicates;
    }

    public void setPredicates(String[] predicates) {
        this.predicates = predicates;
    }

    public void setProjections(String[] projections) {
        this.projections = projections;
    }

    public String[] getSorts() {
        return sorts;
    }

    public void setSorts(String[] sorts) {
        this.sorts = sorts;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    private String buildProjections() {
        if(projections == null || projections.length == 0) return "select e";
        return "select " + String.join(", ", (CharSequence[]) projections);
    }

    private String concatenate(String[] items, String separator){
        String result = "";
        for (int i = 0; i < items.length; i++) {
            result +=  (i > 0 ? separator : "") + "e." + items[i];
        }
        return result;
    }

    private String buildPredicates() {
        if(predicates == null || predicates.length == 0) return "";
        return " where " + concatenate(predicates, " and ");
    }

    private String buildOrderBy() {
        if(sorts == null || sorts.length == 0) return "";
        return " order by " + concatenate(sorts, ", ");
    }

    public String buildQuery(){
        return buildProjections() + " from " + this.entityName + " e" + buildPredicates() + buildOrderBy();
    }

    public String buildCountQuery(){
        return "select count(e) from " + this.entityName + " e" + buildPredicates();
    }

}
