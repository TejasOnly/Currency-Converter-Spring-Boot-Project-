package com.example.currency.controller;

import com.example.currency.model.ConversionRequest;
import com.example.currency.service.OrchestratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CurrencyController {

    @Autowired
    private OrchestratorService orchestratorService;

    @PostMapping("/convert")
    public Object convert(@RequestBody ConversionRequest request) {
        return orchestratorService.convert(
            request.getConvertFrom(),
            request.getConvertTo(),
            request.getAmount()
        );
    }
}
