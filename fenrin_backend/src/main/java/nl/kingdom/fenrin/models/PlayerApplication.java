package nl.kingdom.fenrin.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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

    private String discordName;

    private String name;

    private String minecraftName;

    private int age;

    private String aboutMe;

    private String strengthsAndWeaknesses;

    private String whyYou;

    private String history;

    private String other;
}
