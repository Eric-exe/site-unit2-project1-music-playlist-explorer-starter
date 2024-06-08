let FEATURED_LEFT_CONTAINER  = "featured-left-container";
let FEATURED_RIGHT_CONTAINER = "featured-right-container";

let FEATURED_LEFT_TEMPLATE  = "featured-left-template";
let PLAYLIST_SONGS_TEMPLATE = "playlist-songs-template";

let ID_MAP = {
   "song": "song-ID",
};

// ####################################################################################################################################################################################################

let playlistsInfo = {}
let playlistIDS = []

function populatePlaylistsInfo() {
   for (let i = 0; i < data["playlists"].length; i++) {
      let playlist = data["playlists"][i];

      playlistsInfo[playlist["playlistID"]] = {
         "playlist_name":    playlist["playlist_name"],
         "playlist_art":     playlist["playlist_art"],
         "playlist_creator": playlist["playlist_creator"],
         "likeCount":        playlist["likeCount"],
         "songs":            playlist["songs"],
      };
   }
}

function populatePlaylistIDs() {
   for (const [playlistID, _] of Object.entries(playlistsInfo)) {
      playlistIDS.push(playlistID);
   }
} 

function populateFeaturedLeft(playlist) {
   let template = document.getElementById(FEATURED_LEFT_TEMPLATE);
   let featuredLeft = template.content.cloneNode(true);

   let playlistImg  = featuredLeft.getElementById("playlist-img");
   let playlistInfo = featuredLeft.getElementById("playlist-info");

   playlistImg.querySelector("img").src         = playlist["playlist_art"];
   playlistInfo.querySelector("h1").textContent = playlist["playlist_name"];
   playlistInfo.querySelector("h3").textContent = playlist["playlist_creator"];

   document.getElementById(FEATURED_LEFT_CONTAINER).appendChild(featuredLeft);
}

function populateSongs(playlistID, parentID) {
   // clear the playlist (for shuffle button)
   document.getElementById(parentID).innerHTML = "";

   let template = document.getElementById(PLAYLIST_SONGS_TEMPLATE);

   for (const song of playlistsInfo[playlistID]["songs"]) {
      let songCard = template.content.cloneNode(true);

      let songID = `song-${song["songID"]}`;

      let songCardDOM = songCard.getElementById(ID_MAP["song"]);

      songCardDOM.id = songID;

      songCardDOM.querySelector("img").src                             = song["cover_art"];
      songCardDOM.querySelector("b").textContent                       = song["title"];
      songCardDOM.querySelector(".artist-name").textContent            = song["artist"];
      songCardDOM.querySelector(".album-name").textContent             = song["album"];
      songCardDOM.querySelector(".playlist-song-playtime").textContent = song["duration"];

      document.getElementById(parentID).appendChild(songCardDOM);
   }
}

function populateFeaturedPlaylist() {
   let playlistID = playlistIDS[Math.floor(Math.random() * playlistIDS.length)];
   let playlist = playlistsInfo[playlistID];
   populateFeaturedLeft(playlist);
   populateSongs(playlistID, FEATURED_RIGHT_CONTAINER);
}
// ####################################################################################################################################################################################################
populatePlaylistsInfo();
populatePlaylistIDs();
populateFeaturedPlaylist();
