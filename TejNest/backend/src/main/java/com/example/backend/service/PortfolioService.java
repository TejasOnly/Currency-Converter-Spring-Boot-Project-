package com.example.backend.service;

import com.example.backend.dto.PortfolioDTO;
import com.example.backend.entity.Portfolio;
import com.example.backend.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private com.example.backend.repository.DesignerRepository designerRepository;

    public List<PortfolioDTO> getPortfoliosByDesignerId(Long designerId) {
        return portfolioRepository.findByDesignerId(designerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PortfolioDTO createPortfolio(PortfolioDTO portfolioDTO) {
        com.example.backend.entity.Designer designer = designerRepository.findById(portfolioDTO.getDesignerId())
                .orElseThrow(() -> new RuntimeException("Designer not found"));

        Portfolio portfolio = new Portfolio();
        portfolio.setTitle(portfolioDTO.getTitle());
        portfolio.setDescription(portfolioDTO.getDescription());
        portfolio.setImageUrl(portfolioDTO.getImageUrl());
        portfolio.setDesigner(designer);

        Portfolio savedPortfolio = portfolioRepository.save(portfolio);
        return convertToDTO(savedPortfolio);
    }

    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }

    private PortfolioDTO convertToDTO(Portfolio portfolio) {
        PortfolioDTO dto = new PortfolioDTO();
        dto.setId(portfolio.getId());
        dto.setTitle(portfolio.getTitle());
        dto.setDescription(portfolio.getDescription());
        dto.setImageUrl(portfolio.getImageUrl());
        dto.setDesignerId(portfolio.getDesigner().getId());
        return dto;
    }
}
