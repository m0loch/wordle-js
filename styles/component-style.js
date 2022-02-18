import { makeStyles } from "@material-ui/core";

const useComponentStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    backgroundColor: "var(--header-background)",
    borderRadius: "5px",
    maxWidth: "550px",
    maxHeight: "650px",
  },
  root: {
    display: "grid",
    maxWidth: "500px",
    gridTemplateRows: "repeat(6, 1fr)",
    gridGap: "5px",
    padding: "10px",
    marginTop: "8px",
  },
  row: {
    display: "flex",
    gridGap: "5px",
  },
  tile: {
    display: "inline-flex",
    backgroundColor: "var(--square-color)",
    color: "var(--letter-color)",
    alignContent: "center",
    justifyContent: "center",
    width: "62px",
    height: "62px",
  },
  value: {
    margin: "auto",
  },
  hole: {
    opacity: "0",
  },
  correct: {
    backgroundColor: "var(--correct-letter)",
  },
  misplaced: {
    backgroundColor: "var(--misplaced-letter)",
  },
});

export default useComponentStyles;