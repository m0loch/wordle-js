import './styles/colors.css';

import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Container, Card } from "@material-ui/core";
import Keyboard from './keyboard';
import ValidWords from './dictionary';
import useComponentStyles from './styles/component-style';
import Status from './status';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomizeSolution() {
  return ValidWords[Math.floor(Math.random() * 2315)];
}

function NormalizeAttempt(value, result) {
  let retVal = [];

  while (value.length < 5) {
    value += ' ';
  }

  [...value].forEach((letter, index) => {
    if (!result || (result[index] < 0)) {
      retVal.push({ value: letter })
    } else {
      retVal.push({ value: letter, correct: result[index] === index})
    }
  });

  return retVal;
}

function Wordle() {
    const classes = useComponentStyles();

    const [solution, setSolution] = useState("");
    const [attempt, setAttempt] = useState("");
    const [attempts, setAttempts] = useState([]);
    const [hints, setHints] = useState({});
    const [gameEnded, setGameEnded] = useState(false);

    const updateHints = useCallback((result) => {

      const newHints = hints;

      result.forEach((value, index) => {
        if (value === -1) {
          newHints[attempt[index]] = Status.Wrong;
        } else if (value === index) {
          newHints[attempt[index]] = Status.Correct;
        } else if (!(attempt[index] in newHints)) {
          newHints[attempt[index]] = Status.Misplaced;
        }
      });

      setHints(newHints);

    }, [attempt, hints, setHints]);

    const submitAttempt = useCallback(() => {
      if (!ValidWords.includes(attempt)) {
        // Create a better modal
        alert('nope');
        return;
      }

      // Match attempt
      const result = [-1, -1, -1, -1, -1];

      // - check for exact spot
      for (let i = 0; i < 5; i++) {
        if (attempt[i] === solution[i]) {
          result[i] = i;
        }
      }

      // - check for misplaced letters
      for (let i = 0; i < 5; i++) {
        if (result[i] !== -1) {
          continue;
        }

        for (let k = 0; k < 5; k++) {
          if ((result[i] !== -1) || (result.includes(k))) {
            continue;
          }

          if (attempt[i] === solution[k]) {
            result[i] = k;
          }
        }
      }

      const updatedAttempts = [...attempts, NormalizeAttempt(attempt, result)];

      setAttempts(updatedAttempts);
      updateHints(result);

      if (attempt === solution) {
        alert('WIN');
        setGameEnded(true);
      } else if (updatedAttempts.length === 6) {
        alert(`WHY DIDN'T YOU TRY ${solution}?!?`);
        setGameEnded(true);
      }

      setAttempt("");
    }, [attempt, attempts, solution, updateHints]);

    const handleInput = useCallback((keypressed) => {
      if (gameEnded) {
        return;
      }

      if (keypressed === "BACKSPACE") {

        if (attempt.length > 0) {
          setAttempt(attempt.slice(0, -1));
        }

      } else if (keypressed === "ENTER") {

        if (attempt.length === 5) {
          submitAttempt();
        }

      } else if ((attempt.length < 5) && (alphabet.indexOf(keypressed) > -1)) {

        setAttempt(attempt + keypressed);

      }        
    }, [attempt, gameEnded, setAttempt, submitAttempt]);

    const handleUserKeyPress = useCallback((event) => {
      if (attempts.length >= 6) {
        // This control is probably redundant, but we don't want people submit attempts forever
        return;
      }

      const keypressed = event.key.toUpperCase();
      handleInput(keypressed);
    }, [attempts, handleInput]);

    useEffect(() => {
      setSolution(randomizeSolution());
      setGameEnded(false);
    }, [setGameEnded, setSolution]);

    useEffect(() => {
      window.addEventListener('keydown', handleUserKeyPress);

      return () => {
        window.removeEventListener('keydown', handleUserKeyPress);
      }
    }, [handleUserKeyPress]);

    const rows = [...attempts, NormalizeAttempt(attempt)];
    while (rows.length < 6) {
      rows.push(new Array(5));
    }

    while (rows.length > 6) {
      rows.pop();
    }

    return (
      <Container className={classes.container}>
      <Grid className={classes.root}>
        {
          rows.map((value, idx) => {
            return (
            <div className={classes.row} key={idx}>
              {([...value]).map((c, idx) => {
                return (
                  <Card className={`${classes.tile} ${c && ('correct' in c) ? (c.correct ? classes.correct : classes.misplaced) : null}`}
                    key={idx}
                  >
                    <p className={classes.value} key={idx}>{c?.value}</p>
                  </Card>
                )})
              }
            </div>
          )})
        }
      </Grid>
      <Keyboard inputCallback={handleInput} hints={hints}></Keyboard>
      </Container>
    );
}

export default Wordle;