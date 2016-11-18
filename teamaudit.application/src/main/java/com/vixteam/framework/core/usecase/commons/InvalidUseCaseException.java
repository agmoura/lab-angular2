package com.vixteam.framework.core.usecase.commons;

import java.util.Set;
import javax.validation.ConstraintViolation;

/**
 * Lançada em caso de erros de validação do caso de uso.
 * <p>
 */
public class InvalidUseCaseException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final Set<ConstraintViolation<Object>> violations;

    public InvalidUseCaseException() {
        super();
        violations = null;
    }

    public InvalidUseCaseException(String message, Throwable cause,
                                   boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
        violations = null;
    }

    public InvalidUseCaseException(String message, Throwable cause) {
        super(message, cause);
        violations = null;
    }

    public InvalidUseCaseException(String message) {
        super(message);
        violations = null;
    }

    public InvalidUseCaseException(Throwable cause) {
        super(cause);
        violations = null;
    }

    public InvalidUseCaseException(Set<ConstraintViolation<Object>> violations) {
        super(InvalidUseCaseException.mountMessage(violations));
        this.violations = violations;
    }

    public InvalidUseCaseException(Set<ConstraintViolation<Object>> violations,
                                   Throwable cause) {
        super(InvalidUseCaseException.mountMessage(cause.getMessage(),
                violations), cause);
        this.violations = violations;
    }

    /**
     * @return erros de validação do caso de uso
     */
    public Set<ConstraintViolation<Object>> getViolations() {
        return violations;
    }

    private static String mountMessage(
            Set<ConstraintViolation<Object>> violations) {
        return mountMessage(null, violations);
    }

    private static String mountMessage(String cause, Set<ConstraintViolation<Object>> violations) {
        StringBuilder message = new StringBuilder();
        if (cause != null && !cause.isEmpty()) {
            message.append(cause);
            message.append(" ");
        }
        if (violations != null) {
            for (ConstraintViolation<Object> violation : violations) {
                message.append("[");
                message.append(violation.getMessage());
                message.append("]");
            }
        }
        return message.toString();
    }

}
