package com.vixteam.framework.common.support;

import org.springframework.validation.ObjectError;

import java.util.List;

public class Errors {

    private List<ObjectError> objectErrors;

    public Errors(org.springframework.validation.Errors errors) {
        this.objectErrors = errors.getAllErrors();
    }

    public List<ObjectError> getErrors() {
        return this.objectErrors;
    }
}
