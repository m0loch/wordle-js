import { makeStyles } from "@material-ui/core";

const useKeyboardStyles = makeStyles({
  keyboard: {
    maxWidth: "500px",
    userSelect: "none",
    borderRadius: "5px",
  },
  row: {
    display: "flex",
    width: "100%",
    margin: "8px",
    /* https://stackoverflow.com/questions/46167604/ios-html-disable-double-tap-to-zoom */
    touchAction: "manipulation",
  },  
  button: {
    fontFamily: "inherit",
    fontWeight: "bold",
    border: 0,
    padding: 0,
    margin: "0 6px 0 0",
    height: "58px",
    borderRadius: "4px",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: "var(--square-color)",
    color: "var(--letter-color)",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  },
  correct: {
    backgroundColor: "var(--correct-letter)",
  },
  misplaced: {
    backgroundColor: "var(--misplaced-letter)",
  },
  wrong: {
    backgroundColor: "var(--wrong-letter)",
  }
});

export default useKeyboardStyles;