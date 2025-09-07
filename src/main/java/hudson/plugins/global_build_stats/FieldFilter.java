package hudson.plugins.global_build_stats;

public interface FieldFilter {

    boolean isFieldValueValid(String fieldValue);

    FieldFilter ALL = new FieldFilter() {
        @Override
        public boolean isFieldValueValid(String fieldValue) {
            return true;
        }
    };
}