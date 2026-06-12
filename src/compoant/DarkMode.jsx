import React, { useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IconContext } from "react-icons";
import { DarkModeContext } from "../Context/ModeContext";

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
       <IconContext value={{size:"18px",color:"#fff"}} id="dark">
            <button
             onClick={toggleDarkMode}
             style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "3px 12px",
        border: "none",
        cursor: "pointer",
        color: darkMode ? "#fff" : "#000",
        borderRadius: "6px",
        transition: "all 0.3s",
      }}
             >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <label htmlFor="dark" className="color-w">Mode</label>
          </IconContext>
          
    </>
  );
};

export default DarkMode


