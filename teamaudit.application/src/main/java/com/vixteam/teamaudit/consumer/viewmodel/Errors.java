package com.vixteam.teamaudit.consumer.viewmodel;

import org.springframework.validation.ObjectError;

import java.util.List;

@Deprecated
public class Errors {

    private List<ObjectError> objectErrors;

    public Errors(org.springframework.validation.Errors errors) {
        this.objectErrors = errors.getAllErrors();
    }

    public List<ObjectError> getErrors() {
        return this.objectErrors;
    }
}
