package com.gabonchinamarket.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tracking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tracking {
    
    @Id
    @Column(length = 50)
    private String id; // Ex: CN-2026-88431
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrackingStatus status = TrackingStatus.PENDING;
    
    @Column(nullable = false)
    private Integer currentStep = 0; // 0 = Entrepôt, 1 = Expédition, etc.
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", unique = true)
    private Order order;
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}
