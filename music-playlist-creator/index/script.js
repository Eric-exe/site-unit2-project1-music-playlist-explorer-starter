let PLAYLIST_CARDS_CONTAINER = "playlist-cards-container";
let PLAYLIST_MODALS_CONTAINER = "playlist-modals-container";

// ####################################################################################################################################################################################################
/*
IDS: 
Cards: playlist-[playlistID]-card
Modals: playlist-[playlistID]-modal
Like Icon: playlist-[playlistID]-like-icon
Likes: playlist-[playlistID]-like-cnt
Playlist: playlist-[playlistID]-playlist
Shuffle: playlist-[playlistID]-shuffle
*/
// ####################################################################################################################################################################################################
// functions to populate the website with the info
let playlistsInfo = {}

// Loads data from data.js
function loadData() {
   for (let i = 0; i < data["playlists"].length; i++) {
      let playlist = data["playlists"][i];
      let playlistID = playlist["playlistID"];
      let playlistName = playlist["playlist_name"];
      let playlistCreator = playlist["playlist_creator"];
      let playlistArt = playlist["playlist_art"];
      let likeCount = playlist["likeCount"];

      let songsArray = playlist["songs"];
      playlistsInfo[playlistID] = {
         "playlist_name": playlistName,
         "playlist_art": playlistArt,
         "playlist_creator": playlistCreator,
         "likeCount": likeCount,
         "songs": songsArray
      };
   }
}

// generates the HTML that populates PLAYLIST_CARDS_CONTAINER
function populatePlaylistCards() {
   let playlistCardsHTML = "";
   for (let [playlistID, stats] of Object.entries(playlistsInfo)) {
      let singlePlaylistCard = `
         <div class="playlist-cards text" id="playlist-${playlistID}-card">
            <div class="playlist-cards-stats">
               <img src="${stats["playlist_art"]}">
               <h3>${stats["playlist_name"]}</h3>
               <p>${stats["playlist_creator"]}</p>
            </div>
            
            <div class="playlist-cards-like text">
               <svg class="like-icon" id="playlist-${playlistID}-like-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
               </svg>&nbsp;
               <p id="playlist-${playlistID}-like-cnt">${stats["likeCount"]}</p>
            </div>
         </div>
         `;
      playlistCardsHTML += singlePlaylistCard;
   }
   document.getElementById(PLAYLIST_CARDS_CONTAINER).innerHTML = playlistCardsHTML;
}

// generate the HTML that populates modals in PLAYLIST_MODALS_CONTAINER
function populatePlaylistModals() {
   let playlistModalsHTML = "";
   for (let [playlistID, stats] of Object.entries(playlistsInfo)) {
      let singleModal = `
      <div id='playlist-${playlistID}-modal' class="modal">
         <div class="modal-content">
            <div id="playlist">
               <div id="playlist-header">
                  <img src="${stats["playlist_art"]}" style="border: 5px double darkgray">
                  <div class="text" style="max-height: 20vh; overflow: clip;">
                     <h1>${stats["playlist_name"]}</h1>
                     <h3>${stats["playlist_creator"]}</h3>
                  </div>
               </div>
               <div class="right-align">
                  <div id="playlist-${playlistID}-shuffle" class="shuffle-button">
                     <p style="margin: auto 0;">Shuffle &nbsp;</p>
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                     </svg>
                  </div>
               </div>

               <div class="playlist-songs" id="playlist-${playlistID}-playlist">
                  ${populateSongs(playlistID)}
               </div>
            </div>
            <div>
               <span class="modal-close" id="close-${playlistID}">&times;</span>
            </div>
         </div>
      </div>
      `;
      playlistModalsHTML += singleModal;
   }
   document.getElementById(PLAYLIST_MODALS_CONTAINER).innerHTML = playlistModalsHTML;
}

// generates the HTML that populates the songs inside modals
function populateSongs(playlistID) {
   let songsHTML = "";
   for (let song of playlistsInfo[playlistID]["songs"]) {
      let singleSong = `
         <div class="playlist-song" id="song-${song["songID"]}">
            <img src="${song["cover_art"]}">
            <div class="text">
                  <b>${song["title"]}</b>
                  <div style="font-size: small;">
                     ${song["artist"]}</br>
                     ${song["album"]}
                  </div>
            </div>
            <div class="playlist-song-playtime text">${song["duration"]}</div>
         </div>
      `;
      songsHTML += singleSong;
   }
   return songsHTML;
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

// event listeners to show modal/  update likes when card is pressed
function generateEventListeners() {
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
  if (event.target.classList.contains("modal") || event.target.classList.contains("modal-close")) {
      let playlistID = event.target.id.split('-')[1];
      closeModal(playlistID);
  }
};


// handle if like is pressed
function likePressed(playlistID) {
   // Update whether or not the like button is pressed
   let likeIcon = document.getElementById(`playlist-${playlistID}-like-icon`);
   let likeCnt = document.getElementById(`playlist-${playlistID}-like-cnt`);
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
   document.getElementById(`playlist-${playlistID}-playlist`).innerHTML = populateSongs(playlistID);
}

// ####################################################################################################################################################################################################
// index.html init
loadData();
populatePlaylistCards();
populatePlaylistModals();
generateEventListeners();

// ####################################################################################################################################################################################################
