package com.vixteam.framework.core.domain.commons;

import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 * Template para builders de elementos do dominio com suporte a validacao, executada ao se invocar o
 * metodo {@link DomainBuilderTemplate#build()}. Caso haja algum erro de validacao, lanca uma
 * {@link InvalidDomainException}.
 * <p>
 * <p>
 *
 * @param <T> tipo do item a ser construido
 */
public abstract class DomainBuilderTemplate<T> {

    protected abstract T construct();

    public T build() {
        validate(this);
        return construct();
    }

    private void validate(Object object) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Object>> violations = validator.validate(object);
        if (!violations.isEmpty()) {
            throw new InvalidDomainException(violations);
        }
    }

}
