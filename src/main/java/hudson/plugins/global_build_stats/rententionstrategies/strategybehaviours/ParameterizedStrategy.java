package hudson.plugins.global_build_stats.rententionstrategies.strategybehaviours;

import hudson.plugins.global_build_stats.rententionstrategies.RetentionStrategy;

import java.util.Map;

/**
 * @author fcamblor
 */
public interface ParameterizedStrategy<T extends RetentionStrategy> {
    void updateStrategyParameters(Map<String, String[]> parameters);

    void updateStrategyParameters(T strategyToCopy);
}
