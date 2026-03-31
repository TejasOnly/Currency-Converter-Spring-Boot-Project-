package com.example.currency.model;

public class ConversionRequest {
    private String convertFrom;
    private String convertTo;
    private String amount;

    // Getters and Setters
    public String getConvertFrom() { return convertFrom; }
    public void setConvertFrom(String convertFrom) { this.convertFrom = convertFrom; }
    public String getConvertTo() { return convertTo; }
    public void setConvertTo(String convertTo) { this.convertTo = convertTo; }
    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }
}
