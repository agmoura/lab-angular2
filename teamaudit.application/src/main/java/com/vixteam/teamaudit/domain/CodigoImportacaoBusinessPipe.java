package com.vixteam.teamaudit.domain;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;


@BusinessRule({Entidade.class, Escopo.class})
public class CodigoImportacaoBusinessPipe {

    private static Map<Class<?>, String> siglas = new HashMap<Class<?>, String>() {
        {
            put(Entidade.class, "EA");
            put(Escopo.class, "E");
        }
    };


    //@BusinessPipeMethod(type = BusinessPipeType.BEFORE_INSERT)
    /*public static Boolean bio2(EntityManager em, BusinessPipeObject object) {

        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<?> criteriaQuery = builder.createQuery(object.getEntity().getClass());
        Root root = criteriaQuery.from(object.getEntity().getClass());
        criteriaQuery.select(builder.max(root.<String>get("codigoImportacao")));
        String maxCodigoImportacao = em.createQuery(criteriaQuery).getSingleResult().toString();

        String sigla = siglas.get(object.getEntity().getClass());

        if (maxCodigoImportacao.isEmpty() || maxCodigoImportacao == null) {
            maxCodigoImportacao = sigla + String.format("%07d", 1);
        } else {
            Integer sequencia = Integer.parseInt(maxCodigoImportacao.substring(2)) + 1;
            maxCodigoImportacao = sigla + String.format("%07d", sequencia);
        }

        object.setCurrentPropertyValue("codigoImportacao", maxCodigoImportacao);
        return true;
    }*/

}
