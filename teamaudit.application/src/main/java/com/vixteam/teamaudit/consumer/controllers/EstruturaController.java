package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.Estrutura;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("api/estrutura")
public class EstruturaController extends BaseController<Estrutura> {
    public EstruturaController() {
        super(Estrutura.class);
    }
}