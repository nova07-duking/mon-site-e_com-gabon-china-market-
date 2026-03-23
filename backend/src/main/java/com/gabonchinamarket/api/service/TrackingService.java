package com.gabonchinamarket.api.service;

import com.gabonchinamarket.api.model.Order;
import com.gabonchinamarket.api.model.Tracking;
import com.gabonchinamarket.api.model.TrackingStatus;
import com.gabonchinamarket.api.repository.TrackingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrackingService {

    private final TrackingRepository trackingRepository;

    public Optional<Tracking> getTrackingById(String trackingId) {
        return trackingRepository.findById(trackingId);
    }

    public Tracking getTrackingByOrderId(Long orderId) {
        return trackingRepository.findByOrderId(orderId)
            .orElseThrow(() -> new RuntimeException("Suivi non trouvé pour l'id de commande : " + orderId));
    }

    @Transactional
    public Tracking createTrackingForOrder(Order order) {
        Tracking tracking = new Tracking();
        // Générer un numéro de suivi aléatoire, ex: CN-2026-XXXX
        String uniqueSuffix = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
        tracking.setId("CN-2026-" + uniqueSuffix); 
        tracking.setOrder(order);
        tracking.setStatus(TrackingStatus.PENDING);
        tracking.setCurrentStep(0);
        tracking.setUpdatedAt(LocalDateTime.now());
        
        return trackingRepository.save(tracking);
    }

    @Transactional
    public Tracking updateTrackingStep(String trackingId, Integer nextStep) {
        Tracking tracking = trackingRepository.findById(trackingId)
            .orElseThrow(() -> new RuntimeException("Suivi non trouvé id : " + trackingId));
            
        tracking.setCurrentStep(nextStep);
        tracking.setUpdatedAt(LocalDateTime.now());
        
        if (nextStep == 1) tracking.setStatus(TrackingStatus.IN_TRANSIT);
        if (nextStep >= 4) tracking.setStatus(TrackingStatus.DELIVERED);
        
        return trackingRepository.save(tracking);
    }
}
