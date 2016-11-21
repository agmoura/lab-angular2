package com.vixteam.teamaudit.core.domain.commons;

public interface Repositories {

    <TEntity> Repository<TEntity> get(Class<TEntity> type);

}
