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
public class Build {

    @Id
    @GeneratedValue
    private UUID id;

    private String buildName;

    private String builderInCharge;

    private String warp;

    private String progress;

    private String priority;
}
