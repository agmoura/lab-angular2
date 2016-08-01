package com.vixteam.framework.common.support;

public class ErrorItem {

    private String defaultMessage;
    private String field;

    public ErrorItem(String field, String message){
        this.field = field;
        this.defaultMessage = message;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }

    public void setDefaultMessage(String defaultMessage) {
        this.defaultMessage = defaultMessage;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
