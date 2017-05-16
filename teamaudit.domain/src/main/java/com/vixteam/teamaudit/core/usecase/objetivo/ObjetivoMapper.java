package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.objetivo.CategoriaObjetivo;
import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {CategoriaObjetivoMapper.class})
public interface ObjetivoMapper {

    Objetivo toObjetivo(SalvarObjetivo source);

    ObjetivoDto toObjetivoDto(Objetivo source);

    /*PagedList<ObjetivoDto> toObjetivoDtoPagedList(PagedList<Objetivo> source);

    @IterableMapping(elementTargetType = ObjetivoDto.class)
    List<ObjetivoDto> toObjetivoDtoList(List<Objetivo> source);*/
}