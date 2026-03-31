package com.example.backend.controller;

import com.example.backend.dto.DesignerDTO;
import com.example.backend.service.DesignerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designers")
@CrossOrigin(origins = "*") // Update this for production
public class DesignerController {

    @Autowired
    private DesignerService designerService;

    @GetMapping
    public ResponseEntity<List<DesignerDTO>> getAllDesigners() {
        return ResponseEntity.ok(designerService.getAllDesigners());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesignerDTO> getDesignerById(@PathVariable Long id) {
        return ResponseEntity.ok(designerService.getDesignerById(id));
    }
}
