/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Hiren.Nariya, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import ID from '../common/UUID.js';
let CopyPaste = React.createClass({
    render() {
        return (
            <div>
                <span
                    className="glyphicon glyphicon-upload delete-icon"
                    onClick={this
                        .props
                        .moveUpcontrol
                        .bind(this, this.props.data)}></span>
                <span
                    className="glyphicon glyphicon-download delete-icon"
                    onClick={this
                        .props
                        .moveDowncontrol
                        .bind(this, this.props.data)}></span>
                <span
                    className="glyphicon glyphicon-remove delete-icon"
                    onClick={this
                        .props
                        .removecontrol
                        .bind(this, this.props.data)}></span>
                <span className="glyphicon glyphicon-copy" onClick={this
                    .props
                    .clonecontrol
                    .bind(this, this.props.data)}></span>
            </div>
        )
    }
});
module.exports = CopyPaste;