package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.UnidadeOrganizacional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("api/organizationalUnits")
public class OrganizationalUnitController extends BaseController<UnidadeOrganizacional> {

    public OrganizationalUnitController() {
        super(UnidadeOrganizacional.class);
    }
}