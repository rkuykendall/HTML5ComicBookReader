# --- Sample dataset

# --- !Ups

insert into comic_book (id, file_Name, path, cover_index, series_name, issue_number) values
    (1, 'Amazing Spider-Man v1 #222.cbz','/home/matt/comics', 1, 'Amazing Spider-Man', 222),
    (2, 'Amazing Spider-Man v1 #223.cbz','/home/matt/comics', 1, 'Amazing Spider-Man', 223),
    (3, 'Amazing Spider-Man v1 #224.cbz','/home/matt/comics', 2, 'Amazing Spider-Man', 224),
    (4, 'Amazing Spider-Man v1 #225.cbz','/home/matt/comics', 3, 'Amazing Spider-Man', 225);

# --- !Downs

delete from comicBook;
