PRAGMA foreign_keys = ON; 

--make ARIST table
create table if not exists artists
(   artistID integer primary key autoincrement,
    name text not null,
    genre text not null,
    monthlyListeners integer not null
); 

--make ALBUM table
create table if not exists albums
(   albumID integer primary key autoincrement,
    albumName text not null,
    albumYear integer not null,
    numListens integer not null,
    artistID integer not null, 
    foreign key (artistID) references artists (artistID) on delete cascade
);

--make SONG table
create table if not exists songs
(   songID integer primary key autoincrement,
    songName text not null,
    songYear integer not null,
    albumID integer not null, 
    foreign key (albumID) references albums (albumID) on delete cascade
); 


-- insert 3 into ARTIST
insert into artists (name, genre, monthlyListeners) values
('The Hoosiers', 'indie-pop', '600000'),
('Shakira', 'pop', '790000'),
('Cosmo Sheldrake', 'indie', '890000');

-- insert 5 into ALBUM
insert into albums (albumName, albumYear, numListens, artistID ) values
('Eye To The Ear', 2024, '540000', '3'),
('Galapagos', 2019, '90000', '3'),
('The Trick To Life', 2007, '3000000', '1'),
('Confidence', 2023, '40000', '1'),
('She Wolf', 2009, '140000', '2');

--insert 10 into SONG
insert into songs (songName, songYear, albumID) values
('She Wolf', 2009, 5),
('Good Stuff', 2009, 5),
('Men In This Town', 2009, 5),
('Welcome to Confidence', 2023, 4),
('Hello Sunshine', 2023, 4),
('Goodbye Mr A', 2007, 3),
('Marine Iguanas', 2019, 2),
('Flamingos', 2019, 2),
('Stop the Music', 2024, 1),
('Gnort or Gnortle', 2024, 1);
