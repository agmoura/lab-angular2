package com.vixteam.framework.core.usecase.commons;

/**
 * Lançada caso ocorra um erro inesperado na execução de um caso de uso.
 * <p>
 *
 *
 */
public class UnexpectedUseCaseException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UnexpectedUseCaseException() {
        super();
    }

    public UnexpectedUseCaseException(String message, Throwable cause,
            boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public UnexpectedUseCaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnexpectedUseCaseException(String message) {
        super(message);
    }

    public UnexpectedUseCaseException(Throwable cause) {
        super(cause);
    }

    public UnexpectedUseCaseException(Class<?> useCaseType, Throwable cause) {
        super("Erro ao executar caso de uso " + useCaseType.getSimpleName()
                + ": " + cause.getLocalizedMessage(), cause);
    }

}
