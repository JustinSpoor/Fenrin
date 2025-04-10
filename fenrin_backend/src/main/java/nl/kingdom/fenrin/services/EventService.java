package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.models.Event;
import nl.kingdom.fenrin.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEventEntries() {
        return eventRepository.findAll();
    }


    public void saveGrid(List<Event> gridEntries) {
        for (Event entry : gridEntries) {
            Event existingEntry = eventRepository.findByRowIndexAndColumnIndex(entry.getRowIndex(), entry.getColumnIndex());

            if (existingEntry != null) {
                existingEntry.setCappedBy(entry.getCappedBy());
                eventRepository.save(existingEntry);
            } else {
                eventRepository.save(entry);
            }
        }
    }
}
