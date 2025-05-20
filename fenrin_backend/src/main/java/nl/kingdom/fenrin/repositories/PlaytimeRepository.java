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
    WHERE p.rank <> 'non-actief'
      AND (pt.year > :startYear 
           OR (pt.year = :startYear AND pt.weekNumber >= :startWeek))
      AND (pt.year < :currentYear 
           OR (pt.year = :currentYear AND pt.weekNumber <= :currentWeek))
    ORDER BY p.name, pt.year DESC, pt.weekNumber DESC
""")
    List<Playtime> findPlaytimesForLastFiveWeeksDESC(
            @Param("startYear") int startYear,
            @Param("startWeek") int startWeek,
            @Param("currentYear") int currentYear,
            @Param("currentWeek") int currentWeek
    );

    @Query(value = """
    SELECT pt 
    FROM Playtime pt 
    JOIN pt.player p 
    WHERE p.rank <> 'non-actief'
      AND (pt.year > :startYear 
           OR (pt.year = :startYear AND pt.weekNumber >= :startWeek))
      AND (pt.year < :currentYear 
           OR (pt.year = :currentYear AND pt.weekNumber <= :currentWeek))
    ORDER BY p.name, pt.year ASC, pt.weekNumber ASC
""")
    List<Playtime> findPlaytimesForLastFiveWeeksASC(
            @Param("startYear") int startYear,
            @Param("startWeek") int startWeek,
            @Param("currentYear") int currentYear,
            @Param("currentWeek") int currentWeek
    );
}
