package com.gabonchinamarket.api.repository;

import com.gabonchinamarket.api.model.Order;
import com.gabonchinamarket.api.model.OrderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyerId(Long buyerId);
    List<Order> findByProductId(Long productId);
    List<Order> findByType(OrderType type);
    List<Order> findByProductSellerId(Long sellerId);
    java.util.Optional<Order> findByQrCodeToken(String qrCodeToken);
}
