import { Grid, Container, Card } from "@material-ui/core";
import useKeyboardStyles from './styles/keyboard-style';

const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P",],
    ["A","S","D","F","G","H","J","K","L",],
    ["↵","Z","X","C","V","B","N","M","←",]
]

function Keyboard() {
    const classes = useKeyboardStyles();

    return (
        <Container className={classes.keyboard}>
            {rows.map((row, idx) => {
                return (<div className={classes.row} key={idx}>
                    {row.map((letter, idx) => {
                        return (<Card className={classes.button} key={idx}>{letter}</Card>)
                    })}
                </div>)
            })}
        </Container>
    );
}

export default Keyboard;