package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;

public class DeleteBaseEntityCommand extends UseCase<Void> {
    private String entityPath;
    private Serializable id;

    @Autowired
    private IEntityRepository repository;

    public DeleteBaseEntityCommand() { }

    public DeleteBaseEntityCommand(String entityPath, Serializable id) {
        setEntityPath(entityPath);
        setId(id);
    }

    public String getEntityPath() {
        return entityPath;
    }

    public void setEntityPath(String entityPath) {
        this.entityPath = entityPath;
    }

    public Serializable getId() {
        return id;
    }

    public void setId(Serializable id) {
        this.id = id;
    }

    @Override
    protected Void execute() throws Exception {
        repository.delete(getEntityPath(), getId());
        return null;
    }
}
