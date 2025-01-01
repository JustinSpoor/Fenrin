package nl.kingdom.fenrin.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class Playtime {

    @Id
    @GeneratedValue
    private UUID id;

    private int year;

    private int weekNumber;

    private int timePlayed;

    private boolean absent;;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    @JsonBackReference
    private Player player;
}
