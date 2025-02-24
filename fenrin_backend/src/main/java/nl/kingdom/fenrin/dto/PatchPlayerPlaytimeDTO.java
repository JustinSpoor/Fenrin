package nl.kingdom.fenrin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatchPlayerPlaytimeDTO {
    private UUID id;
    private PostPlayerPlaytimeDataDTO playtime;
}
