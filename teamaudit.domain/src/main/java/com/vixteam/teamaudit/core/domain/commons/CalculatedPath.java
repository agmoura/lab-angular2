package com.vixteam.teamaudit.core.domain.commons;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface CalculatedPath {
	CalculatedPathType type() default CalculatedPathType.CONCAT;
	String[] value() default {};
	String concatString() default "";
}
