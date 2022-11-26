import {
  faAngleLeft,
  faAngleRight,
  faRightFromBracket,
  faSortDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../css/Header.module.css";
import { loginUrl } from "../data/spotify";
import { logout } from "../redux/features/loginSlice";

export default function Header(props) {
  const [dropdown, seDropdown] = useState(false);
  const stateLogin = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const token = stateLogin.data.token;
  const user = stateLogin.data.user;
  //Detect click outside element and setDropdown(false)
  const useOutsideLarter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          seDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  const wrapperRef = useRef(null);
  useOutsideLarter(wrapperRef);

  return (
    <div
      className={styles.header}
      style={{ backgroundColor: props.backgroundHeader }}
    >
      <div className={styles.forwardAndBackward}>
        <span>
          <FontAwesomeIcon icon={faAngleLeft} />
        </span>
        <span>
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </div>
      {/* */}
      <div>{props.children}</div>

      {token ? (
        <div className={styles.headerUser}>
          <button className={styles.upgradeBtn} type="button">
            <a
              href="https://www.spotify.com/vn-vi/premium/?utm_source=app&utm_medium=desktop&utm_campaign=upgrade"
              target="blank"
            >
              Upgrade
            </a>
          </button>
          <div
            ref={wrapperRef}
            onClick={() => seDropdown(true)}
            className={styles.dropdown}
          >
            <button className={styles.dropBtn} type="button">
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>{user?.display_name || "User"}</span>
              <span
                className={styles.iconSortDown}
                style={
                  dropdown
                    ? { transform: "rotate(180deg)" }
                    : { transform: "none" }
                }
              >
                <FontAwesomeIcon icon={faSortDown} />
              </span>
            </button>
            <div
              className={styles.dropdownContent}
              style={dropdown ? { display: "block" } : { display: "none" }}
            >
              <a
                href="https://www.spotify.com/vn-vi/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
                target="blank"
              >
                Account
                <FontAwesomeIcon icon={faRightFromBracket} />
              </a>
              <a href="">Profile</a>
              <a href="https://www.spotify.com/vn-vi/premium/" target="blank">
                Upgrade to Premium
                <FontAwesomeIcon icon={faRightFromBracket} />
              </a>
              <a href="https://support.spotify.com/vn-vi/" target="blank">
                Support
                <FontAwesomeIcon icon={faRightFromBracket} />
              </a>
              <a
                href="https://www.spotify.com/vn-vi/download/windows/"
                target="blank"
              >
                Download
                <FontAwesomeIcon icon={faRightFromBracket} />
              </a>
              <a href="">Setting</a>
              <a
                onClick={() => dispatch(logout())}
                className={styles.logOut}
                href="#"
              >
                Log out
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.headerLogin}>
          <div className={styles.myHeader}>
            <a
              href="https://www.spotify.com/vn-vi/premium/?utm_source=app&utm_medium=desktop&utm_campaign=upgrade"
              target="blank"
            >
              Premium
            </a>
            <a href="https://support.spotify.com/vn-vi/" target="blank">
              Support
            </a>
            <a
              href="https://www.spotify.com/vn-vi/download/windows/"
              target="blank"
            >
              Download
            </a>
          </div>
          <div className={styles.signupAndLogin}>
            <button className={styles.signUp} type="button">
              <a href="https://www.spotify.com/vn-vi/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">
                Sign up
              </a>
            </button>
            <button className={styles.logIn} type="button">
              <a href={loginUrl}>Log in</a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
