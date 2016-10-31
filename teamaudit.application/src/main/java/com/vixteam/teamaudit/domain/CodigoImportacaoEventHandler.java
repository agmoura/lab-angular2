package com.vixteam.teamaudit.domain;

import com.vixteam.teamaudit.domain.annotation.HandleBeforeSave;
import com.vixteam.teamaudit.domain.annotation.RepositoryEventHandler;

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