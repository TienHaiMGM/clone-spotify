import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../../redux/features/searchSlice";

const useStyles = createUseStyles({
  inputSearch: {
    display: "flex",
    padding: "0.7em",
    backgroundColor: "white",
    maxWidth: "60%",
    height: "2.5em",
    borderRadius: "2em",
    "& input": {
      width: "100%",
      border: "none",
      outline: "none",
      paddingLeft: "1.2em",
    },
    "& .iconSearch": {
      fontSize: "1.3em",
      color: "#3C3B3B",
    },
  },
});

export default function InputSearch(props) {
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();
  const handleChangeInputSearch = (value) => {
    setInputSearch(value);
  };
  const handleKeyInputSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(getSearch({ inputSearch }));
      navigate(`/search/${inputSearch}`);
    }
  };
  return (
    <div className={classes.inputSearch}>
      <FontAwesomeIcon className="iconSearch" icon={faMagnifyingGlass} />
      <input
        onKeyDown={(e) => handleKeyInputSearch(e)}
        onChange={(e) => handleChangeInputSearch(e.target.value)}
        value={inputSearch}
        placeholder="What do you want to listen to?"
      />
    </div>
  );
}
