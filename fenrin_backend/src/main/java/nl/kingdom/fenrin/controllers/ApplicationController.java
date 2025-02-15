package nl.kingdom.fenrin.controllers;

import nl.kingdom.fenrin.models.PlayerApplication;
import nl.kingdom.fenrin.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/application")
    private ResponseEntity<PlayerApplication> saveApplication(@RequestBody PlayerApplication playerApplication) {
        return ResponseEntity.ok(this.applicationService.saveApplication(playerApplication));
    }

    @RequestMapping("/application")
    private ResponseEntity<List<PlayerApplication>> getAllApplications() {
        return ResponseEntity.ok(this.applicationService.getAllApplications());
    }

    @DeleteMapping("/application/{id}")
    private ResponseEntity<?> deleteApplication(@PathVariable UUID id) {
        Optional<PlayerApplication> toBeDeletedApplication = this.applicationService.getApplicationById(id);

        if (toBeDeletedApplication.isPresent()) {
            this.applicationService.deleteApplication(toBeDeletedApplication.get());
            return ResponseEntity.status(204).body(null);
        } else {
            return ResponseEntity.status(404).body("Could not find application with id " + id);
        }
    }
}
