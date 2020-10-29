export default function  dijkstra(grid,start,finish, diagonal){
    grid[start.row][start.col].distance = 0;
    let totalGrid = completeGrid(grid);
    let visitedNodes = [];
    while(!!totalGrid.length){
        sortTheGrid(totalGrid);
        console.log(totalGrid);
        let CurrentNode = totalGrid.shift();
        if( CurrentNode.isAWall === true ) continue;
        if( CurrentNode.distance === Infinity ) return visitedNodes;
        CurrentNode.isVisited = true
        visitedNodes.push(CurrentNode);
        if(CurrentNode === finish) return visitedNodes;
        updateDistanceOfNeighbor(grid, CurrentNode, diagonal);
        console.log(grid)
    }
}

function completeGrid(grid){
    let totalGrid = [];
    for(let node of grid){
        for(let nodes of node){
            totalGrid.push(nodes)
        }
    }
    return totalGrid
}

function sortTheGrid(grid){
    grid.sort((nodeA, nodeB) => ( nodeA.distance - nodeB.distance ));  // This function sorts the grid by using distance of the node, by min to max
}

function updateDistanceOfNeighbor(grid, node, diagonal){
    let neighborNode = null;
    let neighborNodeWithDiagonal = null;
    neighborNode = getNeighbbor(grid,node);
    for(let closerNode of neighborNode){
        closerNode.distance = node.distance + 1;
        closerNode.previousNode = node;
    }
    if(diagonal){
        neighborNodeWithDiagonal = getNeighbborWithDiagonal(grid,node);
        for(let closerNode of neighborNodeWithDiagonal){
            closerNode.distance = node.distance + 1.2;
            closerNode.previousNode = node;
        }
    }
}

function getNeighbbor(grid,node){
    let Neighbors = [];
    if( node.row > 0 ) Neighbors.push(grid[node.row - 1][node.col]);
    if( node.row < grid.length -1 ) Neighbors.push(grid[node.row + 1][node.col]);
    if( node.col > 0 ) Neighbors.push(grid[node.row][node.col - 1]);
    if( node.col < grid[0].length - 1 ) Neighbors.push(grid[node.row][node.col + 1]);
    console.log(Neighbors);
    return Neighbors.filter((node) => !node.isVisited);
}

function getNeighbborWithDiagonal(grid,node){
    let Neighbors = [];
    if((node.row > 0) && (node.col < grid[0].length - 1)) Neighbors.push(grid[node.row - 1][node.col + 1]);
    if((node.col > 0) && (node.row > 0)) Neighbors.push(grid[node.row - 1][node.col - 1]);
    if((node.col > 0) && (node.row < grid.length - 1)) Neighbors.push(grid[node.row + 1][node.col - 1]);
    if((node.col < grid[0].length -1) && (node.row < grid.length - 1)) Neighbors.push(grid[node.row + 1][node.col + 1]);
    console.log(Neighbors);
    return Neighbors.filter((node) => !node.isVisited);
}

export function getShortPath(endNode){
    let shortestPath = [];
    let prevNode = endNode;
    while(prevNode !== null){
        shortestPath.unshift(prevNode);
        prevNode = prevNode.previousNode;
    }
    return shortestPath;
}