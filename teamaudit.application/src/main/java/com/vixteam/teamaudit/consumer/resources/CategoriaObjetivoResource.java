package com.vixteam.teamaudit.consumer.resources;

import com.vixteam.teamaudit.core.domain.objetivo.CategoriaObjetivo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "categoriaObjetivo", path = "categoriaObjetivo")
public interface CategoriaObjetivoResource extends PagingAndSortingRepository<CategoriaObjetivo, String> {
    List<CategoriaObjetivo> findByNome(@Param("nome") String nome);
}