package nl.kingdom.fenrin.repositories;

import nl.kingdom.fenrin.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PlayerRepository extends JpaRepository<Player, UUID> {

    Optional<Player> findPlayerByName(String playerName);
}
