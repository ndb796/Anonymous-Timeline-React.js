import React from 'react';

class Board extends React.Component {
    render() {
        return (
            <div>
                번호: {this.props.id}<br/>
                이름: {this.props.name}<br/>
                내용: {this.props.content}<br/>
                날짜: {this.props.date}
            </div>
        );
    }
}

export default Board;