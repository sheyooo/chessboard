import React from 'react';
import Knight from './components/Knight';

const boardSize = 8;

const styles = {
  square: {
    // height: 70,
    // width: 70,
    // display: 'inline-flex',
    // backgroundColor: color,
    // color: textColor,
    // position: 'relative'
  },

  directions: {
    topBottom: {
      height: '100%',
      width: '0',
      position: 'absolute',
      border: 'solid 3px black',
      boxSizing: 'border-box',
      top: '0%',
      left: '50%',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: 'none',
    },
    leftRight: {
      height: '0%',
      width: '100%',
      position: 'absolute',
      border: 'solid 3px black',
      boxSizing: 'border-box',
      top: '50%',
      left: '0%',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'none',
    },
    topRight: {
      height: '50%',
      width: '50%',
      position: 'absolute',
      border: 'solid 3px black',
      boxSizing: 'border-box',
      top: '0%',
      left: '50%',
      borderRight: 'none',
      borderTop: 'none',
    },
    topLeft: {
      height: '50%',
      width: '50%',
      position: 'absolute',
      border: 'solid 3px black',
      boxSizing: 'border-box',
      top: '0%',
      left: '0%',
      borderLeft: 'none',
      borderTop: 'none',
    },
    bottomRight: {
      height: '50%',
      width: '50%',
      position: 'absolute',
      border: 'solid 3px black',
      boxSizing: 'border-box',
      top: '50%',
      left: '50%',
      borderRight: 'none',
      borderBottom: 'none',
    },
    bottomLeft: {
      height: '50%',
      width: '50%',
      position: 'absolute',
      border: 'solid 3px black',
      boxSizing: 'border-box',
      top: '50%',
      left: '0%',
      borderLeft: 'none',
      borderBottom: 'none',
    }
  }
}

class Square extends React.Component {

  render() {
    let color = this.props.color === 'light' ? '#F5D76E' : '#D35400';
    let textColor = this.props.color === 'light' ? '#333' : '#fff';
    return (
      <div style={{height: 70, width: 70, display: 'inline-flex', backgroundColor: color, color: textColor, position: 'relative'}}>
        <span className="directional"></span>

        {this.props.children}
      </div>
    )
  }
};

export default class Board extends React.Component {

  alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  alphabetsDict = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8};

  transformStepToMatrixPoint(square) {
    let [l, i] = square.split('');

    l = this.alphabetsDict[l];

    return [parseInt(l), parseInt(i)];
  }

  transformMatrixPointToStep = (point) => {
    point[0] = this.alphabets[point[0]-1];
    return point.join('');
  }

  getLMovePaths(from, to, alternate = false) {
    let diffX = to[0] - from[0];
    let diffY = to[1] - from[1];
    let shortAtStep = alternate ? 2 : 0;

    let paths = {
      short: { },
      long: { }
    };

    let shortAxis = Math.abs(diffX) === 1 ? 'X' : 'Y';

    if (shortAxis === 'X') {
      paths.short['idx'] = 0;
      paths.short['adder'] = diffX / Math.abs(diffX);

      paths.long['idx'] = 1;
      paths.long['adder'] = diffY / Math.abs(diffY);
    } else {
      paths.long['idx'] = 0;
      paths.long['adder'] = diffX / Math.abs(diffX);

      paths.short['idx'] = 1;
      paths.short['adder'] = diffY / Math.abs(diffY);
    }

    let path = [from];

    for (let step = 0; true; step++) {
      let newPath = path[step].slice();

      if (step !== shortAtStep) {
        newPath[paths.long.idx] += paths.long.adder;
      }
      if (step === shortAtStep) {
        newPath[paths.short.idx] += paths.short.adder;
      }

      path.push(newPath);

      if (step === 2) {
        break
      }
    }

    return path;
  }

  getStepsTo(from, to, alternate = false) {
    from = this.transformStepToMatrixPoint(from);
    to = this.transformStepToMatrixPoint(to);

    return this.getLMovePaths(from, to, alternate);
  }

  handleClick = () => {
    console.log(
      this.getStepsTo('B1', 'C3').map(this.transformMatrixPointToStep),
      this.getStepsTo('B1', 'C4', true).map(this.transformMatrixPointToStep)
    )
  }

  render() {
    let cols = new Array(8).fill(1);
    let rows = cols.slice(0);
    let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    return (
        cols.map((v, colIdx) => {
          return (
            <div style={{display: 'flex', flexDirection: 'row'}} key={colIdx}>
              {
                rows.map((_, idx) => {
                  let row = 8 - colIdx;
                  let cell = idx + 1;
                  let color = 'light';

                  if (row % 2 === cell % 2) {
                    color = 'dark'
                  }

                  let squareName = alphabets[idx] + (8-colIdx);
                  return (
                    <Square key={idx} color={color}>
                      {squareName}
                      { squareName === 'D3' && <Knight /> }
                    </Square>
                  )
                })
              }
              <div>
                <button onClick={this.handleClick}>Show Move</button>
              </div>
            </div>
          )
        })
      
    );
  }
};
