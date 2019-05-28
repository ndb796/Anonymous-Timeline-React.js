import React from 'react';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import UpdateIcon from '@material-ui/icons/Update';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    fab: {
    
    },
});
    
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateDialog: false,
            deleteDialog: false,
            content: '',
            password: ''
        }
    }
    func(date, time) {
        let year = date.split('-')[0];
        let month = date.split('-')[1];
        let day = date.split('-')[2];
        let hour = time.split(':')[0];
        let minute = time.split(':')[1];
        let second = time.split(':')[2];
        let myDate = new Date(year, month - 1, day, Number(hour) + 9, minute, second);
        return myDate.toString();
    }
    handleUpdateDialogToggle = () => this.setState({
        updateDialog: !this.state.updateDialog,
        password: ''
    })
    handleDeleteDialogToggle = () => this.setState({
        deleteDialog: !this.state.deleteDialog,
        password: ''
    })
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary">
                            {this.props.name}
                        </Typography>
                        <Typography>
                            {this.props.content}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.func(this.props.date.split('T')[0], this.props.date.split('T')[1].split('.')[0])}
                        </Typography>
                    </CardContent>
                    <CardActions style={{marginLeft: 10, marginBottom: 10}}>
                        <Typography
                            color="primary"
                            style={{marginRight: 10}}
                            onClick={this.handleUpdateDialogToggle}>
                            수정
                        </Typography>
                        <Typography
                            color="error"
                            style={{marginRight: 10}}
                            onClick={this.handleDeleteDialogToggle}>
                            삭제
                        </Typography>
                    </CardActions>
                </Card>
                <Dialog open={this.state.updateDialog} onClose={this.handleUpdateDialogToggle}>
                    <DialogTitle>게시물 수정하기</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="메시지"
                            type="text"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleValueChange}
                            inputProps={{style: {height: 80}}}
                            fullWidth
                            multiline
                            rowsMax="6"
                            variant="outlined"/>
                        <br/><br/>
                        <TextField
                            label="비밀번호"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleValueChange}
                            inputProps={{style: {width: 320}}}
                            fullWidth
                            variant="outlined"/>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleUpdateSubmit}>
                            수정
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleUpdateDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.deleteDialog} onClose={this.handleDeleteDialogToggle}>
                    <DialogTitle>게시물 삭제하기</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="비밀번호"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleValueChange}
                            inputProps={{style: {width: 320}}}
                            fullWidth
                            variant="outlined"/>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleDeleteSubmit}>
                            수정
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDeleteDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Board);