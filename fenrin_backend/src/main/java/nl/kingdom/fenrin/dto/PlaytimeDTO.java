package nl.kingdom.fenrin.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaytimeDTO {
    private String playtimeId;
    private int year;
    private int weekNumber;
    private int timePlayed;
    private boolean absent;
}
