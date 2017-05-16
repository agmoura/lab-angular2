package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.Escopo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/escopos")
public class EscopoController extends BaseController<Escopo> {

    public EscopoController() {
        super(Escopo.class);
    }
}
