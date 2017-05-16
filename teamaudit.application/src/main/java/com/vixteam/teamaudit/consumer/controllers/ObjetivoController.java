package com.vixteam.teamaudit.consumer.controllers;

import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import com.vixteam.teamaudit.core.usecase.baseentity.GetEntity;
import com.vixteam.teamaudit.core.usecase.baseentity.QueryEntities;
import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import com.vixteam.teamaudit.core.usecase.objetivo.*;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController()
@RequestMapping("api/objetivos")
public class ObjetivoController {

    @Inject
    protected UseCaseFacade facade;

    @PostMapping("query")
    public PagedList<Object[]> query(@RequestBody EntityQuery entityQuery) {
        return facade.execute(new ListarObjetivos(entityQuery));
    }

    @GetMapping("{id}")
    public ObjetivoDto get(@PathVariable String id) {
        return facade.execute(new ObterObjetivo(id));
    }

    @Transactional
    @PostMapping
    public ObjetivoDto add(@Valid @RequestBody IncluirObjetivo command) {
        return facade.execute(command);
    }

    @Transactional
    @PutMapping("{id}")
    public ObjetivoDto update(@PathVariable String id, @Valid @RequestBody AtualizarObjetivo command) {
        return facade.execute(command);
    }

    @Transactional
    @DeleteMapping("{id}")
    public void delete(@PathVariable  String id) {
        facade.execute(new ExcluirObjetivo(id));
    }
}