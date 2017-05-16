package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import org.mapstruct.factory.Mappers;

import javax.inject.Inject;
import java.io.Serializable;

public class ObterObjetivo extends UseCase<ObjetivoDto> {

    @Inject
    private IEntityRepository<Objetivo> repository;

    private ObjetivoMapper mapper = Mappers.getMapper(ObjetivoMapper.class);

    private Serializable id;

    public ObterObjetivo(Serializable id) {
        this.id = id;
    }

    @Override
    protected ObjetivoDto execute() throws Exception {
        return mapper.toObjetivoDto(repository.get(Objetivo.class, this.id));
    }
}
