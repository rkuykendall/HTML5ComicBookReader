package ViewModels;

import models.ComicBook;

/**
 * Created by matt on 6/14/14.
 */
public class ComicBookViewModel {

    public ComicBookViewModel(ComicBook c){
        this.id = c.id;
        this.fileName = c.fileName;
        this.path = c.path;
        this.coverIndex = c.coverIndex;
        this.numPages = c.numPages;
        this.seriesName = c.seriesName;
        this.issueNumber = c.issueNumber;
    }
    public int id;
    public String fileName;
    public String path;
    public int coverIndex;
    public Integer numPages;
    public String seriesName;
    public int issueNumber;
}
