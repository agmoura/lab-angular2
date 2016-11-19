package com.vixteam.framework.core.domain.commons;

import java.io.Serializable;

public interface IEntity<ID extends Serializable> extends Serializable {
    void setId(ID id);

    ID getId();
}