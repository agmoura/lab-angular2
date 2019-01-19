package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.PlanoAnual;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("api/planoAnual")
public class PlanoAnualController extends BaseController<PlanoAnual> {
    public PlanoAnualController() {
        super(PlanoAnual.class);
    }
}