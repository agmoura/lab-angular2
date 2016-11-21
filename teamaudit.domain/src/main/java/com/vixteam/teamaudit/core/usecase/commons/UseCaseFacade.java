package com.vixteam.teamaudit.core.usecase.commons;


import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidatorFactory;

import com.vixteam.teamaudit.core.domain.commons.InvalidDomainException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Fachada para execucao das especificacoes de caso de uso, {@link UseCase}. Deve fazer a validação
 * básica e preparação do caso de uso para execução. Na etapa de validação, se o caso de uso for
 * invalido, lança uma {@link InvalidUseCaseException}. Já a fase de preparação do caso de uso
 * envolve a obtenção da implementação do caso de uso e injeção de dependências requeridas. Caso não
 * exista classe de implementação para a especificação de caso de uso, lança uma
 * {@link NotImplementedUseCaseException}. Por fim, a implementação do caso de uso é executada e
 * caso ocorra alguma exceção inesperada (checked ou unchecked), esta será encapsulada em uma
 * {@link UnexpectedUseCaseException}.
 * <p>
 */
@Component
public class UseCaseFacade {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private final UseCaseManager manager;

    @Autowired
    public UseCaseFacade(UseCaseManager manager) {
        this.manager = manager;
    }

    public <T> T execute(UseCase<T> usecase) {
        validate(usecase);
        manager.prepare(usecase);
        try {
            T result = executeAndHandleExceptions(usecase);
            for (UseCase<?> child : usecase.getChildren()) {
                execute(child);
            }
            return result;
        } finally {
            manager.destroy(usecase);
        }
    }

    private <T> T executeAndHandleExceptions(UseCase<T> prepared) {
        try {
            return prepared.execute();
        } catch (IllegalArgumentException ex) {
            throw new InvalidUseCaseException(ex.getMessage(), ex);
        } catch (InvalidDomainException ex) {
            throw new InvalidUseCaseException(ex.getViolations(), ex);
        } catch (Exception e) {
            throw new UnexpectedUseCaseException(prepared.getClass(), e);
        }
    }

    /**
     * Faz a validacao basica do usecase
     * <p>
     *
     * @param usecase
     */
    protected void validate(Object usecase) {
        Set<ConstraintViolation<Object>> violations = VALIDATOR_FACTORY.getValidator().validate(usecase);
        if (!violations.isEmpty()) {
            throw new InvalidUseCaseException(violations);
        }
    }

}
