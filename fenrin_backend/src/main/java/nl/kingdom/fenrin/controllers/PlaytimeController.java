package nl.kingdom.fenrin.controllers;

import nl.kingdom.fenrin.dto.PlayerPlaytimesDTO;
import nl.kingdom.fenrin.services.PlaytimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlaytimeController {

    @Autowired
    private PlaytimeService playtimeService;

    @GetMapping("/descplaytimelist")
    public ResponseEntity<List<PlayerPlaytimesDTO>> getPlaytimeListDESC() {
        return ResponseEntity.ok(playtimeService.getAllPlayerPlaytimesForLastFiveWeeksDESC());
    }

    @GetMapping("/ascplaytimelist")
    public ResponseEntity<List<PlayerPlaytimesDTO>> getPlaytimeListASC() {
        return ResponseEntity.ok(playtimeService.getAllPlayerPlaytimesForLastFiveWeeksASC());
    }
}
