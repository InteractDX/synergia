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
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import Carousel from 'react-responsive-carousel'

// var Carousel = require('react-responsive-carousel').Carousel;
//"#myCarousel"
var Gallery = Carousel.Carousel;

//create the header class
let ImageCarousal = React.createClass({
  //function will reset the containment for newly added control on designer
  //  componentDidMount: function () {
  //     this.props.data.target = '#myCarousel';
  //     this.props.data.slideindex = "0";
  //  },
  //render the html
  render() {

    let classNames = 'designer_draggable'+" "+this.props.data.div_class; //class to activate drag on designer
	let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
	let inlinestyle = styleDictionary.inlinestyle;
	let divStyle=styleDictionary.divinlinestyle;
    return (
      <div style={divStyle}
        draggable='true'
        onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
        className={classNames+ " " + this.props.data.borderClass}
        onClick={this
        .props
        .setSelectedControl
        .bind(this, this.props.data)}>
          <div
            id={this.props.data.trackid}//"myCarousel"
            className={this.props.data.mycarclass}
            data-ride="carousel"
            data-interval={this.props.data.interval * 1000}
            style={inlinestyle}>

            <ol className="carousel-indicators">
              {/*<li data-target="#myCarousel" data-slide-to="0" className="active"></li>*/}
             {this
                        .props
                        .data
                        .Carousaloptions
                        .map(function (option) {
                            return  <li  key={ID.uuid()} ></li>; //<li data-target="#myCarousel" key={option.key} ></li>;
                    })}
            </ol>

            <div className="carousel-inner" role="listbox">
              
             {this
                        .props
                        .data
                        .Carousaloptions
                        .map(function (option) {
                            return <div className="item active" key={ID.uuid()}><img src={option.Src}  key={option.key} alt="image10" width="100%" height="100%"/></div>;
                    })}

            </div>
            <a
              className="left carousel-control"
              href={this.props.data.trackid}//"#myCarousel"
              role="button"
              data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href={this.props.data.trackid}//"#myCarousel"
              role="button"
              data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>

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

ImageCarousal.properties = function (cntrlDefaultProperties) {
  var properties = Util.defaultProperties();
  var keys = Object.keys(properties);
  for (var i = 0; i<keys.length; i++) {
    cntrlDefaultProperties[keys[i]] = properties[keys[i]];
  }

  cntrlDefaultProperties['interval'] = 5;
  cntrlDefaultProperties['mycarclass'] = 'carousel slide carousalclass';
cntrlDefaultProperties['trackid'] = new Date().getTime() + '';
  
  cntrlDefaultProperties['style_display'] = 'block';
  cntrlDefaultProperties['Carousaloptions'] = [
    {
        Src: 'https://www.google.com/a/zymr.com/images/logo.gif?alpha=1&amp;service=google_default',
        Clickfunction:'',
        key: ID.uuid()
    },
    {
        Src: 'https://www.google.com/a/zymr.com/images/logo.gif?alpha=1&amp;service=google_default',
        Clickfunction:'',
        key: ID.uuid()
    }
    ];
  cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
   ['oncontextmenu','onfocus','onkeydown','onload','onmousedown','onmouseover','onmouseup','onselect','onsubmit']);
  return cntrlDefaultProperties;
}
ImageCarousal.HtmlControl_ImageCarousal=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControldivCarousal=[];

    var htmlControldivTabOpt={};
    htmlControldivTabOpt.type="div";
    htmlControldivTabOpt.id=htmlControlobj['trackid'];//"myCarousel";
    htmlControldivTabOpt['data-interval']=(htmlControlobj['interval']) * 1000;
    htmlControldivTabOpt['data-ride']="carousel"
    htmlControldivTabOpt.class="carousel slide";
    var innerControls=[];
    var ol={};
    ol.type="ol";
    ol.class="carousel-indicators";
    ol.html=[];
    for(var CarousalOptionCounter=0;CarousalOptionCounter< htmlControlobj["Carousaloptions"].length ;CarousalOptionCounter++)
    {
         var li={};
         li.type="li";
         li['data-target']=htmlControlobj['trackid'];//"myCarousel";//htmlControlobj['target'];
         li['data-slide-to']=CarousalOptionCounter;
         ol.html.push(li);
    }
    innerControls.push(ol);

    var Imagdiv={};
    Imagdiv.type="div";
    Imagdiv.class="carousel-inner";
    Imagdiv.role="listbox";
    Imagdiv.html=[];
    for(var CarousalOptionCounter=0;CarousalOptionCounter< htmlControlobj["Carousaloptions"].length ;CarousalOptionCounter++)
    {
       
        var innerdiv={};
        innerdiv.type="div";
        if(CarousalOptionCounter==0 )
        {
          innerdiv.class="item active";
        }
        else
        {
          innerdiv.class="item";
        }
        innerdiv.html=[];
        var imagesrc={};
        imagesrc.type="img";
        imagesrc.src=htmlControlobj["Carousaloptions"][CarousalOptionCounter].Src;
        imagesrc.onClick=htmlControlobj["Carousaloptions"][CarousalOptionCounter].Clickfunction;
        innerdiv.html.push(imagesrc);
        Imagdiv.html.push(innerdiv);
    }
    innerControls.push(Imagdiv);

    var a={};
    a.type="a";
    a.class="left carousel-control";
    a.href='#'+htmlControlobj['trackid'];
    a.role="button"
    a['data-slide']="prev"
    a.html=[];
    for(var CarousalOptionCounter=0;CarousalOptionCounter< htmlControlobj["Carousaloptions"].length ;CarousalOptionCounter++)
    {
         var span={};
         span.type="span";
         span.class="glyphicon glyphicon-chevron-left";
       
         a.html.push(span);
         var spanSecond={};
         spanSecond.type="span";
         spanSecond.class="sr-only";
         spanSecond.html="Previous";
         spanSecond['aria-hidden']="true";
         a.html.push(span);
    }
    innerControls.push(a);

    var a={};
    a.type="a";
    a.class="right carousel-control";
    a.href='#'+htmlControlobj['trackid'];
    a.role="button"
    a['data-slide']="next"
    a.html=[];
    for(var CarousalOptionCounter=0;CarousalOptionCounter< htmlControlobj["Carousaloptions"].length ;CarousalOptionCounter++)
    {
         var span={};
         span.type="span";
         span.class="glyphicon glyphicon-chevron-right";
         a.html.push(span);
         var spanSecond={};
         spanSecond.type="span";
         spanSecond.class="sr-only";
         spanSecond.html="Next";
         spanSecond['aria-hidden']="true";
         a.html.push(span);
    }
    innerControls.push(a);

    htmlControldivTabOpt.html=innerControls;
    htmlControldivCarousal.push(htmlControldivTabOpt);
    htmlControldiv.html=htmlControldivCarousal;

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','form','formaction','formenctype','formmethod','formnovalidate','formtarget',
    'buttontype','autofocus','disabled'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
      if(htmlPropertiesForBind.indexOf(key)>=0)
      {
        if(htmlControlobj[key]&&htmlControlobj[key]!="")
        {
          htmlControldivCarousal[key]=htmlControlobj[key];
        }
      }
    })

    htmlControldiv.html = htmlControldivCarousal;
     var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
     if(inlineStyle!="")
      htmlControldiv.style=inlineStyle;
	   if(htmlControlobj["div_class"]!="")
      htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = ImageCarousal;