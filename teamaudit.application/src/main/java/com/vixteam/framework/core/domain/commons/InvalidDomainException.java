package com.vixteam.framework.core.domain.commons;

import java.util.Set;
import javax.validation.ConstraintViolation;

/**
 * Lançada quando ha uma tentativa invalida de modificacao do estado do dominio.
 * <p>
 * <p>
 *
 */
public class InvalidDomainException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final Set<ConstraintViolation<Object>> violations;

    public InvalidDomainException() {
        super();
        violations = null;
    }

    public InvalidDomainException(String message, Throwable cause,
            boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
        violations = null;
    }

    public InvalidDomainException(String message, Throwable cause) {
        super(message, cause);
        violations = null;
    }

    public InvalidDomainException(String message) {
        super(message);
        violations = null;
    }

    public InvalidDomainException(Throwable cause) {
        super(cause);
        violations = null;
    }

    public InvalidDomainException(Set<ConstraintViolation<Object>> violations) {
        this.violations = violations;
    }

    public Set<ConstraintViolation<Object>> getViolations() {
        return violations;
    }

}
