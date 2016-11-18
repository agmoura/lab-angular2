package com.vixteam.framework.core.domain.commons;

public interface Repositories {

    <TEntity> Repository<TEntity> get(Class<TEntity> type);

}
