package com.vixteam.teamaudit.domain.enums;

public enum SimNaoEnum {
    Nao("N", "Não"),
    Sim("S", "Sim");

    private final String id;

    private final String descricao;

    private SimNaoEnum(String id, String descricao) {
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