package com.gabonchinamarket.api.repository;

import com.gabonchinamarket.api.model.Product;
import com.gabonchinamarket.api.model.ProductType;
import com.gabonchinamarket.api.model.TransactionMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByType(ProductType type);
    List<Product> findByMode(TransactionMode mode);
    List<Product> findByIsMbShopTrue();
    List<Product> findBySellerId(Long sellerId);
}
