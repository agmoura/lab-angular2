package com.vixteam.framework.core.usecase.commons;

/**
 * Prepara o caso de uso para execucao, fazendo a injecao das dependencias ou desalocando as
 * dependencias injetadas ao invocar o metodo destroy.
 */
public interface UseCaseManager {

    void prepare(UseCase usecase);

    void destroy(UseCase usecase);
}
