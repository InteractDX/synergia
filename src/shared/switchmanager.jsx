/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/
/*
 Contain form preview for designing
*/
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
import Forms from '../formbuildercontrols/formscontrol.jsx';
import Canvas from '../formbuildercontrols/canvascontrol.jsx';
import Tab from '../formbuildercontrols/tabcontrol.jsx';
import Panel from '../formbuildercontrols/panelcontrol.jsx';
import Table from '../formbuildercontrols/tablecontrol.jsx';
import ListGroup from '../formbuildercontrols/listgroupcontrol.jsx';
import Navbar from '../formbuildercontrols/navigationcontrol.jsx';
import Toolbox from '../toolbox.jsx';
import FBIcon from '../formbuildercontrols/facebookcontrol.jsx';
import TWIcon from '../formbuildercontrols/twittercontrol.jsx';
import YouTubeIcon from '../formbuildercontrols/youtubecontrol.jsx';
import ImageCarousal from '../formbuildercontrols/carousalcontrol.jsx';
import YouTubeEmbed from '../formbuildercontrols/youtubeembedcontrol.jsx';
// import carousalstyles  from './auriocarousal.css'; import carousalstyles from
// '/Users/kuldeep.b/KDs
// All/Projects/AurioPro/code/aurionpro-designer-tool/css/aurioncarousal.css'

