package com.gabonchinamarket.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductType type; // Type de produit (VEHICULE, MAISON, DIVERS)
    
    private String category; // e.g. SUV, Appartement, Electronique
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionMode mode; // Mode de transaction (VENTE, LOCATION)
    
    @Column(nullable = false)
    private Double price;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    
    private Boolean available = true;
    
    private Integer quantity = 1;
    
    private Boolean isMbShop = false;
    
    private Double promotionPrice; // Prix après promotion si applicable
    
    private String size; // e.g. M, L, XL ou 100m²
    
    private String currency = "FCFA"; // Devise (défaut: FCFA)
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}
