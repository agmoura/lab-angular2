package com.vixteam.teamaudit.setup;

import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.vixteam.teamaudit.domain.CategoriaObjetivo;
import com.vixteam.teamaudit.domain.Escopo;
import com.vixteam.teamaudit.domain.Objetivo;
import com.vixteam.teamaudit.domain.UnidadeOrganizacional;
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

        UnidadeOrganizacional[] unidades = new UnidadeOrganizacional[unidadeCount];
        Escopo[] escopos = new Escopo[escopoCount];
        CategoriaObjetivo[] categoriaObjetivos = new CategoriaObjetivo[categoriaCount];
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
    }
}

