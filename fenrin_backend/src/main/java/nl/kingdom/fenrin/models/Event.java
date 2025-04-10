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
public class Event {

    @Id
    @GeneratedValue
    private UUID id;

    private int rowIndex;

    private int columnIndex;

    private String cappedBy;

}


