package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.models.PlayerApplication;
import nl.kingdom.fenrin.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;


    public Optional<PlayerApplication> getApplicationById(UUID id) {
        return this.applicationRepository.findById(id);
    }

    public PlayerApplication saveApplication(PlayerApplication playerApplication) {
        return this.applicationRepository.save(playerApplication);
    }

    public List<PlayerApplication> getAllApplications() {
        return this.applicationRepository.findAll();
    }

    public void deleteApplication(PlayerApplication playerApplication) {
        this.applicationRepository.delete(playerApplication);
    }

}
