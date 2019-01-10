package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.ClassificacaoRisco;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/classificacaoRiscos")
public class ClassificacaoRiscoController extends BaseController<ClassificacaoRisco> {
    public ClassificacaoRiscoController() {
        super(ClassificacaoRisco.class);
    }
}