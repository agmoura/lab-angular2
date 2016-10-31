package com.vixteam.teamaudit.domain.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Denotes a component that should handle the {@literal beforeSave} event.
 *
 * @author Jon Brisbin
 * @author Oliver Gierke
 */
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface HandleBeforeSave {

    /**
     * The domain type which you want to listen for events for.
     *
     * @deprecated the domain type of interest is derived from the type of the first parameter of the annotated handler
     *             method.
     * @return
     */
    @Deprecated
    Class<?>[] value() default {};
}
