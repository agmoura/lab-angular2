package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.usecase.commons.Page;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.PagedQuery;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;

public class EntityQuery extends PagedQuery<PagedList> {
    private Page page;
    private List<String> projections;
    private HashMap<String, Object> predicates;
    private List<String> sorts;
    private String entityPath;

    @Autowired
    private IEntityRepository repository;

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
        return repository.find(this);
    }
}
