package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.CategoriaRisco;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/categoriaRiscos")
public class CategoriaRiscoController extends BaseController<CategoriaRisco> {
    public CategoriaRiscoController() {
        super(CategoriaRisco.class);
    }
}