package com.vixteam.teamaudit.domain.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import com.vixteam.teamaudit.domain.Objetivo;
import com.vixteam.teamaudit.domain.CategoriaObjetivo;
import com.vixteam.teamaudit.domain.UnidadeOrganizacional;

@Projection(name = "list", types = { Objetivo.class })
interface IObjetivoProjection {

    String getNome();

    String getDescricao();

    String getDescricaoMeta();

    Double getValorMeta();

    Double getPercentualMeta();

    CategoriaObjetivo getCategoriaObjetivo();

    UnidadeOrganizacional getUnidadeOrganizacional();

    /*@Value("#{target.categoriaObjetivo.nome}")
    String getCategoriaObjetivoNome();

    @Value("#{target.categoriaObjetivo.escopo.nome}")
    String getEscopoNome();*/
}
