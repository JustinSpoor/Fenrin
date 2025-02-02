package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.models.Player;
import nl.kingdom.fenrin.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;


    public Optional<Player> getPlayerByName(String playerName) {
        return this.playerRepository.findPlayerByName(playerName);
    }
}
