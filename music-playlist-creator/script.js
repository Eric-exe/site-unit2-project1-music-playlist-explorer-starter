// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("playlist-modal");
var span = document.getElementsByClassName("close")[0];

function openModal() {
  modal.style.display = "block";
}

// span.onclick = function () {
//   modal.style.display = "none";
// };

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
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
    console.log(playlistLikeCount);

    let playlistCard = `
         <div class="playlist-cards text">
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
      playcardHtml += `
            <div class="playlist-row">
            ${currentRow}
            </div>
            `;
      rowCount = 0;
      currentRow = "";
    }
  }

  // add empty cards to make sure all cards are aligned the same
  if (rowCount != 0) {
    while (rowCount < 4) {
      currentRow += `
            <div class="playlist-cards text" style="visibility: hidden;">
               <img src="assets/img/playlist.png">
               <h3>Playlist Title</h3>
               <p>Creator Name</p>
               
               <div class="playlist-cards-like text">
                  <img src="assets/img/heart.png">
                  <p>0</p>
               </div>
            </div>
            `;
      rowCount++;
    }
    playcardHtml += `
         <div class="playlist-row">
            ${currentRow}
         </div>
         `;
    rowCount = 0;
    currentRow = "";
  }


  document.getElementById("main-container").innerHTML = playcardHtml;
}

loadPlaylistCards();