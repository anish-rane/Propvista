package com.cdac.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.entity.InterestedTenant;
import com.cdac.entity.Property;
import com.cdac.repository.InterestedTenantRepository;
import com.cdac.service.PropertyService;

@RestController
@RequestMapping("/agents")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {

    @Autowired
    private InterestedTenantRepository interestedTenantRepository;

    @Autowired
    private PropertyService propertyService;

    @GetMapping("/interested-tenants")
    public ResponseEntity<?> getInterestedTenants() {
        return ResponseEntity.ok(interestedTenantRepository.findAll());
    }

    @PostMapping("/interested-tenants")
    public ResponseEntity<?> addInterestedTenant(@RequestBody InterestedTenant tenantData) {
        try {
            InterestedTenant saved = interestedTenantRepository.save(tenantData);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error saving interested tenant: " + e.getMessage());
        }
    }

    @PostMapping("/interested-tenants/{tenantId}/accept")
    public ResponseEntity<?> acceptTenant(
            @PathVariable Long tenantId,
            @RequestBody Map<String, Long> payload
    ) {
        Long propertyId = payload.get("propertyId");
        Optional<InterestedTenant> optTenant = interestedTenantRepository.findById(tenantId);
        if (optTenant.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        InterestedTenant tenant = optTenant.get();
        tenant.setStatus("accepted");
        interestedTenantRepository.save(tenant);

        // update property status to Sold
        Property property = propertyService.getPropertyById(propertyId);
        if (property != null) {
            property.setPropertyStatus("Sold");
            propertyService.saveProperty(property);
        }

        return ResponseEntity.ok(tenant);
    }

    @PostMapping("/interested-tenants/{tenantId}/reject")
    public ResponseEntity<?> rejectTenant(
            @PathVariable Long tenantId
    ) {
        Optional<InterestedTenant> optTenant = interestedTenantRepository.findById(tenantId);
        if (optTenant.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        InterestedTenant tenant = optTenant.get();
        tenant.setStatus("rejected");
        interestedTenantRepository.save(tenant);
        return ResponseEntity.ok(tenant);
    }
}
