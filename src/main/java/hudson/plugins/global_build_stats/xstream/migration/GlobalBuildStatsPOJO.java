package hudson.plugins.global_build_stats.xstream.migration;

import hudson.plugins.global_build_stats.model.BuildStatConfiguration;
import hudson.plugins.global_build_stats.model.JobBuildResult;
import hudson.plugins.global_build_stats.rententionstrategies.RetentionStrategy;

import java.util.List;

/**
 * Generic interface for GlobalBuildStats POJOs
 *
 * @author fcamblor
 */
public interface GlobalBuildStatsPOJO {
    List<JobBuildResult> getJobBuildResults();

    void setJobBuildResults(List<JobBuildResult> jobBuildResults);

    List<BuildStatConfiguration> getBuildStatConfigs();

    void setBuildStatConfigs(List<BuildStatConfiguration> buildStatConfigs);

    List<RetentionStrategy> getRetentionStrategies();

    void setRetentionStrategies(List<RetentionStrategy> retentionStrategies);
}
