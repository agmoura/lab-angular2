package com.vixteam.teamaudit.resources;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
//import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.repositories.QueryObject;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.repositories.EntityRepository;
import com.vixteam.teamaudit.services.IEntityService;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class EntityController {

    @Inject
    private Validator validator;

    @Inject
    private IEntityService service;

    //TODO: QueryParam do tipo array não funciona no Jersey. No Resteasy isso funciona.
    @GET
    @Path("/{entityPath}")
    public Response getEntityList(@PathParam("entityPath") String entityPath,
                                   @QueryParam("page.number") Integer pageNumber,
                                   @QueryParam("page.size") Integer pageSize,
                                   @QueryParam("projections") List<String> projections,
                                   @QueryParam("predicates") List<String> predicates,
                                   @QueryParam("sorts") List<String> sorts) {

        PagedList pagedList = service.find(entityPath, new QueryObject(pageNumber, pageSize, projections, predicates, sorts));
        return  Response.status(Response.Status.OK).entity(pagedList).build();
    }

    /*@GET
    @Path("{entityPath}/schema")
    public Object getEntitySchema(@PathParam("entityPath") String entityPath) throws ClassNotFoundException {

        Metamodel metamodel = entityManager.getMetamodel();
        EntityType<?> entityType = metamodel.entity(Class.forName(EntityRepository.getEntityName(entityPath)));

        for (Attribute<?, ?> attribute : entityType.getAttributes()) {
                String name = attribute.getName();
                String javaName = attribute.getJavaMember().getName();
                //String getter = "get" + javaName.substring(0, 1).toUpperCase() + javaName.substring(1);
        }

        return null;
    }*/

    @GET
    @Path("{entityPath}/{id}")
    public Object getEntity(@PathParam("entityPath") String entityPath, @PathParam("id") String id) throws ClassNotFoundException {
        Object entity = service.get(entityPath, id);
        return entity;
    }

    @POST
    @Path("{entityPath}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEntity(@PathParam("entityPath") String entityPath, String entityData) throws ClassNotFoundException {
        return saveEntity(EntityRepository.getEntityName(entityPath), null, entityData);
    }

    @PUT
    @Path("{entityPath}/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateEntity(@PathParam("entityPath") String entityPath, @PathParam("id") String id, String entityData) throws ClassNotFoundException {
        return saveEntity(EntityRepository.getEntityName(entityPath), id, entityData);
    }

    private Response saveEntity(String entityName, String entityId, String entityData) throws ClassNotFoundException {
        // Build Object Entity from JSON Date
        IEntity entity = (IEntity) new Gson().fromJson(entityData, Class.forName(entityName));

        // Validate Entity
        Set<ConstraintViolation<IEntity>> violations = validator.validate(entity);
        if (!violations.isEmpty()) {
            /*JAVA8
            List<ErrorItem> errors = violations.stream()
                .map(v -> new ErrorItem(v.getPropertyPath().toString(), v.getMessage()))
                .collect(Collectors.toList());*/

            final List<ErrorItem> errors = new ArrayList<ErrorItem>();
            for (ConstraintViolation<IEntity> violation: violations ) {
                errors.add(new ErrorItem(violation.getPropertyPath().toString(), violation.getMessage()));
            }

            return Response.status(Response.Status.PRECONDITION_FAILED)
                .entity(new HashMap<String, List<ErrorItem>>() {{ put("errors", errors); }})
                .build();
        }

        // Add or Update Entity
        entity = service.save(entity);
        return Response.status(Response.Status.OK).entity(entity).build();
    }

    @DELETE
    @Path("{entityPath}/{id}")
    public void deleteEntity(@PathParam("entityPath") String entityPath, @PathParam("id") String id) throws ClassNotFoundException {
        service.delete(entityPath, id);
    }
}