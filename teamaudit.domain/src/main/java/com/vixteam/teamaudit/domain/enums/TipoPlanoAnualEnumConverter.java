package com.vixteam.teamaudit.domain.enums;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by rodrigo.pimenta on 02/06/2016.
 */
@Converter
public class TipoPlanoAnualEnumConverter implements AttributeConverter<TipoPlanoAnualEnum, String> {

    private final static Map<String, TipoPlanoAnualEnum> valuesMap = new HashMap<>();

    static {
        for (TipoPlanoAnualEnum value : TipoPlanoAnualEnum.values())
            valuesMap.put(value.getId(), value);
    }

    @Override
    public String convertToDatabaseColumn(TipoPlanoAnualEnum attribute) {
        return attribute == null ? null : attribute.getId();
    }

    @Override
    public TipoPlanoAnualEnum convertToEntityAttribute(String data) {
        return data == null ? null : valuesMap.get(data);
    }
}
