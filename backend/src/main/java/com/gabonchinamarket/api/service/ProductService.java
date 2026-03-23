package com.gabonchinamarket.api.service;

import com.gabonchinamarket.api.model.Product;
import com.gabonchinamarket.api.model.ProductType;
import com.gabonchinamarket.api.model.TransactionMode;
import com.gabonchinamarket.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProductById(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id : " + id));
    }
    
    public List<Product> getMbShopProducts() {
        return productRepository.findByIsMbShopTrue();
    }
    
    public List<Product> getProductsBySeller(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }
    
    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setTitle(productDetails.getTitle());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        product.setAvailable(productDetails.getQuantity() > 0);
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }
    
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    @Transactional
    public void decrementStock(Long id, int quantity) {
        Product product = getProductById(id);
        if (product.getQuantity() < quantity) {
            throw new RuntimeException("Stock insuffisant pour le produit : " + product.getTitle());
        }
        product.setQuantity(product.getQuantity() - quantity);
        if (product.getQuantity() == 0) {
            product.setAvailable(false);
        }
        productRepository.save(product);
    }
}
