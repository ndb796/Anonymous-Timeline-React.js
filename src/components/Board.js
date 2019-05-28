import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Board extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterbottom>
                        {this.props.id}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.content}
                    </Typography>
                    <Typography color="textSecondary" gutterbottom>
                        {this.props.content}
                    </Typography>
                    <Typography color="textSecondary" gutterbottom>
                        {this.props.date}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default Board;