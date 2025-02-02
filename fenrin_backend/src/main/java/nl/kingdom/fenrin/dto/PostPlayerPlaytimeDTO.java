package nl.kingdom.fenrin.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostPlayerPlaytimeDTO {
    private String name;
    private PostPlayerPlaytimeDataDTO playtime;
}
