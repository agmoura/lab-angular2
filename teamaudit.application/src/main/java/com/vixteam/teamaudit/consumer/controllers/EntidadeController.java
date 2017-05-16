package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.Entidade;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/entidades")
public class EntidadeController extends BaseController<Entidade> {

    public EntidadeController() {
        super(Entidade.class);
    }
}