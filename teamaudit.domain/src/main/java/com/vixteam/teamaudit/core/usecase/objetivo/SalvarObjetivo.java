package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.UnidadeOrganizacional;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import org.mapstruct.factory.Mappers;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

class SalvarObjetivo extends UseCase<ObjetivoDto> {

    @Inject
    private IEntityRepository<Objetivo> repository;

    private ObjetivoMapper mapper = Mappers.getMapper(ObjetivoMapper.class);

    private String id;

    @NotNull
    @Size(max = 60)
    private String nome;

    @NotNull
    @Size(max = 255)
    private String descricao;

    @NotNull
    private UnidadeOrganizacional unidadeOrganizacional; //TODO: Criar DTO

    @NotNull
    private CategoriaObjetivoDto categoriaObjetivo;

    @Size(max = 255)
    private String descricaoMeta;

    private Double valorMeta;

    private Double percentualMeta;

    public SalvarObjetivo() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public CategoriaObjetivoDto getCategoriaObjetivo() {
        return categoriaObjetivo;
    }

    public void setCategoriaObjetivo(CategoriaObjetivoDto categoriaObjetivo) {
        this.categoriaObjetivo = categoriaObjetivo;
    }

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
    }

    public String getDescricaoMeta() {
        return descricaoMeta;
    }

    public void setDescricaoMeta(String descricaoMeta) {
        this.descricaoMeta = descricaoMeta;
    }

    public Double getValorMeta() {
        return valorMeta;
    }

    public void setValorMeta(Double valorMeta) {
        this.valorMeta = valorMeta;
    }

    public Double getPercentualMeta() {
        return percentualMeta;
    }

    public void setPercentualMeta(Double percentualMeta) {
        this.percentualMeta = percentualMeta;
    }

    @Override
    protected ObjetivoDto execute() throws Exception {
        return mapper.toObjetivoDto(repository.save(mapper.toObjetivo(this)));
    }

}
