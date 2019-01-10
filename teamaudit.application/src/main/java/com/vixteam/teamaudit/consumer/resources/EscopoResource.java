package com.vixteam.teamaudit.consumer.resources;

import com.vixteam.teamaudit.core.domain.CategoriaRisco;
import com.vixteam.teamaudit.core.domain.Escopo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "escopo", path = "escopo")
public interface EscopoResource extends PagingAndSortingRepository<Escopo, String> {
    List<Escopo> findByNome(@Param("nome") String nome);
}