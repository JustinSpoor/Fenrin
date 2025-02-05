package nl.kingdom.fenrin.services;

import nl.kingdom.fenrin.models.Build;
import nl.kingdom.fenrin.repositories.BuildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BuildService {

    @Autowired
    private BuildRepository buildRepository;


    public List<Build> getAllBuilds() {
        return this.buildRepository.findAll();
    }

    public Optional<Build> getBuildById(UUID id) {
        return this.buildRepository.findById(id);
    }

    public Optional<Build> getBuildByName(String buildName) {
        return this.buildRepository.getBuildByName(buildName);
    }

    public Build saveBuild(Build build) {
        return this.buildRepository.save(build);
    }

    public Build updateBuild(Build build) {
        return this.buildRepository.save(build);
    }

    public void deleteBuild(Build build) {
        this.buildRepository.delete(build);
    }
}