class SwitchManager extends React.Component
{
    getdroppedcomponent(item,component){
    switch (item.element) {
        case 'Header':
        return <Header
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
            
        case 'Label':
        return <Label
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "Paragraph":
        return <Paragraph
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "LineBreak":
        return <LineBreak
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            key={item.id}/>
        case "Dropdown":
        return <Dropdown
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "Tags":
        return <Tags
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            key={item.id}/>
        case "Checkboxes":
        return <Checkboxes
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "RadioButtons":
        return <RadioButtons
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "TextInput":
        return <TextInput
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "NumberInput":
        return <NumberInput
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "TextArea":
        return <TextArea
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "Image":
        return <Image
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            editModeOn={component.props.editModeOn}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "ImageCarousal":
        return <ImageCarousal
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            editModeOn={component.props.editModeOn}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "FBIcon":
        return <FBIcon
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            editModeOn={component.props.editModeOn}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "TWIcon":
        return <TWIcon
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            editModeOn={component.props.editModeOn}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "YouTubeIcon":
        return <YouTubeIcon
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            editModeOn={component.props.editModeOn}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "YouTubeEmbed":
        return <YouTubeEmbed
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            editModeOn={component.props.editModeOn}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "Rating":
        return <Rating
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            key={item.id}/>
        case "DatePicker":
        return <DatePicker
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            key={item.id}/>
        case "HyperLink":
        return <HyperLink
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "Download":
        return <Download
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            key={item.id}/>
        case "Range":
        return <RangeControl
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            editModeOn={component.props.editModeOn}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            key={item.id}/>
        case "Button":
        return <Button
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "ButtonGroup":
        return <ButtonGroup
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "GoogleMap":
        return <GoogleMap
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "Graph":
        return <Graph
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "Tab":
        return <Tab 
            mutable={false}
            parent={component}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            saveNavigationTabData={component.saveNavigationTabData} 
            getNavigationTabRowNumbers={component.getNavigationTabRowNumbers}
            loadDataAsPerNavigationTab={component.loadDataAsPerNavigationTab}
            key={item.id}/>
        case "Navbar":
        return <Navbar 
            mutable={false}
            parent={component}
            data={item} 
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id} saveNavigationData={component.saveNavigationData}
            loadDataAsPerNavigation={component.loadDataAsPerNavigation}/>
        case "Forms":
        return <Forms
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

        case "Panel":
        return <Panel
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
            
        case "Table":
        return <Table
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "ListGroup":
        return <ListGroup
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>
        case "LoginForm":
            return <LoginForm
            mutable={false}
            parent={component.props.parent}
            data={item}
            dragStart={component.dragStart}
            setSelectedControl={component.setSelectedControl}
            isDraggable={true}
            removecontrol={component.removecontrol}
            clonecontrol = {component.clonecontrol}
            moveUpcontrol = {component.moveUpcontrol}
            moveDowncontrol = {component.moveDowncontrol}
            key={item.id}/>

    }
  }
  getdroppedcomponentproperties(dropedcontrolid){
    var elementOptions = {};
    switch (dropedcontrolid) {
           case "Header":
            elementOptions = Header.properties(elementOptions);
            break;
           case "Label":
            elementOptions = Label.properties(elementOptions);
            break;
           case "Paragraph":
            elementOptions = Paragraph.properties(elementOptions);
            break;
           case "LineBreak":
            elementOptions = LineBreak.properties(elementOptions);
            break;
           case "Dropdown":
            elementOptions = Dropdown.properties(elementOptions);
            break;
           case "Tags":
             elementOptions = Tags.properties(elementOptions);
             break;
           case "Checkboxes":
             elementOptions = Checkboxes.properties(elementOptions);
             break;
           case "RadioButtons":
             elementOptions = RadioButtons.properties(elementOptions);
             break;
           case "TextInput":
             elementOptions = TextInput.properties(elementOptions);
             break;
           case "NumberInput":
              elementOptions = NumberInput.properties(elementOptions);
              break;
           case "TextArea":
              elementOptions = TextArea.properties(elementOptions);
              break;
           case "Image":
              elementOptions = Image.properties(elementOptions);
              break;
           case "Rating":
              elementOptions = Rating.properties(elementOptions);
              break;
           case "DatePicker":
               elementOptions = DatePicker.properties(elementOptions);
               break;
           case "HyperLink":
               elementOptions = HyperLink.properties(elementOptions);
               break;
           case "Download":
               elementOptions = Download.properties(elementOptions);
               break;
           case "Range":
               elementOptions = RangeControl.properties(elementOptions);
                break;
            case "Button":
                elementOptions = Button.properties(elementOptions);
                break;
            case "ButtonGroup":
                elementOptions = ButtonGroup.properties(elementOptions);
                break;

            case "GoogleMap":
                elementOptions = GoogleMap.properties(elementOptions);
                break;
            case "Graph":
               elementOptions = Graph.properties(elementOptions);
                break;
            case "Forms":
                elementOptions = Forms.properties(elementOptions);
                break;
            case "Canvas":
                elementOptions = Canvas.properties(elementOptions);
                break;
            case "Tab":
                elementOptions = Tab.properties(elementOptions);
                break;
            case "Navbar":
                elementOptions = Navbar.properties(elementOptions);
                break;
            case "Panel":
                elementOptions = Panel.properties(elementOptions);
                break;
            case "Table":
                elementOptions = Table.properties(elementOptions);
                break;
            case "ListGroup":
                elementOptions = ListGroup.properties(elementOptions);
                break;
            case "FBIcon":
                elementOptions = FBIcon.properties(elementOptions);
                break;
            case "TWIcon":
                elementOptions = TWIcon.properties(elementOptions);
                break;
            case "YouTubeIcon":
                elementOptions = YouTubeIcon.properties(elementOptions);
                break;
            case "ImageCarousal":
                elementOptions = ImageCarousal.properties(elementOptions);
                break;
            case "YouTubeEmbed":
                elementOptions = YouTubeEmbed.properties(elementOptions);
                break;
            case "Section":
                elementOptions = Section.properties(elementOptions);
                sectionColumnDivOptions = SectionColumnDiv.properties(sectionColumnDivOptions);
                sectionColumnDivOptions['id'] = ID.uuid();
                sectionColumnDivOptions['element'] = "SectionColumn";
                sectionColumnDivOptions.htmlControls = [];
                sectionColumnDivOptions.columnnumber = 0;
                break;
            case "LoginForm":
                elementOptions = LoginForm.properties(elementOptions);
                break;
          }
          return elementOptions;
  }
}
//Export the module
module.exports = SwitchManager;