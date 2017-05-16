package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.consumer.viewmodel.ErrorItem;
import com.vixteam.teamaudit.consumer.commons.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@ControllerAdvice
public class ExceptionController {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    public ResponseEntity handle(ValidationException ex) {

        final List<ErrorItem> errors = new ArrayList<>();

        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            String field = error instanceof FieldError ? ((FieldError) error).getField() : null;
            errors.add(new ErrorItem(field, error.getDefaultMessage()));
        }

        return ResponseEntity.badRequest().body(Collections.singletonMap("errors", errors));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    public ResponseEntity handle(MethodArgumentNotValidException ex) {
        final List<ErrorItem> errors = new ArrayList<>();

        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            String field = error instanceof FieldError ? ((FieldError) error).getField() : null;
            errors.add(new ErrorItem(field, error.getDefaultMessage()));
        }

        return ResponseEntity.badRequest().body(Collections.singletonMap("errors", errors));
    }
}