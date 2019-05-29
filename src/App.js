import React from 'react';
import Board from './components/Board';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import './App.css';

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
      writing: false
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
  writingToggle = () => {
    this.setState({writing: !this.state.writing})
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
    if(!this.state.name ||
       !this.state.content ||
       !this.state.password) {
       alert('이름과 비밀번호 및 메시지 내용을 모두 넣어주세요.');
       return;
    }
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
        writing: false,
        searchName: '',
        searchContent: '',
        content: '',
      });
      this._get();
    });
  }
  stateRefresh = () => {
    this.setState({
      boards: {},
      searchName: '',
      searchContent: '',
    })
    this.handleSearch();
  }
  render() {
    return (
      <div className="container">
        <Fab
          color={this.state.writing? "secondary" : "primary"}
          aria-label="Add"
          onClick={this.writingToggle}
          style={{margin: 10}}>
            {this.state.writing?
              <RemoveIcon />:
              <AddIcon />
            }
            
        </Fab>
        {this.state.writing && 
        <div className="write-area">
          <Card>
            <CardContent>
              <Typography color="primary" variant="h6" style={{marginRight: 10}}>
                  글쓰기
              </Typography>
              <TextField
                label="이름"
                type="text"
                margin="normal"
                variant="outlined"
                name="name"
                value={this.state.name}
                onChange={this.handleValueChange}
                onKeyPress={this.handleEnter}
                style={{marginLeft: 10, marginRight: 10}}
                inputProps={{style: {height: 15}}}
              />
              <TextField
                label="비밀번호"
                type="password"
                margin="normal"
                variant="outlined"
                name="password"
                value={this.state.password}
                onChange={this.handleValueChange}
                onKeyPress={this.handleEnter}
                style={{marginLeft: 10, marginRight: 10}}
                inputProps={{style: {height: 15}}}
              />
              <TextField
                label="메시지를 입력하세요."
                multiline
                rowsMax="6"
                name="content"
                value={this.state.content}
                onChange={this.handleValueChange}
                margin="normal"
                variant="outlined"
                fullWidth
                inputProps={{style: {height: 60}}}
              />
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleSubmit}
                style={{margin: 10}}
                inputProps={{}}>
                작성
              </Button>
            </CardContent>
          </Card>
        </div> 
        }
        <div className="search-area">
          <br />
          <TextField
            label="이름"
            type="text"
            margin="normal"
            variant="outlined"
            name="searchName"
            value={this.state.searchName}
            onChange={this.handleValueChange}
            onKeyPress={this.handleEnter}
            style={{marginLeft: 10, marginRight: 10}}
            inputProps={{style: {height: 15}}}
          />
          <TextField
            label="내용"
            type="text"
            margin="normal"
            variant="outlined"
            name="searchContent"
            value={this.state.searchContent}
            onChange={this.handleValueChange} 
            onKeyPress={this.handleEnter}
            style={{marginLeft: 10, marginRight: 10}}
            inputProps={{style: {height: 15}}}
          />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSearch}
            style={{margin: 20}}>
            검색
          </Button>
        </div>
        <br />
        {Object.keys(this.state.boards).map(id => {
          let board = this.state.boards[id];
          return (
            <div key={id}>
              <Board stateRefresh={this.stateRefresh} key={board.id} id={board.id} name={board.name} content={board.content} date={board.date}/>
              <br/>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;