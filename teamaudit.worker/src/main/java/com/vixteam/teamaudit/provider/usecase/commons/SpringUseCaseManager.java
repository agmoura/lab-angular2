package com.vixteam.teamaudit.provider.usecase.commons;


import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseManager;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.stereotype.Component;

/**
 * UseCaseManager baseado no spring que considera que todos os use cases serao necessariamente
 * prototypes.
 */
@Component
public class SpringUseCaseManager implements UseCaseManager, BeanFactoryAware {

    private AutowireCapableBeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = (AutowireCapableBeanFactory) beanFactory;
    }

    @Override
    public void prepare(UseCase usecase) {
        beanFactory.autowireBean(usecase);
    }

    @Override
    public void destroy(UseCase usecase) {
        //sem aplicacao
    }

}
