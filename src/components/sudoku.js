import React from 'react'
import './index.css'

export default class Sudoku extends React.Component {
  constructor(props) {
    super(props)
    let sudoku = require('sudoku')

    let puzzle = sudoku.makepuzzle()
    console.log('puzzle is \n', puzzle)
    let solution = sudoku.solvepuzzle(puzzle)
    // let difficulty = sudoku.ratepuzzle(puzzle, 4);
    sudoku.ratepuzzle(puzzle, 4)

    let elements = this.generateElements(puzzle, puzzle, -1)
    let table = this.generateTable(elements, 9)

    let num = this.generateTable(this.generateNumberElements(), 3)
    this.state = {
      puzzle: puzzle,
      solution: solution,
      table: table,
      num: num,
      currentSelect: -1,
      currentNum: -1,
      newPuzzle: puzzle,
    }
    this.elementsOnClick = this.elementsOnClick.bind(this)
    this.NumberTableOnClick = this.NumberTableOnClick.bind(this)
  }

  NumberTableOnClick(e) {
    // console.log(e)
    let newPuzzle = [...this.state.newPuzzle]
    if (this.state.currentSelect !== -1) {
      newPuzzle[this.state.currentSelect] = e
    }
    let elements = this.generateElements(
      this.state.puzzle,
      newPuzzle,
      this.state.currentSelect,
    )
    let table = this.generateTable(elements, 9)
    this.setState({
      newPuzzle: newPuzzle,
      currentNum: e,
      table: table,
    })
    console.log(
      this.state.puzzle[this.state.currentSelect],
      newPuzzle[this.state.currentSelect],
    )
  }

  generateNumberElements() {
    let res = []
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 0; i < data.length; i++) {
      res.push(
        <div
          style={{
            border: '1px solid black',
            // display:'inline'
            margin: 0,
            width: '40px',
            height: '40px',
          }}
          key={i}
          onClick={this.NumberTableOnClick.bind(this, i + 1)}
        >
          <div
            style={{
              textAlign: 'center',
              lineHeight: '40px',
            }}
          >
            {data[i]}
          </div>
        </div>,
      )
    }
    return res
  }

  elementsOnClick(e) {
    let elements = this.generateElements(
      this.state.puzzle,
      this.state.newPuzzle,
      e,
    )
    let table = this.generateTable(elements, 9)
    this.setState({
      table: table,
      currentSelect: e,
    })
    // console.log('finish')
  }

  generateElements(puzzle, newPuzzle, currentSelect) {
    let res = []
    for (let i = 0; i < puzzle.length; i++) {
      let clsName = "normal "
      // console.log("current i%9 is ", i%9)
      if (i%3 === 2) {
        clsName += "bold-right "
      }
      if ((parseInt(i/9))%3 === 2) {
        clsName += "bold-bottom "
      }
      if (i%9 === 0) {
        clsName += "bold-left "
      }
      if (i/9 < 1) {
        clsName += "bold-top "
      }
      if (puzzle[i] !== null) {
        clsName += "inited"
        res.push(
          <div
            className={clsName}
            key={i}
          >
            <div
              style={{
                textAlign: 'center',
                lineHeight: '40px',
              }}
            >
              {newPuzzle[i]}
            </div>
          </div>,
        )
      } else {
        if (i === currentSelect) {
          clsName+= "selected"
          res.push(
            <div
              className={clsName}
              key={i}
              onClick={this.elementsOnClick.bind(this, i)}
            >
              <div
                style={{
                  textAlign: 'center',
                  lineHeight: '40px',
                }}
              >
                {newPuzzle[i]}
              </div>
            </div>,
          )
        } else {
          clsName += "none"
          res.push(
            <div
              className={clsName}
              key={i}
              onClick={this.elementsOnClick.bind(this, i)}
            >
              <div
                style={{
                  textAlign: 'center',
                  lineHeight: '40px',
                }}
              >
                {newPuzzle[i]}
              </div>
            </div>,
          )
        }
      }
    }

    return res
  }

  generateTable(elements, line) {
    let res = []
    for (let i = 0, len = elements.length; i < len; i += line) {
      res.push(
        <div
          className="row"
          style={{
            display: 'flex',
          }}
        >
          {elements.slice(i, i + line)}
        </div>,
      )
    }
    return res
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          className="board"
          style={{
            border: '2.5px solid black',
            width: 'fit-content',
            height: 'fit-content',
            padding: 0,
          }}
        >
          {this.state.table}
        </div>
        <div>
          <div
            style={{
              border: '2.5px solid black',
              width: 'fit-content',
              height: 'fit-content',
              marginLeft: '30px',
              padding: 0,
            }}
          >
            {this.state.num}
          </div>
        </div>
        <div>
          {/* <button onClick={() => {console.log(this.state.newPuzzle)}}>test</button> */}
        </div>
      </div>
    )
  }
}
