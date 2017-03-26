package com.vixteam.teamaudit.provider;

import com.vixteam.teamaudit.DatabaseLoader;
import com.vixteam.teamaudit.core.domain.CategoriaObjetivo;
import com.vixteam.teamaudit.core.domain.Entidade;
import com.vixteam.teamaudit.core.domain.Escopo;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
//@DataJpaTest
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class RepositoryTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Before
    public void setup(){
        DatabaseLoader databaseLoader = new DatabaseLoader();
        databaseLoader.loadDatabase(entityManager);
        //entityManager.flush();
    }

    public <TEntity> List<TEntity> findAll(Class<TEntity> entityClass) {
        String queryBase = "from " + entityClass.getName();
        TypedQuery<TEntity> query = entityManager.createQuery(queryBase, entityClass);
        return query.getResultList();
    }

    @Transactional
    @Test
    public void testSaveManyToMany() throws ClassNotFoundException {

        Escopo escopo = (Escopo) findAll(Escopo.class).get(0);
        /*Escopo escopo = new Escopo();
        escopo.setId("0");*/

        escopo.setDescricao("Descrição Alterada");

        //CategoriaObjetivo categoriaObjetivo = (CategoriaObjetivo) findAll("categoriaObjetivo").get(13);
        CategoriaObjetivo categoriaObjetivo = new CategoriaObjetivo();
        categoriaObjetivo.setNome("Categoria A");
        categoriaObjetivo.setDescricao("Descrição A");
        categoriaObjetivo.setIndicadorInternoSistema(false);
        categoriaObjetivo.setEscopo(escopo);

        //int count = categoriaObjetivo.getEntidades().size();

        List<Entidade> entidades = findAll(Entidade.class);

        categoriaObjetivo.setEntidades(entidades.subList(0, 2));

        /*categoriaObjetivo.setEntidades(entidades.stream().limit(3)
                .map(item -> new Entidade(item.getId()))
                .collect(Collectors.toList()));*/

        //categoriaObjetivo.setEntidades(Arrays.asList(new Entidade("0"), new Entidade("1"), new Entidade("2")));

        categoriaObjetivo.setNome("Teste");

        entityManager.persist(categoriaObjetivo);
        //categoriaObjetivo = save(categoriaObjetivo);

        //CategoriaObjetivo categoriaObjetivo2 = (CategoriaObjetivo) entityRepository.get("categoriaObjetivo", categoriaObjetivo.getId());

        List categorias = findAll(CategoriaObjetivo.class);

    }


}
