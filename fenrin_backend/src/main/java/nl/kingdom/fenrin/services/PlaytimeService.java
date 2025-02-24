package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.dto.PlayerPlaytimesDTO;
import nl.kingdom.fenrin.dto.PlaytimeDTO;
import nl.kingdom.fenrin.dto.PostPlayerPlaytimeDTO;
import nl.kingdom.fenrin.models.Player;
import nl.kingdom.fenrin.models.Playtime;
import nl.kingdom.fenrin.repositories.PlaytimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlaytimeService {

    @Autowired
    private PlaytimeRepository playtimeRepository;

    public List<PlayerPlaytimesDTO> getAllPlayerPlaytimesForLastFiveWeeksDESC() {
        LocalDate fiveWeeksAgo = LocalDate.now().minusWeeks(4);

        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int currentYear = LocalDate.now().getYear();
        int currentWeek = LocalDate.now().get(weekFields.weekOfWeekBasedYear());

        int startYear = fiveWeeksAgo.getYear();
        int startWeek = fiveWeeksAgo.get(weekFields.weekOfWeekBasedYear());

        List<Playtime> playtimes =  playtimeRepository.findPlaytimesForLastFiveWeeksDESC(startYear, startWeek, currentYear, currentWeek);


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
        // Calculate the date 5 weeks ago
        LocalDate fiveWeeksAgo = LocalDate.now().minusWeeks(4);

        // Calculate the current year and week number
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int currentYear = LocalDate.now().getYear();
        int currentWeek = LocalDate.now().get(weekFields.weekOfWeekBasedYear());

        // Calculate the year and week number of 5 weeks ago
        int startYear = fiveWeeksAgo.getYear();
        int startWeek = fiveWeeksAgo.get(weekFields.weekOfWeekBasedYear());

        // Call the repository method with the calculated year and week
        List<Playtime> playtimes =  playtimeRepository.findPlaytimesForLastFiveWeeksASC(startYear, startWeek, currentYear, currentWeek);

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

    public Optional<Playtime> getPlaytimeById(UUID id) {
        return this.playtimeRepository.findById(id);
    }


    public Playtime savePlayerPlaytime(PostPlayerPlaytimeDTO playtime, Player player) {
        Playtime newPlaytime = new Playtime();

        newPlaytime.setYear(playtime.getPlaytime().getYear());
        newPlaytime.setWeekNumber(playtime.getPlaytime().getWeek_number());
        newPlaytime.setTimePlayed(playtime.getPlaytime().getTime_played());
        newPlaytime.setAbsent(playtime.getPlaytime().isAbsent());
        newPlaytime.setPlayer(player);

        return this.playtimeRepository.save(newPlaytime);
    }

    public Playtime updatePlaytime(Playtime playtime){
        return this.playtimeRepository.save(playtime);
    }

    public void deletePlaytime(Playtime playtime) {
        this.playtimeRepository.delete(playtime);
    }


    public void setDefaultPlaytime(Player player) {
        Playtime defaultPlaytime = new Playtime();

        WeekFields weekFields = WeekFields.of(Locale.getDefault());

        defaultPlaytime.setYear(LocalDate.now().getYear());
        defaultPlaytime.setWeekNumber(LocalDate.now().minusWeeks(1).get(weekFields.weekOfWeekBasedYear()));
        defaultPlaytime.setTimePlayed(0);
        defaultPlaytime.setAbsent(false);
        defaultPlaytime.setPlayer(player);

        this.playtimeRepository.save(defaultPlaytime);
    }
}

