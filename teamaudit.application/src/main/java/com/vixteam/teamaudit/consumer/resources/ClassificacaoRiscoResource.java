package com.vixteam.teamaudit.consumer.resources;

import com.vixteam.teamaudit.core.domain.ClassificacaoRisco;
import com.vixteam.teamaudit.core.domain.Escopo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "classificacaoRisco", path = "classificacaoRisco")
public interface ClassificacaoRiscoResource extends PagingAndSortingRepository<ClassificacaoRisco, String> {
    List<ClassificacaoRisco> findByNome(@Param("nome") String nome);
}