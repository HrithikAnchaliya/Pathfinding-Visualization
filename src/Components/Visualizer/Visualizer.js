import React from 'react';
import Node from '../Node/Node';
import dijkstra, { getShortPath } from '../../Algorithms/dijkstra'
import Cards from '../Card/Cards'

import './Visualizer.css'

export default class Visualizer extends React.Component{
constructor() {
    super()
      this.state = {
        grid : [],
        startNode : {row : null, col : null},
        finishNode : {row : null, col : null},
        wallToggle : false,
        diagonal : false,
        OnIntro : true,
        visitingPath : null,
        shortestPath : null
    }
    this.createGrid = this.createGrid.bind(this);
    this.makeNode = this.makeNode.bind(this);
    this.keypress = this.keypress.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.getPath = this.getPath.bind(this);
    this.visualizePath = this.visualizePath.bind(this);
    this.makeSome = this.makeSome.bind(this);
    this.changeState = this.changeState.bind(this);
    this.cleanGrid = this.cleanGrid.bind(this);
}

componentDidMount = () =>{
    this.createGrid();
}

createGrid = () =>{
    let makeGrid = [];
    for(let i = 0; i < 30; i++){
        let row = [];
        for(let j = 0; j < 50; j++){
            row.push(this.makeNode(i,j));
        }
        makeGrid.push(row)
    }
    this.setState({ grid : makeGrid })
}

makeNode = (row,col) => {
    return {
        row,
        col,
        isAWall : false,
        isAStart : false,
        isAFinish : false,
        isVisited : false,
        distance : Infinity,
        previousNode : null
    };
}

makeSome = () => {
    let { diagonal } = this.state
    this.setState({ diagonal : !diagonal })
}

keypress = (event,rowNo,colNo) => {
    if(event.key === 's'){
       this.setStart(rowNo,colNo)
    }
    if(event.key === 'e'){
        this.setEnd(rowNo,colNo)
     }
}

setStart = (rowNo,colNo) =>{
    let { startNode, grid } = this.state;
       if((startNode.row !== null) && (startNode.col !== null)){
           grid[startNode.row][startNode.col].isAStart = false;
}
           grid[rowNo][colNo].isAStart = true;
           grid[rowNo][colNo].isAWall = false;
           let obj = {row : rowNo, col : colNo}
           this.setState({startNode : obj});
}

setEnd = (rowNo,colNo) =>{
    let { finishNode, grid } = this.state;
       if((finishNode.row !== null) && (finishNode.col !== null)){
            grid[finishNode.row][finishNode.col].isAFinish = false;
       }
            grid[rowNo][colNo].isAFinish = true;
            grid[rowNo][colNo].isAWall = false;
            let obj = {row : rowNo, col : colNo}
            this.setState({finishNode : obj});
}

mouseDown = (rowNo,colNo) => {
    console.log("Mouse Down")
    const { grid } = this.state;
    let newGrid = toggleWall(grid,rowNo,colNo);
    this.setState({ grid : newGrid, wallToggle : true })
}

mouseEnter(row, col) {
    console.log("Mouse Enter")
    if (this.state.wallToggle){
    let newGrid = toggleWall(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    }
}


mouseUp() {
    console.log("Mouse Up")
    this.setState({ wallToggle: false });
}

visualizePath = (path,shortestPath) => {
    this.setState({ visitingPath : path });
    for(let i=0; i <= path.length; i++){
        if(i === path.length){
            setTimeout(() => {
                this.visualizeShortestPath(shortestPath);    
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            let node = path[i];
            if(node.isAStart === true){
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle node-itsAStart'    
            }
            else if(node.isAFinish === true){
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle node-itsAFinish'
            }
            else{
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle node-itsvisited'
            } 
        }, 10 * i);
    }
}

visualizeShortestPath = (path) => {
    this.setState({ shortestPath : path });
    for(let i = 0; i < path.length; i++){
        setTimeout(() => {
            let node = path[i];
            if(node.isAStart === true){
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle node-itsAStart'    
            }
            else if(node.isAFinish === true){
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle node-itsAFinish'
            }
            else{
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle node-itsShortest'
            }
        }, 10 * i);
        
    }
}

getPath = () => {
    let { grid, startNode, finishNode, diagonal } = this.state;
    if((startNode.row !== null) && (finishNode.col !== null)){
    let start = grid[startNode.row][startNode.col];
    let finish = grid[finishNode.row][finishNode.col];
    let path = dijkstra(grid, start, finish, diagonal);
    let shortestPath = getShortPath(finish);
    this.visualizePath(path,shortestPath);
    }
}

changeState = () => {
    let { OnIntro } = this.state;
    this.setState({ OnIntro : !OnIntro })
}

cleanGrid = () => {
    let { visitingPath, shortestPath } = this.state
    if((visitingPath !== null) && (shortestPath !== null)){
    for(let i = 0; i < visitingPath.length; i++){
        let node = visitingPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle'
    }
    for(let i = 0; i < shortestPath.length; i++){
        let node = shortestPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node-rectangle'
    }}
    this.createGrid();
    let reset = {row : null, col : null};
    this.setState({ startNode : reset, finishNode : reset})
}


    render(){
        const { grid, OnIntro } = this.state;
        return(
            <div className='grid-manage'>
                <div>
                {
                    grid.map((row,rowID) => {
                        return(
                        <div className='whole-grid' key={rowID}>
                            {
                                row.map((node,nodeID) => {
                                    return(
                                        <div 
                                        className='node-grid'
                                        key={nodeID}>
                                            <Node
                                            node={node}
                                            keydown={this.keypress}
                                            mouseDown={this.mouseDown}
                                            mouseEnter={this.mouseEnter}
                                            mouseUp={this.mouseUp}>
                                            </Node>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}) 
                }
                </div>

                <div>
                    <Cards
                    getPath = {this.getPath}
                    isItOnIntro = {OnIntro}
                    changeState = {this.changeState}
                    cleanGrid = {this.cleanGrid}
                    toggleDiagonal = {this.makeSome}/>
                </div>
                
            </div>
        )
    }
}

const toggleWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isAWall: !node.isAWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };