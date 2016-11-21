package com.vixteam.teamaudit._backup;

import com.vixteam.teamaudit.core.domain.CategoriaObjetivo;
import com.vixteam.teamaudit.core.domain.Escopo;
import com.vixteam.teamaudit._backup.annotation.*;

@RepositoryEventHandler
public class CodigoImportacaoEventHandler {

    @HandleBeforeSave
    public void handleEscopoSave(Escopo escopo) {
        // … you can now deal with Person in a type-safe way
    }

    @HandleBeforeSave
    public void handleCategoriaObjetivoSave(CategoriaObjetivo categoriaObjetivo) {
        // … you can now deal with Profile in a type-safe way
    }
}