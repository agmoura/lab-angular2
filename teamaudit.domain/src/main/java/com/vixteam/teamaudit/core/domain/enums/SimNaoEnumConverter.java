package com.vixteam.teamaudit.core.domain.enums;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class SimNaoEnumConverter implements AttributeConverter<SimNaoEnum, String> {

    @Override
    public String convertToDatabaseColumn(SimNaoEnum attribute) {
        return attribute == null ? null : attribute.getId();
    }

    @Override
    public SimNaoEnum convertToEntityAttribute(String data) {
        if (data == null) return null;

        switch (data.charAt(0)) {
            case 'N': return SimNaoEnum.Nao;
            case 'S': return SimNaoEnum.Sim;
            default: return  null;
        }
    }
}