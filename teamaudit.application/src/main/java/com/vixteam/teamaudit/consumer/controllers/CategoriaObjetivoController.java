package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.objetivo.CategoriaObjetivo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/categoriaObjetivos")
public class CategoriaObjetivoController extends BaseController<CategoriaObjetivo> {
    public CategoriaObjetivoController() {
        super(CategoriaObjetivo.class);
    }
}