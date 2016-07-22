package com.vixteam.teamaudit.resources;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.vixteam.teamaudit.domain.UnidadeOrganizacional;

@RepositoryRestResource(collectionResourceRel = "unidadeOrganizacional", path = "unidadeOrganizacional")
public interface UnidadeOrganizacionalRepository extends PagingAndSortingRepository<UnidadeOrganizacional, String> {

}
