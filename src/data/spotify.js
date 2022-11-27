//1.Click Login button
//2.Redirect to Spotify login page
//3.Redirect to home page once authorize
//https://developer.spotify.com/

export const authUser = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000";
const clientId = "30757f8d19f0421f978b6bceadaec2c2";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-playback-position",
  "user-library-modify",
  "user-library-read",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-read-collaborative",
  "ugc-image-upload",
  "app-remote-control",
  "streaming",
  "user-follow-modify",
  "user-follow-read",
  "user-read-email",
  "user-read-private",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authUser}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
