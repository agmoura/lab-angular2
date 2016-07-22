package com.vixteam.teamaudit.resources;


import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.vixteam.teamaudit.domain.CategoriaObjetivo;

@RepositoryRestResource(collectionResourceRel = "categoriaObjetivo", path = "categoriaObjetivo")
public interface CategoriaObjetivoRepository extends PagingAndSortingRepository<CategoriaObjetivo, String> {
    List<CategoriaObjetivo> findByNome(@Param("nome") String nome);
}
