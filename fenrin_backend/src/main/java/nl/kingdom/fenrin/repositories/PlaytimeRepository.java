package nl.kingdom.fenrin.repositories;

import nl.kingdom.fenrin.models.Playtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PlaytimeRepository extends JpaRepository<Playtime, UUID> {

    @Query(value = """
        SELECT pt 
        FROM Playtime pt 
        JOIN pt.player p 
        WHERE (pt.year > :startYear OR (pt.year = :startYear AND pt.weekNumber >= :startWeek))
        ORDER BY p.name, pt.year DESC, pt.weekNumber DESC
            """)
     List<Playtime> findPlaytimesForLastFiveWeeks(
            @Param("startYear") int startYear,
            @Param("startWeek") int startWeek
    );

}
