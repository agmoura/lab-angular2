package com.vixteam.teamaudit.core.usecase.commons;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe base para as especificações de casos de uso do sistema. Trata-se de um misto dos patterns
 * command e composite.
 * <p>
 * <p>
 * Todos os casos de uso que herdam diretamente de {@link UseCase} e portanto fazem parte da API de
 * casos de uso, não devem implementar o método {@link UseCase#execute()}. Este método deve ser
 * especificado na implementação do caso de uso em biblioteca adequada.
 * <p>
 * Ex.: MeuCasoUsoImpl na biblioteca app.usecase herda de MeuCasoUso na biblioteca app.api, que
 * herda de {@link UseCase}, também na biblioteca app.api. No caso a classe MeuCasoUsoImpl é a
 * implementacao da especificacao de caso de uso MeuCasoUso.
 * </p>
 * <p>
 * <p>
 * Todos as especificações de casos de uso devem ser executados por meio do {@link UseCaseFacade}.
 * Como seja um caso de uso composto, o pai será o primeiro a ser executado e em seguida os filhos e
 * assim recursivamente. A variável {@link UseCase#cache} pode servir como um meio de comunicação
 * entre o caso de uso pai e os filhos.
 * </p>
 * <p>
 *
 * @param <T>
 */
@SuppressWarnings("rawtypes")
public abstract class UseCase<T> implements Serializable {

    private static final long serialVersionUID = -5102863988867443860L;

    /**
     * Variavel que permite a passagem
     */
    private Object cache;

    private UseCase parent;

    private final List<UseCase> children = new ArrayList<>();

    public Object getCache() {
        return cache;
    }

    protected void setCache(Object cache) {
        this.cache = cache;
    }

    public UseCase getParent() {
        return parent;
    }

    protected void setParent(UseCase parent) {
        this.parent = parent;
    }

    List<UseCase> getChildren() {
        return children;
    }

    @SuppressWarnings("unchecked")
    public void add(UseCase child) {
        children.add(child);
        child.parent = this;
    }

    protected abstract T execute() throws Exception;
}
