package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.objetivo.CategoriaObjetivo;
import org.mapstruct.Mapper;

@Mapper
public interface CategoriaObjetivoMapper {

    CategoriaObjetivoDto toCategoriaObjetivoDto(CategoriaObjetivo source);

    CategoriaObjetivo toCategoriaObjetivo(CategoriaObjetivoDto source);
}