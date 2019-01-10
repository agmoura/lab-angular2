package com.vixteam.teamaudit.consumer.resources;

import com.vixteam.teamaudit.core.domain.CategoriaRisco;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "categoriaRisco", path = "categoriaRisco")
public interface CategoriaRiscoResource extends PagingAndSortingRepository<CategoriaRisco, String> {
    List<CategoriaRisco> findByNome(@Param("nome") String nome);
}