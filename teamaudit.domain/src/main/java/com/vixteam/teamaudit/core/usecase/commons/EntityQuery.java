package com.vixteam.teamaudit.core.usecase.commons;

import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

public class EntityQuery {
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

   /* public String getEntityPath() {
        return this.entityPath;
    }

    public void setEntityPath(String entityPath) {
        this.entityPath = entityPath;
    }*/
}
