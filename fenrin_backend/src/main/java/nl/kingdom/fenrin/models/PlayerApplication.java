package nl.kingdom.fenrin.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class PlayerApplication {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private String discordName;

    private String minecraftName;

    private int age;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;

    @Column(columnDefinition = "TEXT")
    private String strengthsAndWeaknesses;

    @Column(columnDefinition = "TEXT")
    private String whyYou;

    @Column(columnDefinition = "TEXT")
    private String history;

    @Column(columnDefinition = "TEXT")
    private String other;
}
