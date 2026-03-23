package com.gabonchinamarket.api.service;

import com.gabonchinamarket.api.model.Order;
import com.gabonchinamarket.api.model.OrderStatus;
import com.gabonchinamarket.api.model.Product;
import com.gabonchinamarket.api.model.TransactionMode;
import com.gabonchinamarket.api.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final TrackingService trackingService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Commande non trouvée avec l'id : " + id));
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findByProductSellerId(sellerId);
    }

    @Transactional
    public Order createOrder(Order order) {
        Product product = productService.getProductById(order.getProduct().getId());
        
        // S'assurer que le produit est disponible
        if (!product.getAvailable() || product.getQuantity() < order.getQuantity()) {
            throw new RuntimeException("Le produit est en rupture de stock ou la quantité demandée n'est pas disponible.");
        }
        
        // Décrémenter le stock s'il s'agit d'une vente
        if (product.getMode() == TransactionMode.VENTE) {
            productService.decrementStock(product.getId(), order.getQuantity());
        }

        order.setTotalPrice(product.getPrice() * order.getQuantity());
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        
        Order savedOrder = orderRepository.save(order);
        
        // S'il s'agit d'une commande de Chine, générer un suivi automatiquement
        if (order.getType().name().equals("COMMANDE_CHINE") || product.getIsMbShop()) {
             trackingService.createTrackingForOrder(savedOrder);
        }
        
        return savedOrder;
    }

    @Transactional
    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
