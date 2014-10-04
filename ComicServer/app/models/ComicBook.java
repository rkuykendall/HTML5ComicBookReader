package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by matt on 6/14/14.
 */

@Entity
public class ComicBook extends Model {
    @Id
    public int id;

    public String fileName;

    public String path;

    public int coverIndex;

    public Integer numPages;

    public String seriesName;

    public int issueNumber;

    public static Finder<Integer, ComicBook> find = new Finder<Integer, ComicBook>(
            Integer.class, ComicBook.class
    );
}
