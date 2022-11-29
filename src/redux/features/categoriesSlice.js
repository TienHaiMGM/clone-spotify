import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {
    categories: {
      trending: [],
      mood: [],
    },
    albums: [],
    artists: [],
    episode: [],
  },
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      "https://api.spotify.com/v1/browse/categories?country=VN",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const getArtists = createAsyncThunk(
  "categories/getArtists",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      "https://api.spotify.com/v1/artists?ids=0aNyWetkjBvIdZvJY00yEa,1LEtM3AleYg1xabW6CRkpi,4dpARuHxo51G3z768sgnrY,75Ki5hBCOpDtKGoFyTvLxP,7vk5e3vY1uw9plTHJAMwjN,1CWwyDPjCowRTO4p6A7r6g",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const getCategorie = createAsyncThunk(
  "categories/getCategorie",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const trending = await axios.get(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQIL0AXnG5AK/playlists?offset=10&limit=6",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const mood = await axios.get(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFzHmL4tf05da/playlists?offset=5&limit=4",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return [trending.data, mood.data];
  }
);

/*************ALBUM*********/
export const getAlbums = createAsyncThunk(
  "categories/getAlbums",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      "https://api.spotify.com/v1/albums/?ids=6TVfiWmo8KtflUAmkK9gGF,4Hjqdhj5rh816i1dfcUEaM,3nzuGtN3nXARvvecier4K0,06mXfvDsRZNfnsGZvX2zpb,3A9rCX2VkZWP6NGnLUnjQq,5YEiy4mUq0vpFFSMx37Ov6",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get Categories
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get Artist
      .addCase(getArtists.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArtists.fulfilled, (state, action) => {
        state.loading = false;
        const artists = action.payload.artists;
        const artist = [];
        artists?.map((item) => {
          artist.push({
            title: item.name,
            images: item.images[0].url,
            id: item.id,
            type: item.type,
          });
          return artist;
        });
        state.data.artists = artist;
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get Categorie
      .addCase(getCategorie.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCategorie.fulfilled, (state, action) => {
        state.loading = false;
        const [trending, mood] = action.payload;

        const trendingItem = [];
        trending.playlists.items.map((item) => {
          trendingItem.push({
            title: item.name,
            images: item.images[0].url,
            description: item.description,
            id: item.id,
            type: item.type,
          });
          return trendingItem;
        });
        const moodItem = [];
        mood.playlists.items.map((item) => {
          moodItem.push({
            title: item.name,
            images: item.images[0].url,
            description: item.description,
            id: item.id,
            type: item.type,
          });
          return moodItem;
        });

        state.data.categories.trending = trendingItem;
        state.data.categories.mood = moodItem;
      })
      .addCase(getCategorie.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get Albums
      .addCase(getAlbums.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
        const albums = action.payload.albums;
        const album = [];
        albums.map((item) => {
          album.push({
            title: item.name,
            images: item.images[0].url,
            artists: item.artists[0].name,
            id: item.id,
            type: item.type,
          });
          return album;
        });
        state.loading = false;
        state.data.albums = album;
      })
      .addCase(getAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
