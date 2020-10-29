import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class Cards extends React.Component{
    render(){
        let { isItOnIntro } = this.props;
        return(
            <div >

            <Card
                bg='light'
                text= 'dark'
                style={{ width: '22rem' }}
                className="mb-2">
        
        <Card.Header>{(isItOnIntro) ? ('Introduction') : ('Visualize')}</Card.Header>
                <Card.Body>
                <Card.Title>{(isItOnIntro) ? ('Intro to using this Visualizer') : ('Setting')}</Card.Title>
                <Card.Text>
                {(isItOnIntro) ? (<div>
                        <ul>
                            <li>You can only visualize path if you have start node (Green) and end node (Red).</li><br/>
                            <li>To create a start node, click on any node to focus and press "s".</li><br/>
                            <li>To create a end node, click on any node to focus and press "e".</li><br/>
                            <li>Here is the fun part, you can also create walls.</li><br/>
                            <li>To create walls just left click the mouse and drag and to remove walls is similar to creating it!</li><br/>
                        </ul>
                        <Button style={{ marginLeft : '4px' }} variant="outline-dark" onClick={this.props.changeState}>Setting</Button> 
                        <Button style={{ marginLeft : '4px' }} variant="outline-dark" onClick={this.props.getPath}>Visualize</Button></div>) : 
                        (<div>
                            <br/>
                            Clear Grid <Button style={{ marginLeft : '4px' }} variant="outline-dark" onClick={this.props.cleanGrid}>Clear</Button>
                            <br/><br/>
                            Diagonal <input style = {{marginLeft : '7px', marginRight : '3px'}} type='checkbox' onClick={this.props.toggleDiagonal}></input> (Kinda Glitchy)<br/><br/><br/>
                            <Button style={{ marginLeft : '4px' }} variant="outline-dark" onClick={this.props.changeState}>Intro</Button>
                            <Button style={{ marginLeft : '20px' }} variant="outline-dark" onClick={this.props.getPath}>Visualize</Button>
                        </div>)}
                </Card.Text>
                </Card.Body>
            </Card>

            </div>
        )
    }
}
