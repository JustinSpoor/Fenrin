package nl.kingdom.fenrin.controllers;

import nl.kingdom.fenrin.dto.PatchPlayerPlaytimeDTO;
import nl.kingdom.fenrin.dto.PlayerPlaytimesDTO;
import nl.kingdom.fenrin.dto.PostPlayerPlaytimeDTO;
import nl.kingdom.fenrin.models.Player;
import nl.kingdom.fenrin.models.Playtime;
import nl.kingdom.fenrin.services.PlayerService;
import nl.kingdom.fenrin.services.PlaytimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
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

    @PatchMapping("/playtime")
    public ResponseEntity<?> updatePlaytime(@RequestBody PatchPlayerPlaytimeDTO playtime) {
     Optional<Playtime> toBeUpdatedPlaytime =  this.playtimeService.getPlaytimeById(playtime.getId());

     if(toBeUpdatedPlaytime.isPresent()) {
         toBeUpdatedPlaytime.get().setYear(playtime.getPlaytime().getYear());
         toBeUpdatedPlaytime.get().setWeekNumber(playtime.getPlaytime().getWeek_number());
         toBeUpdatedPlaytime.get().setTimePlayed(playtime.getPlaytime().getTime_played());
         toBeUpdatedPlaytime.get().setAbsent(playtime.getPlaytime().isAbsent());

         return ResponseEntity.ok(this.playtimeService.updatePlaytime(toBeUpdatedPlaytime.get()));
     } else {
         return ResponseEntity.status(409).body("Could not find playtime with id " + playtime.getId());
     }
    }

    @DeleteMapping("/playtime/{id}")
    public ResponseEntity<?> deletePlaytime(@PathVariable UUID id) {
        Optional<Playtime> toBeDeletedPlaytime = this.playtimeService.getPlaytimeById(id);

        if (toBeDeletedPlaytime.isPresent()) {
            this.playtimeService.deletePlaytime(toBeDeletedPlaytime.get());
            return ResponseEntity.status(204).body(null);
        } else {
            return ResponseEntity.status(404).body("Could not find playtime with id " + id);
        }
    }

}
