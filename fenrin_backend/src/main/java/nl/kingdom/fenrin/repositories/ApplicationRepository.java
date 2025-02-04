package nl.kingdom.fenrin.repositories;

import nl.kingdom.fenrin.models.PlayerApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<PlayerApplication, UUID> {
}
