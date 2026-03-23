package com.gabonchinamarket.api.controller;

import com.gabonchinamarket.api.model.Tracking;
import com.gabonchinamarket.api.service.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final TrackingService trackingService;

    @GetMapping("/{trackingId}")
    public ResponseEntity<?> getTracking(@PathVariable String trackingId) {
        return trackingService.getTrackingById(trackingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{trackingId}/step")
    public ResponseEntity<?> updateTrackingStep(@PathVariable String trackingId, @RequestBody StepRequest request) {
        // Administrateur uniquement
        try {
            return ResponseEntity.ok(trackingService.updateTrackingStep(trackingId, request.getStep()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // Classe DTO pour l'étape du suivi
    static class StepRequest {
        private Integer step;
        public Integer getStep() { return step; }
        public void setStep(Integer step) { this.step = step; }
    }
}
