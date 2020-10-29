import React from 'react';
import Name from './Nav/Name'
import Visualizer from './Visualizer/Visualizer';


export default class Index extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <Name/>
                </div>

                <div>
                    <Visualizer/>
                </div>
            </div>
        )
    }
}