package com.vixteam.teamaudit;

import java.util.Date;
import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vixteam.teamaudit.core.domain.*;
import com.vixteam.teamaudit.core.domain.objetivo.CategoriaObjetivo;
import com.vixteam.teamaudit.core.domain.objetivo.Objetivo;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.vixteam.teamaudit.core.domain.enums.SimNaoEnum;

@Component
public class DatabaseLoader implements ApplicationListener<ContextRefreshedEvent> {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        loadDatabase(this.entityManager);
    }

    public static int floorDiv(int x, int y) {
        int r = x / y;
        // if the signs are different and modulo not zero, round down
        if ((x ^ y) < 0 && (r * y != x)) {
            r--;
        }

        return r;
    }
    
    public void loadDatabase(EntityManager entityManager){
        int unidadeCount = 2;
        int escopoCount = 5;
        int categoriaCount = 15;
        int objetivoCount = 1000;
        int classificacaoRiscoCount = 5;
        int categoriaRiscoCount = 100;
        int entidadeCount = 20;

        UnidadeOrganizacional[] unidades = new UnidadeOrganizacional[unidadeCount];
        Escopo[] escopos = new Escopo[escopoCount];
        CategoriaObjetivo[] categoriaObjetivos = new CategoriaObjetivo[categoriaCount];
        Objetivo[] objetivos = new Objetivo[objetivoCount];
        ClassificacaoRisco[] classificacaoRiscos = new ClassificacaoRisco[classificacaoRiscoCount];
        CategoriaRisco[] categoriaRiscos = new CategoriaRisco[categoriaRiscoCount];
        Entidade[] entidades = new Entidade[entidadeCount];
        Random random = new Random();

        for (int i = 0; i < unidadeCount; i++) {
            UnidadeOrganizacional unidade = new UnidadeOrganizacional();
            String number = String.format("%04d", i);
            unidade.setId(Integer.toString(i));
            unidade.setNome("Unidade " + number);
            unidades[i] = entityManager.merge(unidade);
        }

        for (int i = 0; i < escopoCount; i++) {
            Escopo escopo = new Escopo();
            String number = String.format("%04d", i);
            escopo.setId(Integer.toString(i));
            escopo.setNome("Escopo " + number);
            escopo.setDescricao("Descrição do Escopo " + number);
            escopos[i] = entityManager.merge(escopo);
        }

        for (int i = 0; i < categoriaCount; i++) {
            CategoriaObjetivo categoriaObjetivo = new CategoriaObjetivo();
            String number = String.format("%04d", i);
            categoriaObjetivo.setId(Integer.toString(i));
            categoriaObjetivo.setNome("Categoria " + number);
            categoriaObjetivo.setDescricao("Descrição da Categoria " + number);
            categoriaObjetivo.setIndicadorInternoSistema(false);
            categoriaObjetivo.setEscopo(escopos[random.nextInt(escopoCount)]);
            categoriaObjetivos[i] = entityManager.merge(categoriaObjetivo);
        }

        for (int i = 0; i < objetivoCount; i++) {
            Objetivo objetivo = new Objetivo();
            String number = String.format("%04d", i);
            objetivo.setId(Integer.toString(i));
            objetivo.setNome("Objetivo " + number);
            objetivo.setDescricao("Descrição do Objetivo " + number);
            objetivo.setCategoriaObjetivo(categoriaObjetivos[random.nextInt(categoriaCount)]);
            objetivo.setUnidadeOrganizacional(unidades[random.nextInt(unidadeCount)]);
            objetivo.setValorMeta(2.5 * i);
            objetivo.setPercentualMeta(i / 10.0);
            objetivos[i] = entityManager.merge(objetivo);
        }

        for (int i = 0; i < classificacaoRiscoCount; i++) {
            ClassificacaoRisco classificacaoRisco = new ClassificacaoRisco();
            String number = String.format("%04d", i);
            classificacaoRisco.setId(Integer.toString(i));
            classificacaoRisco.setNome("Classificacao Risco " + number);
            classificacaoRisco.setDescricao("Descrição da Classificacao Risco " + number);
            classificacaoRisco.setNumeroNivel(i);
            classificacaoRiscos[i] = entityManager.merge(classificacaoRisco);
        }

        for (int i = 1; i < categoriaRiscoCount; i++) {
            CategoriaRisco categoriaRisco = new CategoriaRisco();
            String number = String.format("%04d", i);
            categoriaRisco.setId(Integer.toString(i));
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

            categoriaRiscos[i] = entityManager.merge(categoriaRisco);
        }

        //List<CategoriaObjetivo> categoriaObjetivoList =  Arrays.asList(categoriaObjetivos).subList(0, 9);

        for (int i = 0; i < entidadeCount; i++) {
            Entidade entidade = new Entidade();
            String number = String.format("%04d", i);
            entidade.setId(Integer.toString(i));
            entidade.setNome("Entidade " + number);
            entidade.setDescricao("Descrição da Entidade " + number);
            entidade.setDataInicio(new Date());
            entidade.setDataFim(new Date(entidade.getDataInicio().getTime() + 1000 * 60 * 60 * 24 * (i + 1)));
            //entidade.setCategoriasObjetivos(categoriaObjetivoList);
            entidades[i] = entityManager.merge(entidade);
        }
    }
    
}

