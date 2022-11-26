export const popupLibrary = [
  {
    element: "#popupLibrary",
    stageBackground: "transparent",
    popover: {
      showButtons: false,
      title: "Enjoy Your Library",
      description: `<p>Log in to see saved songs, podcasts, artists, and playlists in Your Library.</p>
        <div class="choseButton">
          <button class="notNow" type="button">
            <a href="">Not Now</a>
          </button>
          <button class="logIn" type="button">
            <a href="https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-currently-playing%2Buser-read-recently-played%2Buser-read-playback-state%2Buser-top-read%2Buser-modify-playback-state%2Buser-read-playback-position%2Buser-library-modify%2Bplaylist-modify-private%2Bplaylist-modify-public%26response_type%3Dtoken%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%26client_id%3D30757f8d19f0421f978b6bceadaec2c2%26show_dialog%3Dtrue">Log in</a>
          </button>
        </div>
        `,
      position: "right",
    },
  },
];

export const popupLikedSongs = [
  {
    element: "#popupLikedSongs",
    stageBackground: "transparent",
    popover: {
      showButtons: false,
      title: "Enjoy Your Liked Songs",
      description: `<p>Log in to see the songs you've liked in one easy playlist.</p>
        <div class="choseButton">
          <button class="notNow" type="button">
            <a href="">Not Now</a>
          </button>
          <button class="logIn" type="button">
            <a href="https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-currently-playing%2Buser-read-recently-played%2Buser-read-playback-state%2Buser-top-read%2Buser-modify-playback-state%2Buser-read-playback-position%2Buser-library-modify%2Bplaylist-modify-private%2Bplaylist-modify-public%26response_type%3Dtoken%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%26client_id%3D30757f8d19f0421f978b6bceadaec2c2%26show_dialog%3Dtrue">Log in</a>
          </button>
        </div>
        `,
      position: "right",
    },
  },
];

export const popupCreatePlaylist = [
  {
    element: "#popupCreatePlaylist",
    stageBackground: "transparent",
    popover: {
      showButtons: false,
      title: "Create a playlist",
      description: `<p>Log in to create and share playlists.</p>
          <div class="choseButton">
            <button class="notNow" type="button">
              <a href="">Not Now</a>
            </button>
            <button class="logIn" type="button">
              <a href="https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-currently-playing%2Buser-read-recently-played%2Buser-read-playback-state%2Buser-top-read%2Buser-modify-playback-state%2Buser-read-playback-position%2Buser-library-modify%2Bplaylist-modify-private%2Bplaylist-modify-public%26response_type%3Dtoken%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%26client_id%3D30757f8d19f0421f978b6bceadaec2c2%26show_dialog%3Dtrue">Log in</a>
            </button>
          </div>
          `,
      position: "right",
    },
  },
];
