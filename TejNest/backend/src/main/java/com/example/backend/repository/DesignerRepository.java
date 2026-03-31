package com.example.backend.repository;

import com.example.backend.entity.Designer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DesignerRepository extends JpaRepository<Designer, Long> {
    List<Designer> findByStyleIgnoreCase(String style);
    List<Designer> findByHourlyRateLessThanEqual(Double rate);
}
