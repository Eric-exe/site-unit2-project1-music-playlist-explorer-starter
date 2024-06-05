let modalOpened = false;
let currModal;

function openModal(playlistModalID) {
   // check if like is pressed
   let playlistID = playlistModalID.split('-')[1];
   let likeIcon = document.getElementById(`playlist-${playlistID}-like`);
   if (likeIcon.matches(":hover")) return;
   
   currModal = document.getElementById(playlistModalID);
   currModal.style.display = "block";
   modalOpened = true;
}

function closeModal() {
   currModal.style.display = "none";
   modalOpened = false;
}

window.onclick = function (event) {
  if (event.target == currModal) {
    currModal.style.display = "none";
  }
};

function likePressed(likeIconID) {
   // Update whether or not the like button is pressed
   let playlistID = likeIconID.split('-')[1];
   let likeIcon = document.getElementById(likeIconID);
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

function loadPlaylistCards() {
  let playcardHtml = "";
  for (let i = 0; i < data.playlists.length; i++) {
    let playlistID = data.playlists[i]["playlistID"];
    let playlistName = data.playlists[i]["playlist_name"];
    let playlistCreator = data.playlists[i]["playlist_creator"];
    let playlistArt = data.playlists[i]["playlist_art"];
    let playlistLikeCount = data.playlists[i]["likeCount"];

    let playlistCard = `
         <div class="playlist-cards text" onclick="openModal('playlist-${playlistID}-modal')">
            <div class="playlist-cards-stats">
               <img src="${playlistArt}">
               <h3>${playlistName}</h3>
               <p>${playlistCreator}</p>
            </div>
            
            <div class="playlist-cards-like text">
               <svg class="like-icon" id="playlist-${playlistID}-like" onclick="likePressed('playlist-${playlistID}-like')" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
               </svg>&nbsp;
               <p id="playlist-${playlistID}-like-cnt">${playlistLikeCount}</p>
            </div>
         </div>
         `;

    playcardHtml += playlistCard;
  }
  document.getElementById("playlist-cards-container").innerHTML = playcardHtml;
}

function loadPlaylistModals() {
  let playlistModalsHtml = "";
  for (let i = 0; i < data.playlists.length; i++) {
    // process songs
    let songsHtml = "";
    for (let j = 0; j < data.playlists[i].songs.length; j++) {
      let songID = data.playlists[i].songs[j]["songID"];
      let songTitle = data.playlists[i].songs[j]["title"];
      let songArtist = data.playlists[i].songs[j]["artist"];
      let songAlbum = data.playlists[i].songs[j]["album"];
      let songArt = data.playlists[i].songs[j]["cover_art"];
      let songDuration = data.playlists[i].songs[j]["duration"];

      let song = `
         <div class="playlist-song" id="song-${songID}">
            <img src="${songArt}">
            <div class="text">
                  ${songTitle}</br>
                  ${songArtist}</br>
                  ${songAlbum}
            </div>
            <div class="playlist-song-playtime text">${songDuration}</div>
         </div>
         `;
      songsHtml += song;
    }

    let playlistID = data.playlists[i]["playlistID"];
    let playlistName = data.playlists[i]["playlist_name"];
    let playlistCreator = data.playlists[i]["playlist_creator"];
    let playlistArt = data.playlists[i]["playlist_art"];

    let currModal = `
      <div id='playlist-${playlistID}-modal' class="modal">
         <div class="modal-content">
            <div id="playlist">
               <div id="playlist-header">
                  <img src="${playlistArt}">
                  <div class="text">
                     <h1>${playlistName}</h1>
                     <h3>${playlistCreator}</h3>
                  </div>
               </div>

               <div class="playlist-songs">${songsHtml}</div>
            </div>
            <span class="close" onclick="closeModal()">&times;</span>
         </div>
      </div>
      `;

    playlistModalsHtml += currModal;
  }

  document.getElementById("playlist-modals-container").innerHTML = playlistModalsHtml;
}

loadPlaylistCards();
loadPlaylistModals();
