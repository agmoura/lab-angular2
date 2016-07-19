package com.vixteam.teamaudit.domain.enums;

public enum TipoPlanoAnualEnum {
    ESTRATEGICO ("00000000000000000000000000023001", "Estratégico"),
    TATICO ("00000000000000000000000000023002", "Tático");

    private final String id;
    private final String descricao;

    TipoPlanoAnualEnum(String id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public String getId() {
        return this.id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    @Override
    public String toString() {
        return getDescricao();
    }
}
