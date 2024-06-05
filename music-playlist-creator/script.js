let modalOpened = false;
let currModal;

function openModal(playlistModalID) {
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

function loadPlaylistCards() {
  let playcardHtml = "";
  let currentRow = "";
  let rowCount = 0;
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
               <img src="assets/img/heart.png">
               <p>${playlistLikeCount}</p>
            </div>
         </div>
         `;

    currentRow += playlistCard;
    rowCount++;

    if (rowCount == 4) {
      playcardHtml += `<div class="playlist-row">${currentRow}</div>`;
      rowCount = 0;
      currentRow = "";
    }
  }

  // add empty cards to make sure all cards are aligned the same
  if (rowCount != 0) {
    while (rowCount < 4) {
      currentRow += `<div class="playlist-cards text" style="visibility: hidden;"></div>`;
      rowCount++;
    }
    playcardHtml += `<div class="playlist-row">${currentRow}</div>`;
  }

  document.getElementById("playlist-cards-container").innerHTML = playcardHtml;
}

/*
<div id="playlist-modal" class="modal">
   <div class="modal-content">
      <div id="playlist">

         <div id="playlist-header">
               <img src="assets/img/playlist.png">
               <div class="text">
                  <h1>Playlist Title</h1>
                  <p>Creator Name</p>
               </div>
         </div>
      </div>

   <span class="close">&times;</span>
</div>
*/

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
                  <p>${songTitle}</p>
                  <p>${songArtist}</p>
                  <p>${songAlbum}</p>
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
               ${songsHtml}
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
