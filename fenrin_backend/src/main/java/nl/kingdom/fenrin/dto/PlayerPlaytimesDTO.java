package nl.kingdom.fenrin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlayerPlaytimesDTO {

    private String playerName;
    private List<PlaytimeDTO> playtimes;


}
