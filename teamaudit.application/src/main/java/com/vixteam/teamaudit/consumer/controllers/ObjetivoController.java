package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("api/objetivos")
public class ObjetivoController extends BaseController<Objetivo> {
    public ObjetivoController() {
        super(Objetivo.class);
    }
}