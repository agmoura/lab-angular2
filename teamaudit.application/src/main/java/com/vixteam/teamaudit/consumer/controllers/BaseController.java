package com.vixteam.teamaudit.consumer.controllers;

import java.io.IOException;
import com.vixteam.teamaudit.consumer.commons.ApplicationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.vixteam.framework.core.usecase.commons.UseCaseFacade;

@RestController
@RequestMapping("/api/usecase")
public class BaseController {

    @Autowired
    private UserContext context;

    @Autowired
    private UseCaseFacade facade;

    @RequestMapping(method = RequestMethod.GET)
    //@AuthorizedResource(SecurityResources.ANALISE_SURGENCIA)
    public ListaPaginada<AnaliseSurgenciaResumidaDto> listar(
            ListarAnaliseSurgencia filtro) {
        filtro.setUnidadeOperativa(context.getIdUnidadeOperativa());
        return facade.execute(filtro);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    //@AuthorizedResource(SecurityResources.ANALISE_SURGENCIA)
    public ResponseEntity<AnaliseSurgenciaDto> obter(@PathVariable Long id) {
        AnaliseSurgenciaDto dto = facade.execute(new ObterAnaliseSurgencia(id));
        if (dto == null) {
            throw new ApplicationException("Analise de surgencia inexistente: " + id);
        }
        return ResponseEntity.ok(dto);
    }

    @RequestMapping(value = "/download/{id}", method = RequestMethod.GET)
    //@AuthorizedResource(SecurityResources.ANALISE_SURGENCIA)
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        ArquivoAnaliseSurgenciaDto arquivo = facade.execute(new DownloadAnaliseSurgencia(id));
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + arquivo.getNome())
                .cacheControl(CacheControl.noCache()).body(arquivo.getConteudo());
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    //@AuthorizedResource(SecurityResources.ANALISE_SURGENCIA)
    public void incluir(IncluirAnaliseSurgencia cmd, @RequestParam(required = false) MultipartFile file) throws IOException {
        if (file != null) {
            cmd.setArquivo(file.getOriginalFilename());
            cmd.setConteudo(file.getBytes());
        }
        cmd.setUsuarioId(context.getChave());
        facade.execute(cmd);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    //@AuthorizedResource(SecurityResources.ANALISE_SURGENCIA)
    public void atualizar(AtualizarAnaliseSurgencia cmd,
            @RequestParam(required = false) MultipartFile file) throws IOException {
        if (file != null) {
            cmd.setArquivo(file.getOriginalFilename());
            cmd.setConteudo(file.getBytes());
        }
        cmd.setUsuarioId(context.getChave());
        facade.execute(cmd);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    //@AuthorizedResource(SecurityResources.ANALISE_SURGENCIA)
    public void inativar(@PathVariable Long id) {
        InativarAnaliseSurgencia cmd = new InativarAnaliseSurgencia();
        cmd.setId(id);
        cmd.setUsuarioId(context.getChave());
        facade.execute(cmd);
    }

}
