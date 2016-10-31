package com.vixteam.teamaudit.resources.support;

import com.vixteam.framework.common.support.ErrorItem;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@ControllerAdvice
public class ValidationControllerAdvice {

    @ExceptionHandler
    public ResponseEntity handleValidtionErrors(ValidationException ex) {

        final List<ErrorItem> errors = new ArrayList<>();

        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            String field = error instanceof FieldError ? ((FieldError) error).getField() : null;
            errors.add(new ErrorItem(field, error.getDefaultMessage()));
        }

        return ResponseEntity.badRequest().body(Collections.singletonMap("errors", errors));
    }
}