package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.Processo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("api/processo")
public class ProcessoController extends BaseController<Processo> {
    public ProcessoController() {
        super(Processo.class);
    }
}