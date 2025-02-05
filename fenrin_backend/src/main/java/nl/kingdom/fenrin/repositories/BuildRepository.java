package nl.kingdom.fenrin.repositories;


import nl.kingdom.fenrin.models.Build;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BuildRepository extends JpaRepository<Build, UUID> {

    Optional<Build> getBuildByBuildName(String buildName);
}
