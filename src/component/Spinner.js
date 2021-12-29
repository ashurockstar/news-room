import React, { Component } from 'react';
import loader from '../assets/loader.gif';

export default class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loader} alt='loader' width="300" height="300" />
            </div>
        )
    }
}
