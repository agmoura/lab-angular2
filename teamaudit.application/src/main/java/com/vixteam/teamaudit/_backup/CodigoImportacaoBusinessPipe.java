package com.vixteam.teamaudit._backup;

import com.vixteam.teamaudit.core.domain.Entidade;
import com.vixteam.teamaudit.core.domain.Escopo;

import java.util.HashMap;
import java.util.Map;


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
