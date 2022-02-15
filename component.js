import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Container, Card } from "@material-ui/core";
import Keyboard from './keyboard';
import ValidWords from './dictionary';
import useComponentStyles from './styles/component-style';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomizeSolution() {
  return "CIGAR";
}

function NormalizeAttempt(value) {
  while (value.length < 5) {
    value += ' ';
  }
  return value;
}

function Wordle() {
    const classes = useComponentStyles();

    const [solution, setSolution] = useState("");
    const [attempt, setAttempt] = useState("");
    const [attempts, setAttempts] = useState([]);

    const handleInput = useCallback((keypressed) => {
      if (keypressed === "BACKSPACE") {
        if (attempt.length > 0) {

          setAttempt(attempt.slice(0, -1));

        }
      } else if (keypressed === "ENTER") {

        if (attempt.length === 5) {

          if (ValidWords.includes(attempt)) {
            setAttempts([...attempts, NormalizeAttempt(attempt)]);
            setAttempt("");
          } else {
            alert('nope');
          }
        }

      } else if ((attempt.length < 5) && (alphabet.indexOf(keypressed) > -1)) {

        setAttempt(attempt + keypressed);

      }        
    }, [attempt, attempts, setAttempt, setAttempts]);

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
    }, [setSolution]);

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
                  <Card className={classes.tile} key={idx}>
                    <p className={classes.value} key={idx}>{c}</p>
                  </Card>
                )})
              }
            </div>
          )})
        }
      </Grid>
      <Keyboard inputCallback={handleInput}></Keyboard>
      </Container>
    );
}

export default Wordle;