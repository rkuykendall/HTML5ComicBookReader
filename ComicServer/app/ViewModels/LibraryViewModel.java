package ViewModels;

import models.ComicBook;
import models.ComicBooks;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by matt on 7/5/14.
 */
public class LibraryViewModel {
    public List<ComicBookViewModel> books;

    public LibraryViewModel(ComicBooks cb){
        books = new ArrayList<ComicBookViewModel>();
        for(ComicBook x : cb.books){
            books.add(new ComicBookViewModel(x));
        }
    }
}
