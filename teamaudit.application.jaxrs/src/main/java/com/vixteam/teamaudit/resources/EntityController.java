package com.vixteam.teamaudit.resources;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.teamaudit.repositories.EntityRepository;
import com.vixteam.teamaudit.services.EntityService;
import com.vixteam.teamaudit.services.IEntityService;

@Path("/")
@Produces("application/json")
public class EntityController {

    //@Inject
    //Validator validator;

    @Inject
    private IEntityService service;

   /* public EntityController() {
        if (service == null) service = new EntityService();
    }*/

    @GET
    @Path("/{entityPath}")
    public PagedList getEntityList(@PathParam("entityPath") String entityPath,
                                   @QueryParam("page.number") Integer pageNumber,
                                   @QueryParam("page.size") Integer pageSize,
                                   @QueryParam("projections") String[] projections,
                                   @QueryParam("predicates") String[] predicates,
                                   @QueryParam("sorts") String[] sorts) {
        return service.find(entityPath, new QueryObject(pageNumber, pageSize, projections, predicates, sorts));
    }

    @GET
    @Path("{entityPath}/{id}")
    public Object getEntity(@PathParam("entityPath") String entityPath, @PathParam("id") String id) throws ClassNotFoundException {
        return service.get(entityPath, id);
    }

    @POST
    @Path("{entityPath}")
    @Consumes("application/json")
    public Object addEntity(@PathParam("entityPath") String entityPath, String entityData, HttpServletResponse response) throws ClassNotFoundException, IOException {
        return saveEntity(EntityRepository.getEntityName(entityPath), null, entityData, response);
    }

    @PUT
    @Path("{entityPath}/{id}")
    @Consumes("application/json")
    public Object updateEntity(@PathParam("entityPath") String entityPath, @PathParam("id") String id, String entityData, HttpServletResponse response) throws ClassNotFoundException, IOException {
        return saveEntity(EntityRepository.getEntityName(entityPath), id, entityData, response);
    }

    private Object saveEntity(String entityName, String entityId, String entityData, HttpServletResponse response) throws ClassNotFoundException, IOException {
        // Build Object Entity from JSON Data
        Object entity = new ObjectMapper().readValue(entityData, Class.forName(entityName));

        // Validate Entity
        /*MapBindingResult errors = new MapBindingResult(new HashMap<String, String>(), entityName);
        validator.validate(entity, errors);
        if(errors.hasErrors()) {
            response.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
            return new Errors(errors);
        }*/

        return service.save(entityId, entity);
    }

    @DELETE
    @Path("{entityPath}/{id}")
    public void deleteEntity(@PathParam("entityPath") String entityPath, @PathParam("id") String id) throws ClassNotFoundException {
        service.delete(entityPath, id);
    }
}
