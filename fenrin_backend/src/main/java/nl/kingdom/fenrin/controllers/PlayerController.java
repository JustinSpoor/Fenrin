package nl.kingdom.fenrin.controllers;


import nl.kingdom.fenrin.dto.SavePlayerDTO;
import nl.kingdom.fenrin.models.Player;
import nl.kingdom.fenrin.services.PlayerService;
import nl.kingdom.fenrin.services.PlaytimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlaytimeService playtimeService;


    @GetMapping("/players")
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(this.playerService.getAllPlayers());
    }

    @PatchMapping("/players")
    public ResponseEntity<?> updatePlayer(@RequestBody Player player) {
        Optional<Player> toBeUpdatedPlayer = this.playerService.getPlayerById(player.getId());

        if(toBeUpdatedPlayer.isPresent()) {
            toBeUpdatedPlayer.get().setName(player.getName());
            toBeUpdatedPlayer.get().setRank(player.getRank());
            return ResponseEntity.ok(this.playerService.updatePlayer(toBeUpdatedPlayer.get()));
        } else {
            return ResponseEntity.status(404).body("Could not find player with id " + player.getId());
        }
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable UUID id) {
        Optional<Player> toBeDeletedPlayer = this.playerService.getPlayerById(id);

        if(toBeDeletedPlayer.isPresent()) {
            this.playerService.deletePlayer(toBeDeletedPlayer.get());
            return ResponseEntity.status(204).body(null);
        } else {
            return ResponseEntity.status(404).body("Could not find player with id " + id);
        }
    }


    @PostMapping("/players")
    public ResponseEntity<?> savePlayer(@RequestBody SavePlayerDTO player) {
        Optional<Player> checkIfPlayerExists = this.playerService.getPlayerByName(player.getName());

        if (checkIfPlayerExists.isEmpty()) {
            Player savedPlayer = this.playerService.savePlayer(player);
            this.playtimeService.setDefaultPlaytime(savedPlayer);

            return ResponseEntity.ok(savedPlayer);
        } else {
            return ResponseEntity.status(409).body("Player with name " + player.getName() + " already exists");
        }
    }
}
