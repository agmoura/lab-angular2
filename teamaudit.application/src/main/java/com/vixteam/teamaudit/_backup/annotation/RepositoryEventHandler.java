package com.vixteam.teamaudit._backup.annotation;

import java.lang.annotation.*;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface RepositoryEventHandler {

	/**
     * The list of {@link org.springframework.context.ApplicationEvent} classes this event handler cares about.
	 *
	 * @deprecated the type the handler is interested in is determined by the type of the first parameter of a handler
	 *             method.
	 */
	@Deprecated
	Class<?>[] value() default {};
}