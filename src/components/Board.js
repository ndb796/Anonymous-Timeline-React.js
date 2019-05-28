import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Board extends React.Component {
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
    render() {
        return (
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
            </Card>
        );
    }
}

export default Board;