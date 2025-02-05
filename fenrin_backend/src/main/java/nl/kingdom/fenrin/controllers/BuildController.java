package nl.kingdom.fenrin.controllers;


import nl.kingdom.fenrin.models.Build;
import nl.kingdom.fenrin.services.BuildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class BuildController {

    @Autowired
    private BuildService buildService;


    @GetMapping("/buildlist")
    private ResponseEntity<List<Build>> getAllBuilds() {
        return ResponseEntity.ok(this.buildService.getAllBuilds());
    }

    @PostMapping("/build")
    private ResponseEntity<?> saveBuild(@RequestBody Build build) {
        Optional<Build> checkIfBuildAlreadyExists = this.buildService.getBuildByName(build.getBuildName());

        if (checkIfBuildAlreadyExists.isEmpty()) {
            return ResponseEntity.ok(this.buildService.saveBuild(build));
        } else {
            return ResponseEntity.status(409).body("Build with name " + build.getBuildName() + " already exists");
        }
    }

    @PatchMapping("/build")
    private ResponseEntity<?> updateBuild(@RequestBody Build build) {
        Optional<Build> toBeUpdatedBuild = this.buildService.getBuildById(build.getId());

        if (toBeUpdatedBuild.isPresent()) {
            toBeUpdatedBuild.get().setBuildName(build.getBuildName());
            toBeUpdatedBuild.get().setBuilderInCharge(build.getBuilderInCharge());
            toBeUpdatedBuild.get().setWarp(build.getWarp());
            toBeUpdatedBuild.get().setProgress(build.getProgress());
            toBeUpdatedBuild.get().setPriority(build.getPriority());

            return ResponseEntity.ok(this.buildService.updateBuild(toBeUpdatedBuild.get()));
        } else {
         return ResponseEntity.status(404).body("Could not find build with id " + build.getId());
        }
    }

    @DeleteMapping("/build/{id}")
    private ResponseEntity<?> deleteBuild(@PathVariable UUID id) {
        Optional<Build> toBeDeletedBuild = this.buildService.getBuildById(id);

        if (toBeDeletedBuild.isPresent()) {
            this.buildService.deleteBuild(toBeDeletedBuild.get());
            return ResponseEntity.status(204).body(null);
        } else {
            return ResponseEntity.status(404).body("Could not find build with id " + id);
        }
    }

}
