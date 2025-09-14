package hudson.plugins.global_build_stats.rententionstrategies.strategybehaviours;

import hudson.model.Run;
import hudson.plugins.global_build_stats.business.GlobalBuildStatsPluginSaver;

/**
 * @author fcamblor
 */
public interface BuildCompletedListener {
    void buildCompleted(Run<?, ?> builds, GlobalBuildStatsPluginSaver pluginSaver);
}
