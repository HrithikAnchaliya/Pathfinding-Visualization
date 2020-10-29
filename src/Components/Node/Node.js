import React from 'react';
import './Node.css'

export default class Node extends React.Component{
    render(){

        const { row, col, isAStart, isAFinish, isAWall } = this.props.node;
        let dynamicNode = isAStart ? 'itsAStart' : isAFinish ? 'itsAFinish' : isAWall ? 'itsAWall' : '';
        return(
            <div
            id={`node-${row}-${col}`}
            tabIndex="-1"
            className={`node-rectangle node-${dynamicNode}`}
            onKeyDown={(event)=>this.props.keydown(event,row,col)}
            onMouseDown={() => this.props.mouseDown(row,col)}
            onMouseEnter={() => this.props.mouseEnter(row,col)}
            onMouseUp={this.props.mouseUp}>
            </div>
        )
    }
}