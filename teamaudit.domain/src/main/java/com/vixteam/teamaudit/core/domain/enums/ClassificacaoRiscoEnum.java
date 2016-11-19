package com.vixteam.teamaudit.core.domain.enums;

public enum ClassificacaoRiscoEnum {
    SuperCategoria ("SuperCategoria", 1),
    Categoria3 ("Categoria3", 2),
    Categoria2 ("Categoria2", 3),
    Categoria ("Categoria", 4);

    private final String id;

    private final int nivel;

    ClassificacaoRiscoEnum(String id, int nivel) {
        this.id = id;
        this.nivel = nivel;
    }

    public String getId() {
        return this.id;
    }

    public int getNivel() {
        return this.nivel;
    }

    @Override
    public String toString() {
        return String.valueOf(getNivel());
    }
}