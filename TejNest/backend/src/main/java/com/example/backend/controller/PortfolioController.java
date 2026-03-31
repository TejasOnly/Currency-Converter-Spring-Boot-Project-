package com.example.backend.controller;

import com.example.backend.dto.PortfolioDTO;
import com.example.backend.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "*") // Update this for production
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/designer/{designerId}")
    public ResponseEntity<List<PortfolioDTO>> getPortfoliosByDesignerId(@PathVariable Long designerId) {
        return ResponseEntity.ok(portfolioService.getPortfoliosByDesignerId(designerId));
    }

    @PostMapping
    public ResponseEntity<PortfolioDTO> createPortfolio(@RequestBody PortfolioDTO portfolioDTO) {
        return ResponseEntity.ok(portfolioService.createPortfolio(portfolioDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return ResponseEntity.noContent().build();
    }
}
