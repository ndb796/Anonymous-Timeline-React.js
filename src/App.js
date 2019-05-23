import React from 'react';
import Board from './components/Board';

const databaseURL = "http://localhost:3000/api/board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: {},
      searchName: '',
      searchContent: '',
      name: '',
      content: '',
      password: '',
    }
  }
  _get() {
    fetch(`${databaseURL}`).then(res => {
      if(res.status !== 200) {
          throw new Error(res.statusText);
      }
      return res.json();
    }).then(data => {
      this.setState({boards: data['data']})
    });
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
  handleSubmit = () => {
    fetch(`${databaseURL}`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": this.state.name,
        "content": this.state.content,
        "password": this.state.password
      })
    }).then(res => {
      if(res.status !== 200) {
          throw new Error(res.statusText);
      }
      return res.json();
    }).then(data => {
      this.setState({
        searchName: '',
        searchContent: '',
        name: '',
        content: '',
        password: ''
      });
      this._get();
    });
  }
  render() {
    return (
      <div>
        <div>
          <textarea type="text" name="content" value={this.state.content} onChange={this.handleValueChange}>
          </textarea>
          이름: <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} onKeyPress={this.handleEnter}/>
          비밀번호: <input type="password" name="password" value={this.state.password} onChange={this.handleValueChange} onKeyPress={this.handleEnter}/>
          <input type="button" value="작성" onClick={this.handleSubmit}/>
        </div> 
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