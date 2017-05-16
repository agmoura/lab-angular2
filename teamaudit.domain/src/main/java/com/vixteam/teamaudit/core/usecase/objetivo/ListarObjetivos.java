package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;

import javax.inject.Inject;

public class ListarObjetivos extends UseCase<PagedList<Object[]>> {

    @Inject
    private IEntityRepository<Objetivo> repository;

    private EntityQuery entityQuery;

    public ListarObjetivos(EntityQuery entityQuery) {
        this.entityQuery = entityQuery;
    }

    @Override
    protected PagedList<Object[]> execute() throws Exception {
        return repository.query(Objetivo.class, this.entityQuery);
    }
}
