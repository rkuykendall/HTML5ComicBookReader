package ViewModels;

import models.ComicBook;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by matt on 6/14/14.
 */
public class FilesViewModel {
    public String parent;
    public String directory;
    public List<String> directories;
    public List<String> files;

    public FilesViewModel() {
        this.directories = new ArrayList<String>();
        this.files = new ArrayList<String>();
    }
}
