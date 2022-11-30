import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../css/Frames.css";
import styles from "../../css/Search/ResultUserSearch.module.css";
import { getSearch } from "../../redux/features/searchSlice";
import Footer from "../Footer";
import Header from "../Header";
import Categories from "../HomePlaylists/Categories";
import Navbar from "../Navbar";
import InputSearch from "./InputSearch";
import Songs from "./Songs";
import { Link } from "react-router-dom";

export default function ResultUserSearch() {
  const stateResultUserSearch = useSelector((state) => state.searchReducer);
  const dataAlbums = stateResultUserSearch?.data?.resultSearch?.dataAlbums;
  const dataArtists = stateResultUserSearch?.data?.resultSearch?.dataArtists;
  const dataPlaylists =
    stateResultUserSearch?.data?.resultSearch?.dataPlaylists;
  const dataTracks = stateResultUserSearch?.data?.resultSearch?.dataTracks;
  console.log("stateResultUserSearch", stateResultUserSearch);
  const dispatch = useDispatch();
  const params = useParams();
  const inputSearch = params.searchId;
  useEffect(() => {
    dispatch(getSearch({ inputSearch }));
  }, []);
  return (
    <div className="Frames">
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header>
          <InputSearch />
        </Header>
      </header>
      <main>
        <div className={styles.resultUserSearch}>
          <div className={styles.headerResultUserSearch}></div>
          <div className={styles.mainResultUserSearch}>
            <div className={styles.headerContent}>
              <div className={styles.topResult}>
                <h4>Top Result</h4>
                <Link to={`/artist/${dataTracks && dataTracks[0].idArtists}`}>
                  <div className={styles.resultInfo}>
                    <img
                      src={dataTracks && dataTracks[0].images}
                      alt={dataTracks && dataTracks[0].title}
                    />
                    <h1>{dataTracks && dataTracks[0].title}</h1>
                    <p>{dataTracks && dataTracks[0].artists}</p>
                  </div>
                </Link>
              </div>
              <div className={styles.songs}>
                <h4>Songs</h4>
                {dataTracks &&
                  dataTracks?.slice(0, 4)?.map((value) => {
                    return <Songs key={value.id} value={value} />;
                  })}
              </div>
            </div>
            <div className={styles.mainContent}>
              <Categories name="Artist" type={dataArtists} />
              <Categories name="Album" type={dataAlbums} />
              <Categories name="Playlist" type={dataPlaylists} />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
