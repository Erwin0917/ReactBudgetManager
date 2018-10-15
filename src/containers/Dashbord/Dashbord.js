import React, { Component } from 'react';

import FastAdd from "./FastAdd/FastAdd";


class Dashbord extends Component {

    /* constructor(props){
        super(props);
    } */

    render() {
    return (
     <div className=''>
        <div className="content__header">
            <h1 className="content__header-title">Szybkie dodawanie:</h1>
            <FastAdd/>

        </div>
        <div>
            Tabela z procent wydanego przychodu / wydane do planowanego / zeszly miesiąc <br/>
            Realizacja budzetu w kategoriach<br/>
            Ostatnie wydatki - możliwość edycji<br/>
        </div>
     </div>
        )
    }
}

export default Dashbord;