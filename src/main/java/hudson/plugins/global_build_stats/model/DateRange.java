package hudson.plugins.global_build_stats.model;

import org.kohsuke.stapler.export.Exported;
import org.kohsuke.stapler.export.ExportedBean;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.Objects;

@ExportedBean(defaultVisibility = 3)
public class DateRange implements Comparable<DateRange> {

    private final Calendar start;
    private final Calendar end;
    private final DateFormat dateFormatter;

    public DateRange(Calendar _start, Calendar _end, DateFormat _dateFormatter) {
        this.start = (Calendar) _start.clone();
        this.end = (Calendar) _end.clone();
        this.dateFormatter = _dateFormatter;
    }

    public int compareTo(DateRange o) {
        return this.start.compareTo(o.start);
    }

    @Override
    public String toString() {
        return dateFormatter.format(start.getTime()) + " --> " + dateFormatter.format(end.getTime());
    }

    @Exported
    public Calendar getStart() {
        return start;
    }

    @Exported
    public Calendar getEnd() {
        return end;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.start);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final DateRange other = (DateRange) obj;
        return Objects.equals(this.start, other.start);
    }
}
