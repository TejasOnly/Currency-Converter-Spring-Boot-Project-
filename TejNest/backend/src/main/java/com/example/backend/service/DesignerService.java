package com.example.backend.service;

import com.example.backend.dto.DesignerDTO;
import com.example.backend.entity.Designer;
import com.example.backend.repository.DesignerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DesignerService {

    @Autowired
    private DesignerRepository designerRepository;

    public List<DesignerDTO> getAllDesigners() {
        return designerRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public DesignerDTO getDesignerById(Long id) {
        Designer designer = designerRepository.findById(id).orElseThrow(() -> new RuntimeException("Designer not found"));
        return convertToDTO(designer);
    }

    private DesignerDTO convertToDTO(Designer designer) {
        DesignerDTO dto = new DesignerDTO();
        dto.setId(designer.getId());
        dto.setStyle(designer.getStyle());
        dto.setHourlyRate(designer.getHourlyRate());
        dto.setBio(designer.getBio());
        dto.setUsername(designer.getUser().getUsername());
        dto.setEmail(designer.getUser().getEmail());
        return dto;
    }
}
