package com.vixteam.teamaudit.setup;

import java.util.Random;
import javax.inject.Inject;
import javax.transaction.Transactional;

import com.vixteam.teamaudit.domain.*;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.repositories.IEntityRepository;

public class DatabaseLoader {

    @Inject
    IEntityRepository repository;

    @Transactional
    public String loadDatabase() {

        int unidadeCount = 2;
        int escopoCount = 5;
        int categoriaCount = 10;
        int objetivoCount = 100;
        int classificacaoRiscoCount = 5;
        int categoriaRiscoCount = 100;

        UnidadeOrganizacional[] unidades = new UnidadeOrganizacional[unidadeCount];
        Escopo[] escopos = new Escopo[escopoCount];
        CategoriaObjetivo[] categoriaObjetivos = new CategoriaObjetivo[categoriaCount];
        ClassificacaoRisco[] classificacaoRiscos = new ClassificacaoRisco[classificacaoRiscoCount];
        CategoriaRisco[] categoriaRiscos = new CategoriaRisco[categoriaRiscoCount];
        Random random = new Random();

        for (int i = 0; i < unidadeCount; i++) {
            UnidadeOrganizacional unidade = new UnidadeOrganizacional();
            String number = String.format("%04d", i);
            unidade.setNome("Unidade " + number);
            unidades[i] = repository.save(unidade);
        }

        for (int i = 0; i < escopoCount; i++) {
            Escopo escopo = new Escopo();
            String number = String.format("%04d", i);
            escopo.setNome("Escopo " + number);
            escopo.setDescricao("Descrição do Escopo " + number);
            escopos[i] = repository.save(escopo);
        }

        for (int i = 0; i < categoriaCount; i++) {
            CategoriaObjetivo categoriaObjetivo = new CategoriaObjetivo();
            String number = String.format("%04d", i);
            categoriaObjetivo.setNome("Categoria " + number);
            categoriaObjetivo.setDescricao("Descrição da Categoria " + number);
            categoriaObjetivo.setIndicadorInternoSistema(SimNaoEnum.Nao);
            categoriaObjetivo.setEscopo(escopos[random.nextInt(escopoCount)]);
            categoriaObjetivos[i] = repository.save(categoriaObjetivo);
        }

        for (int i = 0; i < objetivoCount; i++) {
            Objetivo objetivo = new Objetivo();
            String number = String.format("%04d", i);
            objetivo.setNome("Objetivo " + number);
            objetivo.setDescricao("Descrição do Objetivo " + number);
            objetivo.setCategoriaObjetivo(categoriaObjetivos[random.nextInt(categoriaCount)]);
            objetivo.setUnidadeOrganizacional(unidades[random.nextInt(unidadeCount)]);
            objetivo.setValorMeta(2.5 * i);
            objetivo.setPercentualMeta(i / 10.0);
            repository.save(objetivo);
        }

        for (int i = 0; i < classificacaoRiscoCount; i++) {
            ClassificacaoRisco classificacaoRisco = new ClassificacaoRisco();
            String number = String.format("%04d", i);
            classificacaoRisco.setNome("Classificacao Risco " + number);
            classificacaoRisco.setDescricao("Descrição da Classificacao Risco " + number);
            classificacaoRisco.setNumeroNivel(i);
            classificacaoRiscos[i] = repository.save(classificacaoRisco);
        }

        for (int i = 1; i < categoriaRiscoCount; i++) {
            CategoriaRisco categoriaRisco = new CategoriaRisco();
            String number = String.format("%04d", i);
            categoriaRisco.setNome("Categoria Risco " + number);
            categoriaRisco.setDescricao("Descrição da Categoria Risco " + number);
            categoriaRisco.setIndicadorInternoSistema(SimNaoEnum.Nao);
            categoriaRisco.setEscopo(escopos[random.nextInt(escopoCount)]);

            int j = floorDiv(i - 1, 3);

            if (j == 0) {
                categoriaRisco.setOrdem("0");
                categoriaRisco.setClassificacaoRisco(classificacaoRiscos[0]);
                categoriaRisco.setCategoriaRiscoPai(null);

            } else {
                CategoriaRisco pai = categoriaRiscos[j];
                categoriaRisco.setOrdem(pai.getOrdem() + 1);
                categoriaRisco.setClassificacaoRisco(classificacaoRiscos[1]);
                categoriaRisco.setCategoriaRiscoPai(pai);
            }

            categoriaRiscos[i] = repository.save(categoriaRisco);
        }

        return "OK";
    }

    public static int floorDiv(int x, int y) {
        int r = x / y;
        // if the signs are different and modulo not zero, round down
        if ((x ^ y) < 0 && (r * y != x)) r--;
        return r;
    }
}