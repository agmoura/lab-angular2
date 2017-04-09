package com.vixteam.teamaudit.provider.domain.baseentity;

import com.vixteam.teamaudit.consumer.commons.ApplicationException;
import com.vixteam.teamaudit.core.domain.commons.CalculatedPath;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.baseentity.EntityQuery;
import org.hibernate.jpa.criteria.path.PluralAttributePath;
import org.hibernate.jpa.internal.metamodel.SingularAttributeImpl;

import javax.persistence.Transient;
import javax.persistence.criteria.*;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;
import java.util.regex.Pattern;

class EntityQueryProcessor<TSource, TTarget> {

    public static final String ROOT_ALIAS = "root";
    private EntityQuery entityQuery;
    private Class<TSource> sourceClass;
    private CriteriaBuilder builder;
    private CriteriaQuery<TTarget> query;
    private Root<TSource> root;
    private HashMap<String, Join<?, ?>> joins = new HashMap<>();

    EntityQueryProcessor(EntityQuery entityQuery, Class<TSource> sourceClass, CriteriaBuilder builder) {
        this.entityQuery = entityQuery;
        this.sourceClass = sourceClass;
        this.builder = builder;
    }

    public CriteriaQuery<TTarget> buildCriteriaQuery() {

        // Process Select Clause
        List<String> projections = entityQuery.getProjections();
        Class<TTarget> targetClass = projections == null ? (Class<TTarget>) sourceClass : (Class<TTarget>) Object[].class;
        CriteriaQuery<TTarget> query = builder.createQuery(targetClass);
        root = query.from(sourceClass);
        root.alias(ROOT_ALIAS);

        if (projections != null && !projections.isEmpty())
            ((CriteriaQuery<Object[]>) query).select(builder.array(getPaths(projections, true)));
        else
            query.select((Root<TTarget>) root);

        // Process OrderBy Clause
        List<String> sorts = entityQuery.getSorts();
        if (sorts != null && !sorts.isEmpty()) {
            query.orderBy(getOrders(sorts));
        }

        // Process Where Clause
        HashMap<String, Object> predicates = entityQuery.getPredicates();
        if (predicates != null && !predicates.isEmpty()) {
            query.where(getPredicate(predicates, true));
        }

        return query;
    }

    private Expression<?> getPath(String textPath, boolean createJoin) {
        String[] names = textPath.split(Pattern.quote("."));
        Expression<?> path = root;
        Join<?, ?> join = null;
        textPath = "";

        for (String name : names) {

            boolean complexExpression = false;
            path = fieldNameToExpression(path, name);
            complexExpression = (path instanceof Expression<?>);

            if (!complexExpression && createJoin && ((Path<?>) path).getModel() instanceof SingularAttributeImpl) {
                SingularAttributeImpl model = (SingularAttributeImpl) ((Path<?>) path).getModel();
                if (model.isAssociation() && model.isOptional()) {
                    join = getUniqueJoins(name, join);
                }
            }
        }

        return path;
    }

    private Join<?, ?> getUniqueJoins(String name, Join<?, ?> join) {
        if (joins.containsKey(name))
            return joins.get(name);

        join = join == null ? root.join(name, JoinType.LEFT) : join.join(name, JoinType.LEFT);
        joins.put(name, join);
        return join;
    }


    private Expression<?>[] getPaths(List<String> projections, boolean createJoin) {
        Expression<?>[] paths = new Expression<?>[projections.size()];
        int index = 0;

        for (String projection : projections) {
            paths[index++] = getPath(projection, createJoin);
        }

        return paths;
    }

    private List<Order> getOrders(List<String> sorts) {
        List<Order> orders = new ArrayList<>();

        for (String sort : sorts) {

            String[] tokens = sort.split(Pattern.quote(" "));
            boolean isDescending = tokens.length > 1 && tokens[1].equalsIgnoreCase("desc");
            String[] names = tokens[0].split(Pattern.quote("."));

            Expression<?> path = root;
            for (String name : names) {
                path = fieldNameToExpression(path, name);
            }
            orders.add(isDescending ? builder.desc(path) : builder.asc(path));
        }

        return orders;
    }

    private Predicate getPredicate(HashMap<String, Object> predicatesMap, boolean isConjunction) {
        Predicate predicate = null;

        for (Map.Entry<String, Object> entry : predicatesMap.entrySet()) {
            String key = entry.getKey();
            Predicate referencePredicate;

            if (key.equals("and"))
                referencePredicate = getPredicate((HashMap<String, Object>) entry.getValue(), true);
            else if (key.equals("or"))
                referencePredicate = getPredicate((HashMap<String, Object>) entry.getValue(), false);
            else
                referencePredicate = getPredicate(entry);

            if (predicate == null)
                predicate = referencePredicate;
            else if (isConjunction)
                predicate = builder.and(predicate, referencePredicate);
            else
                predicate = builder.or(predicate, referencePredicate);
        }

        return predicate;
    }

