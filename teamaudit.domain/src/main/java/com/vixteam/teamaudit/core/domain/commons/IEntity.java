package com.vixteam.teamaudit.core.domain.commons;

import java.io.Serializable;

public interface IEntity<ID extends Serializable> extends Serializable {
    void setId(ID id);

    ID getId();
}