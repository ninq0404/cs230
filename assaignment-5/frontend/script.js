let editingID = null; 

async function loadArtists() {
    const res = await fetch("http://localhost:5000/artists");
    const data = await res.json(); 

    const table = document.querySelector("#artistsTable-tbody");
    table.innerHTML = ""; 
    data.forEach(artist => {
        const row = `
        <tr>
            <td>${artist.artistID}</td>
            <td>${artist.name}</td>
            <td>${artist.genre}</td>
            <td>${artist.monthlyListeners}</td>
            <td>
                <button onclick="editArtist"(${artist.artistID}, '${artist.name}', '${artist.genre}', ${artist.monthlyListeners})">Edit</button>
                <button onclick="deleteArtist(${artist.artistID})">Delete</button>
            </td>
        </tr> `;
        table.innerHTML += row; 
    });
}

async function addArtist() {
    const name = document.getElementById("name").value; 
    const genre = document.getElementById("genre").value;
    const listeners = document.getElementById("listeners").value; 

    if(editingID){
        await fetch(`http://localhost:5000/artists/${editingID}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json" }, 
            body: JSON.stringify({name, genre, monthlyListeners: listeners })
        })
        editingID = null; 
    } else {
        await fetch("http://localhost:5000/artists", {
            method: "POST", 
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ name, genre, monthlyListeners: listeners})
        });
    }
    loadArtists(); 
}

async function deleteArtist(id) {
    await fetch(`http://localhost:5000/artists/${id}`, {
        method: "DELETE"
    });
    loadArtists(); 
}
function editArtist(id, name, genre, listeners){
    document.getElementById("name").value = name; 
    document.getElementById("genre").value = genre;
    document.getElementById("listeners").value = listeners; 

    editingID = id; 
}
// async function editArtist(id) {
//     const updateData = {
//         name: document.getElementById("name").value,
//         genre: document.getElementById("genre").value,
//         monthlyListeners: document.getElementById("listeners").value
//     };
//     await fetch(`http://localhost:5000/artists/${id}`, {
//         method: "PUT",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(updateData)
//     });
//     loadArtists(); 
// }
deleteArtist(); 
editArtist();
//////////////////////////ALBUM/////////////////////////
async function loadAlbums() {
    const res = await fetch("http://localhost:5000/albums");
    const data = await res.json(); 

    const table = document.querySelector("#albumsTable-tbody");
    table.innerHTML = ""; 
    data.forEach(album => {
        const row = `
        <tr>
            <td>${album.albumID}</td>
            <td>${album.albumName}</td>
            <td>${album.albumYear}</td>
            <td>${album.numListens}</td>
            <td>${album.artistID}</td>
            <td>
                <button onclick="editAlbum"(${album.albumID}, '${album.albumName}', '${album.albumYear}', ${album.numListens}, ${album.artistID})">Edit</button>
                <button onclick="deleteAlbum(${album.albumID})">Delete</button>
            </td>
        </tr> `;
        table.innerHTML += row; 
    });
}

async function addAlbum() {
    const albumName = document.getElementById("albumName").value; 
    const albumYear = document.getElementById("albumYear").value;
    const listeners = document.getElementById("listeners").value; 
    const artistID = document.getElementById("artistID").value;

    if(editingID){
        await fetch(`http://localhost:5000/albums/${editingID}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json" }, 
            body: JSON.stringify({albumName, albumYear, numListens: listeners, artistID })
        })
        editingID = null; 
    } else {
        await fetch("http://localhost:5000/albums", {
            method: "POST", 
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ albumName, albumYear, monthlynumListens: listeners, artistID})
        });
    }
    loadAlbums(); 
}

async function deleteAlbum(id) {
    await fetch(`http://localhost:5000/albums/${id}`, {
        method: "DELETE"
    });
    loadAlbums(); 
}

function editAlbum(id, albumName, albumYear, listeners, artistID){
    document.getElementById("albumName").value = albumName; 
    document.getElementById("albumYear").value = albumYear;
    document.getElementById("listeners").value = listeners; 
    document.getElementById("artistID").value = artistID

    editingID = id; 
}

deleteAlbum(); 
editAlbum();

//////////////////////////SONG/////////////////////////
async function loadSongs() {
    const res = await fetch("http://localhost:5000/songs");
    const data = await res.json(); 

    const table = document.querySelector("#songsTable-tbody");
    table.innerHTML = ""; 
    data.forEach(song => {
        const row = `
        <tr>
            <td>${song.songID}</td>
            <td>${song.songName}</td>
            <td>${song.songYear}</td>
            <td>${song.albumID}</td>
            <td>
                <button onclick="editSong"(${song.songID}, '${song.songName}', ${song.songYear}, ${song.albumID})">Edit</button>
                <button onclick="deleteSong(${song.songID})">Delete</button>
            </td>
        </tr> `;
        table.innerHTML += row; 
    });
}

async function addSong() {
    const songName = document.getElementById("songName").value; 
    const songYear = document.getElementById("songYear").value;
    const albumID = document.getElementById("albumID").value; 

    if(editingID){
        await fetch(`http://localhost:5000/songs/${editingID}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json" }, 
            body: JSON.stringify({songName, songYear, albumID })
        })
        editingID = null; 
    } else {
        await fetch("http://localhost:5000/songs", {
            method: "POST", 
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ songName, songYear, albumID})
        });
    }
    loadSongs(); 
}

async function deleteSong(id) {
    await fetch(`http://localhost:5000/songs/${id}`, {
        method: "DELETE"
    });
    loadSongs(); 
}

function editSong(songName, songYear, albumID){
    document.getElementById("songName").value = songName; 
    document.getElementById("songYear").value = songYear;
    document.getElementById("albumID").value = albumID; 

    editingID = id; 
}
deleteSong(); 
editSong();
