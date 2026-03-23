package com.gabonchinamarket.api.repository;

import com.gabonchinamarket.api.model.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, String> {
    Optional<Tracking> findByOrderId(Long orderId);
}
