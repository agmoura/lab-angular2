package com.vixteam.extension.container.beanvalidation;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class ValidatorProducer {

    private static ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();

    @RequestScoped
    @Produces
    public Validator createValidator() {
        return validatorFactory.getValidator();
    }
}
