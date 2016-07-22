package com.vixteam.framework.common.support;

public class QueryObject {
    private Page page;
    private String[] projections;
    private String[] sorts;
    private String entityName;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String[] getProjections() {
        return projections;
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
        if(projections == null ) return "";
        return "select " + String.join(", ", (CharSequence[]) projections);
    }

    private String buildOrderBy() {
        if(sorts == null ) return "";
        return " order by " + String.join(", ", (CharSequence[]) sorts);
    }

    public String buildQuery(){
        return buildProjections() + " from " + this.entityName + buildOrderBy();
    }

    public String buildCountQuery(){
        return "select count(e) from " + this.entityName + " e";
    }
}
