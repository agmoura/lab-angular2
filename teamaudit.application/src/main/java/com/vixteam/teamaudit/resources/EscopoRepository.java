package com.vixteam.teamaudit.resources;


import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.vixteam.teamaudit.domain.Escopo;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "escopo", path = "escopo")
public interface EscopoRepository extends PagingAndSortingRepository<Escopo, String> {
    List<Escopo> findByNome(@Param("nome") String nome);
}
