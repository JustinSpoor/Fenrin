package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.dto.SavePlayerDTO;
import nl.kingdom.fenrin.models.Player;
import nl.kingdom.fenrin.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    PlaytimeService playtimeService;


    public Optional<Player> getPlayerByName(String playerName) {
        return this.playerRepository.findPlayerByName(playerName);
    }

    public Optional<Player> getPlayerById(UUID id) {
        return this.playerRepository.findById(id);
    }

    public List<Player> getAllPlayers() {
        return this.playerRepository.findAll();
    }

    public Player updatePlayer(Player player) {
        return this.playerRepository.save(player);
    }

    public void deletePlayer(Player player) {
        this.playerRepository.delete(player);
    }

    public Player savePlayer(SavePlayerDTO player) {
        Player playerToBeSaved = new Player();

        playerToBeSaved.setName(player.getName());
        playerToBeSaved.setRank(player.getRank());

        return this.playerRepository.save(playerToBeSaved);
    }
}
