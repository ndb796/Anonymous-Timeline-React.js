import React from 'react';
import Board from './components/Board';

const databaseURL = "http://localhost:3000/api/board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: {},
      searchName: '',
      searchContent: ''
    }
  }
  _get() {
    fetch(`${databaseURL}`).then(res => {
      if(res.status !== 200) {
          throw new Error(res.statusText);
      }
      return res.json();
    }).then(data => this.setState({boards: data['data']}));
  }
  componentDidMount() {
    this._get();
  }
  handleSearch = () => {
    fetch(`${databaseURL}?name=${this.state.searchName}&content=${this.state.searchContent}`).then(res => {
      if(res.status !== 200) {
          throw new Error(res.statusText);
      }
      return res.json();
    }).then(data => this.setState({boards: data['data']}));
  }
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleEnter = (e) => {
    if(e.key === 'Enter') {
      this.handleSearch();
    }
  }
  render() {
    return (
      <div>
        이름: <input type="text" name="searchName" value={this.state.searchName} onChange={this.handleValueChange} onKeyPress={this.handleEnter}/>
        내용: <input type="text" name="searchContent" value={this.state.searchContent} onChange={this.handleValueChange} onKeyPress={this.handleEnter}/>
        <input type="button" value="검색" onClick={this.handleSearch}/>
        {Object.keys(this.state.boards).map(id => {
          let board = this.state.boards[id];
          return <Board key={board.id} id={board.id} name={board.name} content={board.content} date={board.date}/>
        })}
      </div>
    );
  }
}

export default App;