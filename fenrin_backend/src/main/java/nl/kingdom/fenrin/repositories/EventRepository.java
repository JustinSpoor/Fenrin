package nl.kingdom.fenrin.repositories;

import nl.kingdom.fenrin.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    Event findByRowIndexAndColumnIndex(int rowIndex, int columnIndex);
}
