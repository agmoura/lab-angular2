package com.vixteam.teamaudit.resources;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.vixteam.teamaudit.domain.Objetivo;

@RepositoryRestResource(collectionResourceRel = "objetivos", path = "objetivos")
public interface ObjetivoRepository extends PagingAndSortingRepository<Objetivo, String> {
    List<Objetivo> findByNome(@Param("nome") String nome);
    List<Objetivo> findByNomeContaining(@Param("nome") String nome);
}
