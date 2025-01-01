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

    @GetMapping("/playtimelist")
    public ResponseEntity<List<PlayerPlaytimesDTO>> getPlaytimeList() {
        return ResponseEntity.ok(playtimeService.getAllPlayerPlaytimesForLastFiveWeeks());
    }
}
