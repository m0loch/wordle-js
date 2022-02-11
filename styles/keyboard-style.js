import { makeStyles } from "@material-ui/core";

const useKeyboardStyles = makeStyles({
  keyboard: {
    maxWidth: "500px",
    userSelect: "none",
  //   backgroundColor: "var(--header-background)",
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
    color: "var(--key-text-color)",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  },
/*  button:focus {
    outline: "none",
  },*/
/*  button.fade {
    transition: background-color 0.1s ease, color 0.1s ease;
  }*/
/*  
  button:last-of-type {
    margin: 0;
  }*/
  
//   half: {
//     flex: 0.5,
//   }
//   .one {
//     flex: 1;
//   }

//   .one-and-a-half {
//     flex: 1.5;
//     font-size: 12px;
//   }
  
//   .two {
//     flex: 2;
//   }

//   button[data-state='correct'] {
//     background-color: var(--key-bg-correct);
//     color: var(--key-evaluated-text-color);
//   }

//   button[data-state='present'] {
//     background-color: var(--key-bg-present);
//     color: var(--key-evaluated-text-color);
//   }

//   button[data-state='absent'] {
//     background-color: var(--key-bg-absent);
//     color: var(--key-evaluated-text-color);
//   }
});

export default useKeyboardStyles;