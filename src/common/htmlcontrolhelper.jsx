/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/

import React from 'react';
import Header from '../formbuildercontrols/headercontrol.jsx';
import Label from '../formbuildercontrols/labelcontrol.jsx';
import Paragraph from '../formbuildercontrols/paragraphcontrol.jsx';
import LineBreak from '../formbuildercontrols/linebreakcontrol.jsx';
import Dropdown from '../formbuildercontrols/dropdowncontrol.jsx';
import Tags from '../formbuildercontrols/tagscontrol.jsx';
import Checkboxes from '../formbuildercontrols/checkboxescontrol.jsx';
import RadioButtons from '../formbuildercontrols/radiobuttonscontrol.jsx';
import TextInput from '../formbuildercontrols/textinputcontrol.jsx';
import NumberInput from '../formbuildercontrols/numberinputcontrol.jsx';
import TextArea from '../formbuildercontrols/textareacontrol.jsx';
import Image from '../formbuildercontrols/imagecontrol.jsx';
import Rating from '../formbuildercontrols/ratingcontrol.jsx';
import DatePicker from '../formbuildercontrols/datepickercontrol.jsx';
import HyperLink from '../formbuildercontrols/hyperlinkcontrol.jsx';
import Download from '../formbuildercontrols/downloadcontrol.jsx';
import RangeControl from '../formbuildercontrols/rangecontrol.jsx';
import Button from '../formbuildercontrols/buttoncontrol.jsx';
import ButtonGroup from '../formbuildercontrols/buttongroupcontrol.jsx';
import GoogleMap from '../formbuildercontrols/googlemapcontrol.jsx';
import Graph from '../formbuildercontrols/graphcontrol.jsx';
import Canvas from '../formbuildercontrols/canvascontrol.jsx';
import Tab from '../formbuildercontrols/tabcontrol.jsx';
import Table from '../formbuildercontrols/tablecontrol.jsx';
import ListGroup from '../formbuildercontrols/listgroupcontrol.jsx';
import FBIcon from '../formbuildercontrols/facebookcontrol.jsx';
import TWIcon from '../formbuildercontrols/twittercontrol.jsx';
import YouTubeIcon from '../formbuildercontrols/youtubecontrol.jsx';
import ImageCarousal from '../formbuildercontrols/carousalcontrol.jsx';
import YouTubeEmbed from '../formbuildercontrols/youtubeembedcontrol.jsx';
import Calendar from '../formbuildercontrols/calendarcontrol.jsx';
import QRcode from '../formbuildercontrols/QRcodecontrol.jsx';
import Barcode from '../formbuildercontrols/barcodecontrol.jsx';
import CheckboxGroup from '../formbuildercontrols/checkboxgroupcontrol.jsx';
import RadiobuttonGroup from '../formbuildercontrols/radiobuttongroupcontrol.jsx';
var HtmlControlHelper={}

class HtmlControlRenderHelper extends React.Component {
    render() {
       switch (this.props.data.element) {
        case "Header":
        return <Header clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Label":
        return <Label clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Paragraph":
        return <Paragraph clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "LineBreak":
        return <LineBreak clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Dropdown":
        return <Dropdown clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Tags":
        return <Tags clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Checkboxes":
        return <Checkboxes clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "RadioButtons":
        return <RadioButtons clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "TextInput":
        return <TextInput clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "NumberInput":
        return <NumberInput clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "TextArea":
        return <TextArea clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Image":
        return <Image clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            editModeOn={this.props.editModeOn}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "ImageCarousal":
        return <ImageCarousal clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            editModeOn={this.props.editModeOn}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "FBIcon":
        return <FBIcon clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            editModeOn={this.props.editModeOn}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "TWIcon":
        return <TWIcon clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            editModeOn={this.props.editModeOn}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "YouTubeIcon":
        return <YouTubeIcon clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            editModeOn={this.props.editModeOn}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "YouTubeEmbed":
        return <YouTubeEmbed clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            editModeOn={this.props.editModeOn}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Rating":
        return <Rating clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "DatePicker":
        return <DatePicker clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "HyperLink":
        return <HyperLink clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Download":
        return <Download clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Range":
        return <RangeControl clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            editModeOn={this.props.editModeOn}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Button":
        return <Button clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "ButtonGroup":
        return <ButtonGroup clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "GoogleMap":
        return <GoogleMap clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Graph":
        return <Graph clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Tab":
        return <Tab clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Table":
        return <Table clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "ListGroup":
        return <ListGroup clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Calendar":
        return <Calendar clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "QRcode":
        return <QRcode clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
        case "Barcode":
        return <Barcode clonecontrol = {this.props.clonecontrol}
            mutable={false}
            parent={this.props.parent}
            data={this.props.data}
            dragStart={this.props.dragStart}
            setSelectedControl={this.props.setSelectedControl}
            isDraggable={true} removecontrol={this.props.removecontrol}
            moveUpcontrol = {this.props.moveUpcontrol}
            moveDowncontrol = {this.props.moveDowncontrol}
            key={this.props.data.id}/>
    case "CheckboxGroup":
            return <CheckboxGroup
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id} />
    case "RadiobuttonGroup":
            return <RadiobuttonGroup
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id} />
     }
    }
}
HtmlControlHelper.HtmlControlRenderHelper=HtmlControlRenderHelper;
module.exports = HtmlControlHelper;
