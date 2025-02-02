package nl.kingdom.fenrin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostPlayerPlaytimeDataDTO {
    private boolean absent;
    private int time_played;
    private int year;
    private int week_number;
}
