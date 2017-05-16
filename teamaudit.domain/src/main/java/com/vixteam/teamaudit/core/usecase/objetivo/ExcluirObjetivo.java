package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import javax.inject.Inject;
import java.io.Serializable;

public class ExcluirObjetivo extends UseCase<Void> {

    @Inject
    private IEntityRepository<Objetivo> repository;

    private Serializable id;

    public ExcluirObjetivo(Serializable id) {
        this.id = id;
    }

    @Override
    protected Void execute() throws Exception {
        repository.delete(Objetivo.class, this.id);
        return null;
    }
}
