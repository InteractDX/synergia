/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Hiren.Nariya, Zymr
*******************************************************/

/*
Component for toolbox item
*/

import React from 'react';

export default class ToolboxItem extends React.Component {
 
 dragItem(e) {
    if(!e)
       e = window.event;   
   e.dataTransfer.setData("Text", e.target.id);
 }
render() {
    return (
      <li  id={this.props.data.key} 
     onDragStart={this.dragItem.bind()}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        draggable={this.props.data.isdragable}
        className='toolboxcontrol'>
        <i className={this.props.data.icon}></i>{this.props.data.name}</li>
    )
  }
}