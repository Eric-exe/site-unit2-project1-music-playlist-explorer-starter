let PLAYLIST_CARDS_CONTAINER  = "playlist-cards-container";
let PLAYLIST_MODALS_CONTAINER = "playlist-modals-container";

let PLAYLIST_CARDS_TEMPLATE   = "playlist-cards-template";
let PLAYLIST_MODALS_TEMPLATE  = "playlist-modals-template";
let PLAYLIST_SONGS_TEMPLATE   = "playlist-songs-template";

let ID_MAP = {
   "card":     "playlist-ID-card",
   "modal":    "playlist-ID-modal",
   "likeCnt":  "playlist-ID-like-cnt",
   "shuffle":  "playlist-ID-shuffle",
   "playlist": "playlist-ID-playlist",
   "likeIcon": "playlist-ID-like-icon",
   "song":     "song-ID",
   "close":    "close-ID",
};

// ####################################################################################################################################################################################################
// functions to populate the website with the info
let playlistsInfo = {}

// Loads data from data.js
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

function populatePlaylistCards() {
   let template = document.getElementById(PLAYLIST_CARDS_TEMPLATE);

   for (const [playlistID, stats] of Object.entries(playlistsInfo)) {
      let playlistCard = template.content.cloneNode(true);

      let playlistCardID     = `playlist-${playlistID}-card`;
      let playlistLikeIconID = `playlist-${playlistID}-like-icon`;
      let playlistLikeCntID  = `playlist-${playlistID}-like-cnt`;

      let playlistCardDOM     = playlistCard.getElementById(ID_MAP["card"]);
      let playlistLikeIconDOM = playlistCard.getElementById(ID_MAP["likeIcon"]);
      let playlistLikeCntDOM  = playlistCard.getElementById(ID_MAP["likeCnt"]);

      playlistCardDOM.id     = playlistCardID;
      playlistLikeIconDOM.id = playlistLikeIconID;
      playlistLikeCntDOM.id  = playlistLikeCntID;

      playlistCardDOM.querySelector("img").src        = stats["playlist_art"];
      playlistCardDOM.querySelector("h3").textContent = stats["playlist_name"];
      playlistCardDOM.querySelector("p").textContent  = stats["playlist_creator"];
      playlistLikeCntDOM.textContent                  = stats["likeCount"];

      document.getElementById(PLAYLIST_CARDS_CONTAINER).appendChild(playlistCard);
   }
}

function populatePlaylistModals() {
   let template = document.getElementById(PLAYLIST_MODALS_TEMPLATE);

   for (const [playlistID, stats] of Object.entries(playlistsInfo)) {
      let playlistModal = template.content.cloneNode(true);

      let playlistModalID     = `playlist-${playlistID}-modal`;
      let playlistShuffleID   = `playlist-${playlistID}-shuffle`;
      let playlistPlaylistID  = `playlist-${playlistID}-playlist`;
      let playlistCloseID     = `close-${playlistID}`;

      let playlistModalDOM     = playlistModal.getElementById(ID_MAP["modal"]);
      let playlistShuffleDOM   = playlistModal.getElementById(ID_MAP["shuffle"]);
      let playlistPlaylistDOM  = playlistModal.getElementById(ID_MAP["playlist"]);
      let playlistCloseDOM     = playlistModal.getElementById(ID_MAP["close"]);

      playlistModalDOM.id    = playlistModalID;
      playlistShuffleDOM.id  = playlistShuffleID;
      playlistPlaylistDOM.id = playlistPlaylistID;
      playlistCloseDOM.id    = playlistCloseID;

      playlistModalDOM.querySelector("img").src        = stats["playlist_art"];
      playlistModalDOM.querySelector("h1").textContent = stats["playlist_name"];
      playlistModalDOM.querySelector("h3").textContent = stats["playlist_creator"];

      document.getElementById(PLAYLIST_MODALS_CONTAINER).appendChild(playlistModal);
      populateSongs(playlistID, playlistPlaylistID);
   }
}

// generate the HTML that populates songs in PLAYLIST_MODALS_CONTAINER
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

// ####################################################################################################################################################################################################
// functions to make the playcards interactive

// handle the opening of modals, making sure to ignore if like is pressed
function openModal(playlistID) {
   // check if like is pressed
   let likeIcon = document.getElementById(`playlist-${playlistID}-like-icon`);
   if (likeIcon.matches(":hover")) return;
   
   currModal = document.getElementById(`playlist-${playlistID}-modal`);
   currModal.style.display = "block";
}

// handle the closing of modals
function closeModal(playlistID) {
   document.getElementById(`playlist-${playlistID}-modal`).style.display = "none";
}

// event listeners to show modal / update likes when card is pressed
function populateEventListeners() {
   for (let [playlistID, _] of Object.entries(playlistsInfo)) {
      
      document.getElementById(`playlist-${playlistID}-card`).addEventListener(
         "click",
         () => { openModal(playlistID); }
      );

      document.getElementById(`playlist-${playlistID}-like-icon`).addEventListener(
         "click",
         () => { likePressed(playlistID); }
      );

      document.getElementById(`playlist-${playlistID}-shuffle`).addEventListener(
         "click",
         () => { shufflePlaylist(playlistID); }
      );

   }
}

// handle the closing of modals
window.onclick = function (event) {
   // if the user clicks outside of the modal or the close button, close the modal
  if (event.target.classList.contains("modal") || 
      event.target.classList.contains("modal-close")) {
      let playlistID = event.target.id.split('-')[1];
      closeModal(playlistID);
  }
};


// handle if like is pressed
function likePressed(playlistID) {
   // Update whether or not the like button is pressed
   let likeIcon = document.getElementById(`playlist-${playlistID}-like-icon`);
   let likeCnt  = document.getElementById(`playlist-${playlistID}-like-cnt`);

   // update like/unlike
   if (likeIcon.classList.contains("like-icon-clicked")) {
      likeIcon.classList.remove("like-icon-clicked");
      likeCnt.textContent = parseInt(likeCnt.textContent) - 1;
   }
   else {
      likeIcon.classList.add("like-icon-clicked");
      likeCnt.textContent = parseInt(likeCnt.textContent) + 1;
   }
}

// shuffle button
function shufflePlaylist(playlistID) {
   let length = playlistsInfo[playlistID]["songs"].length;
   for (let i = 0; i < length; i++) {
      let newIdx = Math.floor(Math.random() * length);
      let tmp = playlistsInfo[playlistID]["songs"][i];
      playlistsInfo[playlistID]["songs"][i] = playlistsInfo[playlistID]["songs"][newIdx];
      playlistsInfo[playlistID]["songs"][newIdx] = tmp;
   }
   populateSongs(playlistID, `playlist-${playlistID}-playlist`);
}

// ####################################################################################################################################################################################################
populatePlaylistsInfo();
populatePlaylistCards();
populatePlaylistModals();
populateEventListeners();

