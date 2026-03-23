package com.gabonchinamarket.api.controller;

import com.gabonchinamarket.api.model.Order;
import com.gabonchinamarket.api.model.OrderStatus;
import com.gabonchinamarket.api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<Order>> getOrdersByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(orderService.getOrdersByBuyer(buyerId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Order>> getOrdersBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(orderService.getOrdersBySeller(sellerId));
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // Sera protégé par Spring Security (uniquement ACHETEUR)
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatusRequest request) {
        // Protégé par le rôle Admin/Vendeur
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request.getStatus()));
    }
    
    // Classe DTO pour le statut de commande
    static class OrderStatusRequest {
        private OrderStatus status;
        public OrderStatus getStatus() { return status; }
        public void setStatus(OrderStatus status) { this.status = status; }
    }
}
