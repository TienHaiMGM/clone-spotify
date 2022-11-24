import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import InputSearch from "../components/Search/InputSearch";
import MainSearch from "../components/Search/MainSearch";
import "../css/Frames.css";
import styles from "../css/Search/Search.module.css";
import { getBrowse } from "../redux/features/searchSlice";

export default function Search() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrowse());
  }, []);
  return (
    <div className={`${styles.search} Frames`}>
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header>
          <InputSearch />
        </Header>
      </header>
      <main className={styles.MainSearch}>
        <MainSearch />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
