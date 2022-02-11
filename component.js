import React, { useState, useEffect/*, useCallback*/ } from 'react';
import { Grid, Container, Card } from "@material-ui/core";
import Keyboard from './keyboard';
import useComponentStyles from './styles/component-style';

function randomizeSolution() {
  return "CIGAR";
}

function Wordle() {
    const classes = useComponentStyles();

    const [solution, setSolution] = useState("");


    useEffect(() => {
      setSolution(randomizeSolution());
    }, [setSolution]);

    const rows = Array(6).fill([]);

    return (
      <Container className={classes.container}>
      <Grid className={classes.root}>
        {
          rows.map((value, idx) => {
            return (
            <div className={classes.row} key={idx}>
              {[...solution].map((c, idx) => {
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
      <Keyboard></Keyboard>
      </Container>
    );
}

export default Wordle;