    private Predicate getPredicate(Map.Entry<String, Object> entry) {
        Predicate predicate = null;
        Expression path = getPath(entry.getKey(), false);
        Map.Entry<String, Object> operator = ((HashMap<String, Object>) entry.getValue()).entrySet().iterator().next();
        Object value = operator.getValue();

        switch (operator.getKey()) {
            case "like":  predicate = path != null ? builder.like(path.as(String.class), "%" + value + "%") : predicate; break;
            case "eq": predicate = value == null ? builder.isNull(path) : builder.equal(path, value); break;
            case "ne": predicate = value == null ? builder.isNotNull(path) : builder.notEqual(path, value); break;
            case "contains":  predicate = isMember(path, entry, operator); break;
            default: throw new UnsupportedOperationException();
        }

        return predicate;
    }

    private Predicate isMember(Expression path, Map.Entry<String, Object> entry, Map.Entry<String, Object> operator) {

        try {
            Class<IEntity<Serializable>> targetClass = ((PluralAttributePath) path).getPersister().getElementType().getReturnedClass();

            Expression<Collection<Object>> expression = root.get(entry.getKey());

            IEntity<Serializable> targetEntity = targetClass.newInstance();

            targetEntity.setId((Serializable) operator.getValue());

            return builder.isMember(targetEntity, expression);

        } catch (InstantiationException | IllegalAccessException e) {
            throw new ApplicationException("Falha ao executar operador 'contains' no campo " + path, e);
        }
    }

    //< 'and' | 'or' >: [ < array of predicates > ]
    //< propertyPath >: { < operator > : < value > }
    //< propertyPath >: { < 'any' | 'all' > : < predicate on the nested type > }


    /*Operator	Aliases	Description
    gt	’>’	        Greater than specified value
    ge	’>=’	        Greater than or equal to specified value
    lt	’<’	        Less than specified value
    le	’<=’	        Less than or equal to specified value
    eq	’==’	        Equal to specified value
    ne	’!=’        	Not equal to specified value
    startsWith	 	String starts with specified string
    endsWith	 	String ends with specified string
    like    	 	String contains specified string
    in	 	        is equal to one of the values in the specified list
    any	some	    the result of applying the specified predicate is true for at least one of the entities resulting from the left hand property expression.
    all	every	    the result of applying the specified predicate is true for all of the entities resulting from the left hand property expression.*/

    private Expression<?> fieldNameToExpression(Expression<?> path, String name) {
        Field f = null;
        try {
            if (!name.equals("id"))
                f = path.getJavaType().getDeclaredField(name);
        } catch (Exception e) {

        }
        if (f != null && f.isAnnotationPresent(Transient.class) && f.isAnnotationPresent(CalculatedPath.class)) {
            CalculatedPath calculatedPathAnnotation = (CalculatedPath) f.getAnnotation(CalculatedPath.class);
            List<Expression<?>> calculatedPaths = new ArrayList<Expression<?>>();
            for (String newPath : calculatedPathAnnotation.value()) {
                calculatedPaths.add((Expression<?>) getPath(newPath, true));
            }
            switch (calculatedPathAnnotation.type()) {
                case CONCAT:
                    path = concat(calculatedPathAnnotation.concatString(), calculatedPaths);
                    break;
                case SUM:
                    path = sum(calculatedPaths);
                    break;
                case PROD:
                    path = prod(calculatedPaths);
                    break;
            }

        } else {
            path = ((Path<?>) path).get(name);
        }
        return path;
    }

    private Expression<String> concat(String delimiter, List<Expression<?>> calculatedPaths) {
        Expression<String> result = null;
        for (int i = 0; i < calculatedPaths.size(); i++) {
            final boolean first = i == 0, last = i == (calculatedPaths.size() - 1);
            final Expression<String> expression = (Expression<String>) calculatedPaths.get(i);
            if (first && last) {
                result = expression;
            } else if (first) {
                result = builder.concat(expression, delimiter);
            } else {
                result = builder.concat(result, expression);
                if (!last) {
                    result = builder.concat(result, delimiter);
                }
            }
        }
        return result;
    }

    private Expression<Number> sum(List<Expression<?>> calculatedPaths) {
        Expression<Number> result = null;
        for (int i = 0; i < calculatedPaths.size(); i++) {
            final boolean first = i == 0, last = i == (calculatedPaths.size() - 1);
            final Expression<Number> expression = (Expression<Number>) calculatedPaths.get(i);
            if (first && last) {
                result = expression;
            } else if (first) {
                result = builder.sum(expression, result);
            } else {
                result = builder.sum(result, expression);
            }
        }
        return result;
    }

    private Expression<Number> prod(List<Expression<?>> calculatedPaths) {
        Expression<Number> result = null;
        for (int i = 0; i < calculatedPaths.size(); i++) {
            final boolean first = i == 0, last = i == (calculatedPaths.size() - 1);
            final Expression<Number> expression = (Expression<Number>) calculatedPaths.get(i);
            if (first && last) {
                result = expression;
            } else if (first) {
                result = builder.prod(expression, result);
            } else {
                result = builder.prod(result, expression);
            }
        }
        return result;
    }

    private Expression<?> literal(String expression) {
        return builder.literal(expression);
    }


}