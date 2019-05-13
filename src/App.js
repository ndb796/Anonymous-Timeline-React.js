import React from 'react';
import Board from './components/Board';

const boards = [
  {
    id: 1,
    name: '홍길동',
    content: '안녕하세요.',
    date: new Date().toString()
  },
  {
    id: 2,
    name: '나동빈',
    content: '반갑습니다.',
    date: new Date().toString()
  }
]

class App extends React.Component {
  render() {
    return (
      <div>
        {boards.map(board => {
          return <Board id={board.id} name={board.name} content={board.content} date={board.date}/>
        })}
      </div>
    );
  }
}

export default App;