package com.vixteam.teamaudit.core.domain.enums;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanConverter implements AttributeConverter<Boolean, String> {

    @Override
    public String convertToDatabaseColumn(Boolean attribute) {
        if(attribute == null) return null;
        return attribute ? "S" : "N";
    }

    @Override
    public Boolean convertToEntityAttribute(String data) {
        if (data == null) return null;
        return data.charAt(0) == 'S';
    }
}