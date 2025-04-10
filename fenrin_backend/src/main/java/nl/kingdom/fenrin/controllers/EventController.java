package nl.kingdom.fenrin.controllers;

import nl.kingdom.fenrin.models.Event;
import nl.kingdom.fenrin.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/event")
    public ResponseEntity<List<Event>> getEventGrid() {
        return ResponseEntity.ok(eventService.getAllEventEntries());
    }

    @PostMapping("/event")
    public ResponseEntity<?> saveGrid(@RequestBody List<Event> gridEntries) {
        List<Event> entries = gridEntries.stream()
                .map(event ->  {
                    Event entry = new Event();
                    entry.setRowIndex(event.getRowIndex());
                    entry.setColumnIndex(event.getColumnIndex());
                    entry.setCappedBy(event.getCappedBy());
                    return entry;
                })
                .toList();

        eventService.saveGrid(entries);
        return ResponseEntity.ok().build();
    }

}
