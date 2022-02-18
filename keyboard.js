import './styles/colors.css';

import React, { useCallback } from 'react';
import { Container, Card } from "@material-ui/core";
import useKeyboardStyles from './styles/keyboard-style';
import Status from './status';

const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P",],
    ["A","S","D","F","G","H","J","K","L",],
    ["↵","Z","X","C","V","B","N","M","←",]
]

function Keyboard(props) {
    const classes = useKeyboardStyles();

    const handleClick = useCallback((value) => {
        switch(value) {
            case '↵':
                props.inputCallback("ENTER");
                break;
            case '←':
                props.inputCallback("BACKSPACE");
                break;
            default:
                props.inputCallback(value);
        }
    }, [props]);

    return (
        <Container className={classes.keyboard}>
            {rows.map((row, idx) => {
                return (<div className={classes.row} key={idx}>
                    {row.map((letter, idx) => {
                        let keyStyle = "";
                        if (letter in props.hints) {
                            switch (props.hints[letter]) {
                                case Status.Correct:
                                    keyStyle = classes.correct;
                                    break;

                                case Status.Misplaced:
                                    keyStyle = classes.misplaced;
                                    break;

                                case Status.Wrong:
                                    keyStyle = classes.wrong;
                                    break;

                                default:
                                    break;
                            }
                        }
                        return (
                            <Card className={` ${classes.button} ${keyStyle}`}
                                key={idx}
                                onClick={() => handleClick(letter)}
                            >
                                {letter}
                            </Card>)
                    })}
                </div>)
            })}
        </Container>
    );
}

export default Keyboard;