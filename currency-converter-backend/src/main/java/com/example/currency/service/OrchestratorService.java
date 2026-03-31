package com.example.currency.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class OrchestratorService {
    private final String API_URL = "http://140.245.21.194/jderest/v3/orchestrator/ORCH_55_CurrencyConvertor";
    private final String USERNAME = "THANDE";
    private final String PASSWORD = "THANDE8";

    public Object convert(String from, String to, String amount) {
        RestTemplate restTemplate = new RestTemplate();
        
        // Basic Auth
        String auth = USERNAME + ":" + PASSWORD;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
        String authHeader = "Basic " + new String(encodedAuth);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", authHeader);

        Map<String, String> body = new HashMap<>();
        body.put("ConvertFrom", from);
        body.put("ConvertTo", to);
        body.put("Amount", amount);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
        
        ResponseEntity<Object> response = restTemplate.postForEntity(API_URL, entity, Object.class);
        return response.getBody();
    }
}
