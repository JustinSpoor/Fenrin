package nl.kingdom.fenrin.controllers;

import nl.kingdom.fenrin.dto.PlayerPlaytimesDTO;
import nl.kingdom.fenrin.dto.PostPlayerPlaytimeDTO;
import nl.kingdom.fenrin.models.Player;
import nl.kingdom.fenrin.models.Playtime;
import nl.kingdom.fenrin.services.PlayerService;
import nl.kingdom.fenrin.services.PlaytimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PlaytimeController {

    @Autowired
    private PlaytimeService playtimeService;

    @Autowired
    private PlayerService playerService;

    @GetMapping("/descplaytimelist")
    public ResponseEntity<List<PlayerPlaytimesDTO>> getPlaytimeListDESC() {
        return ResponseEntity.ok(playtimeService.getAllPlayerPlaytimesForLastFiveWeeksDESC());
    }

    @GetMapping("/ascplaytimelist")
    public ResponseEntity<List<PlayerPlaytimesDTO>> getPlaytimeListASC() {
        return ResponseEntity.ok(playtimeService.getAllPlayerPlaytimesForLastFiveWeeksASC());
    }

    @PostMapping("/playtime")
    public ResponseEntity<?> postPlayerPlaytime(@RequestBody PostPlayerPlaytimeDTO playtime) {

        Optional<Player> player = this.playerService.getPlayerByName(playtime.getName());

        if (player.isPresent()) {
            return ResponseEntity.ok(playtimeService.savePlayerPlaytime(playtime, player.get()));
        } else {
            return ResponseEntity.status(404).body("Could not find Player with name: " + playtime.getName());
        }


    }
}
