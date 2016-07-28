package com.vixteam.framework.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
public abstract class BaseEntity implements IEntity<String> {

    @Id
    //@GeneratedValue
    //@GeneratedValue(generator = "uuid-string")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    protected String id;

    @Override
    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return this.id;
    }
}