import React, { Component } from 'react';
import { Input } from 'antd';
import './App.css';

import table from './table.json'

const wordMap: {[key: string]: string} = table; 

class App extends Component {
  public state = {
    pinyinStr: '',
    resultStr: '',
    displayIndex: 0
  }

  private getWord = (idx: number) => {
    const words = wordMap[this.state.pinyinStr] || '';
    const list = words.split('');
    return list[this.state.displayIndex * 5 + idx] || '';
  }


  private handleChange = (e: any) => {
    const s = e.target.value || '';
    if (s === this.state.pinyinStr)
      return;
    const op = s[s.length - 1] || '';
    if (op === '=') {
      this.setState({ displayIndex: this.state.displayIndex + 1 });
    } else if (op === '-') {
      if (this.state.displayIndex > 0)
        this.setState({ displayIndex: this.state.displayIndex - 1 });
    } else if (op === ' ') {
      const rst = this.getWord(0);
      if (rst !== '')
        this.setState({ resultStr: this.state.resultStr + rst, displayIndex: 0, pinyinStr: '' });
    } else if (Number(op) >= 1 && Number(op) <= 5) {
      const rst = this.getWord(Number(op) - 1);
      this.setState({ resultStr: this.state.resultStr + rst, displayIndex: 0, pinyinStr: '' });
    } else {
      this.setState({ pinyinStr: s, displayIndex: 0 });
    }
  }

  private getList = (s: string) => {
    const words = wordMap[s] || '';
    const list = words.split('');
    let rst = '';
    for (let i = 0; i < 5; i++) {
      let j = this.state.displayIndex * 5 + i;
      if (j >= list.length)
        break;
      rst += ` ${i + 1}. ` + list[j];
    }
    return rst;
  }

  render() {
    const text = '输出: ' + this.state.resultStr;
    // console.log(table);
    return (
      <div className="App">
        <div className="App-header">
          <p>搜猫输入法</p>
          <Input 
            placeholder="请输入拼音"
            onChange={this.handleChange}
            value={this.state.pinyinStr}
          />
          <p>{this.getList(this.state.pinyinStr)}</p>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default App;