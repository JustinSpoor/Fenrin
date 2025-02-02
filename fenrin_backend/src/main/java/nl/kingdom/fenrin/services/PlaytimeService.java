package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.dto.PlayerPlaytimesDTO;
import nl.kingdom.fenrin.dto.PlaytimeDTO;
import nl.kingdom.fenrin.models.Playtime;
import nl.kingdom.fenrin.repositories.PlaytimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PlaytimeService {

    @Autowired
    private PlaytimeRepository playtimeRepository;

    public List<PlayerPlaytimesDTO> getAllPlayerPlaytimesForLastFiveWeeksDESC() {
        LocalDate fiveWeeksAgo = LocalDate.now().minusWeeks(5);

        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int startYear = fiveWeeksAgo.getYear();
        int startWeek = fiveWeeksAgo.get(weekFields.weekOfWeekBasedYear());


        List<Playtime> playtimes = playtimeRepository.findPlaytimesForLastFiveWeeksDESC(startYear, startWeek);

        Map<String, List<PlaytimeDTO>> groupedPlaytimes = playtimes.stream()
                .collect(Collectors.groupingBy(
                        pt -> pt.getPlayer().getName(),
                        Collectors.mapping(pt -> new PlaytimeDTO(
                                pt.getId().toString(),
                                pt.getYear(),
                                pt.getWeekNumber(),
                                pt.getTimePlayed(),
                                pt.isAbsent()
                        ), Collectors.toList())
                ));

        return groupedPlaytimes.entrySet().stream()
                .map(entry -> new PlayerPlaytimesDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    public List<PlayerPlaytimesDTO> getAllPlayerPlaytimesForLastFiveWeeksASC() {
        LocalDate fiveWeeksAgo = LocalDate.now().minusWeeks(5);

        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int startYear = fiveWeeksAgo.getYear();
        int startWeek = fiveWeeksAgo.get(weekFields.weekOfWeekBasedYear());


        List<Playtime> playtimes = playtimeRepository.findPlaytimesForLastFiveWeeksASC(startYear, startWeek);

        Map<String, List<PlaytimeDTO>> groupedPlaytimes = playtimes.stream()
                .collect(Collectors.groupingBy(
                        pt -> pt.getPlayer().getName(),
                        Collectors.mapping(pt -> new PlaytimeDTO(
                                pt.getId().toString(),
                                pt.getYear(),
                                pt.getWeekNumber(),
                                pt.getTimePlayed(),
                                pt.isAbsent()
                        ), Collectors.toList())
                ));

        return groupedPlaytimes.entrySet().stream()
                .map(entry -> new PlayerPlaytimesDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}

