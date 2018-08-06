/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Harsh.Raval, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'

//create the header class
let GoogleMap = React.createClass({
    map: undefined, marker: undefined,

    //function will reset the containment for newly added control on designer
    componentDidMount: function () {
        if (document.getElementById(this.props.data.trackid)) {
            let uluru = {
                lat: parseFloat(this.props.data.lat),
                lng: parseFloat(this.props.data.long)
            };
            if (!this.map) {
                this.map = new google
                    .maps
                    .Map(document.getElementById(this.props.data.trackid), {
                        zoom: 4,
                        center: uluru
                    });
                this.marker = new google
                    .maps
                    .Marker({position: uluru, map: this.map});
            } else {
                this
                    .marker
                    .setPosition(uluru);
            }
        }
    },
   
    deleteControl: function(e){
        e.currentTarget.closest("div").remove();
    },
    
    //render the html
    render: function () {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        return (
            <div draggable='true' onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
                style={divStyle}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <div
                    className="gmap-container"
                    title={this.props.data.title}
                    style={inlinestyle}
                    id={this.props.data.trackid}>
                </div>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }
});
//set the control default properties
GoogleMap.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['jsonlat'] = 'LAT';
    cntrlDefaultProperties['jsonlong'] = 'LONG';
    cntrlDefaultProperties['trackid'] = new Date().getTime() + '';
    cntrlDefaultProperties['lat'] = '-25.363';
    cntrlDefaultProperties['long'] = '131.044';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
        ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
        'onkeyup','onload','onmousedown','onmouseover','onmouseup','onselect','onsubmit','onunload']);
    return cntrlDefaultProperties;
};

GoogleMap.HtmlControl_GoogleMap=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlGoogleMap={};
    htmlControlGoogleMap.type="div";

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','form','formaction','formenctype','formmethod','formnovalidate','formtarget',
    'buttontype','autofocus','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlGoogleMap[key]=htmlControlobj[key];
            }
        }
    })
    htmlControlGoogleMap["id"]=htmlControlobj["trackid"];
    htmlControlGoogleMap["value"]=htmlControlobj["content"];
    htmlControlGoogleMap["class"]="gmap-container";
    htmlControldiv.html=htmlControlGoogleMap;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
	var prefferedlat = htmlControlobj["jsonlat"] ? ('window.latitude') : (htmlControlobj['lat']);
    var prefferedlong = htmlControlobj["jsonlong"] ? ('window.longitude') : (htmlControlobj['long']);

    var keynamelat = "'" + htmlControlobj["jsonlat"] + "'";
    var keynamelong = "'" + htmlControlobj["jsonlong"]+ "'";

    window.latkeyname = keynamelat;
    window.longkeyname = keynamelong;

    window.latitude = htmlControlobj['lat'];
    window.longitude = htmlControlobj['long'];

    window.trackid = htmlControlobj.trackid;
    
    var inlinejs = inlineJsfunctions;
    var utilityfunctions = inlinejs;

    // inlineJsfunctions=inlineJsfunctions+"  $(document).ready(function(){ window.latitude =" + "data["+ keynamelat +"];window.longitude =" + "data["+keynamelong+"];var keynamelong =  loadMap"+htmlControlobj.trackid+"();}); function loadMap"+htmlControlobj.trackid+"() {  if (document.getElementById("+htmlControlobj.trackid+")){let uluru = {lat: parseFloat(" +prefferedlat+"),lng: parseFloat("+ +prefferedlong+")};if (!this.map) {this.map = new google.maps.Map(document.getElementById("+htmlControlobj.trackid+"), {zoom: 4,center: uluru});this.marker = new google.maps.Marker({position: uluru, map: this.map});}else {this.marker.setPosition(uluru);}}}";
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = GoogleMap;