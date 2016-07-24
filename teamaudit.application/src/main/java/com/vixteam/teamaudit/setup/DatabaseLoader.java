package com.vixteam.teamaudit.setup;

import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vixteam.teamaudit.domain.*;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;

@Component
public class DatabaseLoader implements ApplicationListener<ContextRefreshedEvent> {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        int unidadeCount = 2;
        int escopoCount = 5;
        int categoriaCount = 10;
        int objetivoCount = 100;
        int classificacaoRiscoCount = 5;
        int categoriaRiscoCount = 10000;

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
            unidades[i] = this.entityManager.merge(unidade);
        }

        for (int i = 0; i < escopoCount; i++) {
            Escopo escopo = new Escopo();
            String number = String.format("%04d", i);
            escopo.setNome("Escopo " + number);
            escopo.setDescricao("Descrição do Escopo " + number);
            escopos[i] = this.entityManager.merge(escopo);
        }

        for (int i = 0; i < categoriaCount; i++) {
            CategoriaObjetivo categoriaObjetivo = new CategoriaObjetivo();
            String number = String.format("%04d", i);
            categoriaObjetivo.setNome("Categoria " + number);
            categoriaObjetivo.setDescricao("Descrição da Categoria " + number);
            categoriaObjetivo.setIndicadorInternoSistema(SimNaoEnum.Nao);
            categoriaObjetivo.setEscopo(escopos[random.nextInt(escopoCount)]);
            categoriaObjetivos[i] = this.entityManager.merge(categoriaObjetivo);
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
            this.entityManager.merge(objetivo);
        }

        for (int i = 0; i < classificacaoRiscoCount; i++) {
            ClassificacaoRisco classificacaoRisco = new ClassificacaoRisco();
            String number = String.format("%04d", i);
            classificacaoRisco.setNome("Classificacao Risco " + number);
            classificacaoRisco.setDescricao("Descrição da Classificacao Risco " + number);
            classificacaoRisco.setNumeroNivel(i);
            classificacaoRiscos[i] = this.entityManager.merge(classificacaoRisco);
        }

        for (int i = 1; i < categoriaRiscoCount; i++) {
            CategoriaRisco categoriaRisco = new CategoriaRisco();
            String number = String.format("%04d", i);
            categoriaRisco.setNome("Categoria Risco " + number);
            categoriaRisco.setDescricao("Descrição da Categoria Risco " + number);
            categoriaRisco.setIndicadorInternoSistema(SimNaoEnum.Nao);
            categoriaRisco.setEscopo(escopos[random.nextInt(escopoCount)]);

            int j = Math.floorDiv(i-1, 3);

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

            categoriaRiscos[i] = this.entityManager.merge(categoriaRisco);
        }

    }
}

