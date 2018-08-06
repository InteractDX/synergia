/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Kuldeep.Bhatt, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'
import ID from '../common/UUID.js';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import Donut3D from '../common/Donut3D.js'
import Line from '../common/Line.js'
import Area from '../common/Area.js'
import Bar from '../common/Bar.js'


//create the header class
let Graph = React.createClass({

    //function will reset the containment for newly added control on designer
    componentDidMount: function () {
        //meta-data
        
        switch(this.props.data.charttype){
            case 'Donut':{
                this.drawDonutChart();
            }
            break;
            case 'Pie':{
                //this.drawLineChart();
            }
            break;
            case 'Line':{
                this.drawLineChart();
            }
            break;
            case 'Area':{
                this.drawAreaChart();
            }

            break;
            case 'Bar':{
                this.drawBarChart();
            }
            break;
        }
        
    },
    drawDonutChart(){
        Donut3D(this.props.data.xRadius,this.props.data.yRadius,this.props.data.xTopRadius,this.props.data.yTopRadius,this.props.data.innerRadius,this.props.data.drilldown0,this.props.data.drilldown1,this.props.data.drilldown2,this.props.data.drilldown3, this.props.data.chartTrackid,JSON.stringify(this.props.data.colorOptions),this.props.globaldata,this.props.data.charttitle,this.props.data.showlegends,this.props.data.showtooltip,this.props.data.legenalignment,this.props.data.tooltipgroup,this.props.data.valueby,this.props.data.xaxistitle,this.props.data.yaxistitle);
    },
    drawLineChart(){
        Line(this.props.data.drilldown0,this.props.data.drilldown1,this.props.data.drilldown2,this.props.data.drilldown3, this.props.data.chartTrackid,this.props.data.colorOptions,this.props.globaldata,this.props.data.charttitle,this.props.data.showlegends,this.props.data.showtooltip,this.props.data.legenalignment,this.props.data.tooltipgroup,this.props.data.valueby,this.props.data.xaxistitle,this.props.data.yaxistitle);
    },
    drawBarChart(){
        Bar(this.props.data.drilldown0,this.props.data.drilldown1,this.props.data.drilldown2,this.props.data.drilldown3, this.props.data.chartTrackid,this.props.data.colorOptions,this.props.globaldata,this.props.data.charttitle,this.props.data.showlegends,this.props.data.showtooltip,this.props.data.legenalignment,this.props.data.tooltipgroup,this.props.data.valueby,this.props.data.xaxistitle,this.props.data.yaxistitle);
    },
    drawAreaChart(){
        Area(this.props.data.drilldown0,this.props.data.drilldown1,this.props.data.drilldown2,this.props.data.drilldown3, this.props.data.chartTrackid,this.props.data.colorOptions,this.props.globaldata,this.props.data.charttitle,this.props.data.showlegends,this.props.data.showtooltip,this.props.data.legenalignment,this.props.data.tooltipgroup,this.props.data.valueby,this.props.data.xaxistitle,this.props.data.yaxistitle);
    },
    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;

        return (
            <div style={divStyle} draggable='true' onDragStart={this
                .props
                .dragStart
                .bind(this, this.props.data)}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <div className="chart-container" id={this.props.data.chartTrackid} key={this.props.data.jsonkey} value={this.props.data.innerRadius}  name={this.props.data.charttype} style={inlinestyle}>
                     <svg x={this.props.data.xTopRadius} y={this.props.data.yTopRadius} rx={this.props.data.xRadius} ry={this.props.data.yRadius}></svg>
                 <span
                 className="glyphicon glyphicon-upload delete-icon"
                onClick={this
                .props
                .moveUpcontrol
                .bind(this, this.props.data)}></span>
                <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
            </div>
        )
    }
});
//set the control default properties
Graph.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['content'] = 'Graph';
    cntrlDefaultProperties['controlid'] = 'chart';
    cntrlDefaultProperties['xRadius'] = '150';
    cntrlDefaultProperties['yRadius'] = '129';
    cntrlDefaultProperties['xTopRadius'] = '150';
    cntrlDefaultProperties['yTopRadius'] = '129';
    cntrlDefaultProperties['chartTrackid'] = "chart_" + new Date().getTime() + '';
 cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['innerRadius'] = '.4';
    cntrlDefaultProperties['drilldown0'] = '';
    cntrlDefaultProperties['drilldown1'] = '';
    cntrlDefaultProperties['drilldown2'] = '';
    cntrlDefaultProperties['drilldown3'] = '';
    
    cntrlDefaultProperties['charttype'] = 'Donut';
    cntrlDefaultProperties['charttitle'] = 'Default chart';
    cntrlDefaultProperties['xaxistitle'] = 'Value';
    cntrlDefaultProperties['yaxistitle'] = 'Time(%)';

    cntrlDefaultProperties['showlegends'] = true;
    cntrlDefaultProperties['showtooltip'] = true;
    cntrlDefaultProperties['tooltipgroup'] = false;
    cntrlDefaultProperties['legenalignment'] = 'Vertical';
    cntrlDefaultProperties['valueby'] = 'Percentage';

    cntrlDefaultProperties['style_color'] = '';
    cntrlDefaultProperties['style_fill'] = 'blue';
    cntrlDefaultProperties['style_backgroundcolor'] = '';
    cntrlDefaultProperties['div_stylewidth'] = '100%';
    cntrlDefaultProperties['colorOptions'] = [
       {
           Color: '#FFFFFF',
           value:'Savings',
           legendvalue:'Savings',
            key: ID.uuid()
       }, {
           Color: '#000000',
           value:'Balance',
           legendvalue:'Balance',
            key: ID.uuid()
       }
    ];
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onload','onmousedown','onmouseover','onmouseup','onselect','onsubmit','onunload']);
    return cntrlDefaultProperties;
}



Graph.HtmlControl_Graph=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
     var inlineJsfunctions='';
    var htmlControlGraph={};
    htmlControlGraph.type="div";
var localJson={};
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title','class','disabled'];

    var innerGraphHtml=[];
    var divChartContainer={};
    divChartContainer.type="div";
    divChartContainer.id="chart";
    divChartContainer.name=htmlControlobj["charttype"];
    var charttype=htmlControlobj["charttype"];

    var functionname;
   var drilldown0 = htmlControlobj["drilldown0"];
    var drilldown1 = htmlControlobj["drilldown1"];
    var drilldown2 = htmlControlobj["drilldown2"];
    var drilldown3 = htmlControlobj["drilldown3"];
    // if(drilldown0 == "")
    // {
    //     drilldown0="";
    // }
    // if(drilldown1 == "")
    // {
    //     drilldown1="";
    // }
    // if(drilldown2 == "")
    // {
    //     drilldown2="";
    // } 
    // if(drilldown3 == "")
    // {
    //     drilldown3="";
    // }
    var chartTrackid = htmlControlobj["chartTrackid"];
    var coloroptions = htmlControlobj["colorOptions"];

    var charttitle = htmlControlobj["charttitle"];

    var xaxistitle = htmlControlobj["xaxistitle"] || 'X';
    var yaxistitle = htmlControlobj["yaxistitle"] || 'Y';

    var showlegends = htmlControlobj["showlegends"];
    var showtooltip = htmlControlobj["showtooltip"];
    var legenalignment = htmlControlobj["legenalignment"];
    var tooltipgroup = htmlControlobj["tooltipgroup"];
    var valueby = htmlControlobj['valueby'];

    switch(charttype){
        case 'Donut':{
            var xrad = htmlControlobj["xRadius"];
            var yRadius = htmlControlobj["yRadius"];
            var xTopRadius = htmlControlobj["xTopRadius"];
            var yTopRadius = htmlControlobj["yTopRadius"];
            var innerRadius = htmlControlobj["innerRadius"];
            
            functionname = 'Donut3D(' + xrad + ',' + yRadius + ',' + xTopRadius + ',' + yTopRadius + ',' + innerRadius + ','+ "'"  + drilldown0 +  "'" +','+ "'" + drilldown1 + "'" + ',' + "'"  + drilldown2 +  "'" +','+  "'"+ drilldown3 + "'" + ',' +  "'"+ chartTrackid + "'" + ',' +  JSON.stringify(coloroptions) +  ',' + JSON.stringify(localJson) + ',' + "'" + charttitle + "'" + ',' + showlegends + ',' + showtooltip + ',' + "'" + legenalignment + "'" +  ',' + tooltipgroup +',' + "'" + valueby + "'" +',' + "'" + xaxistitle + "'"  +',' + "'" + yaxistitle + "'" +')';
        }
        break;
        case 'Line':{
            functionname = 'Line(' +  "'" + drilldown0 + "'" + ','+ "'"  + drilldown1 +  "'" +','+ "'"  + drilldown2 +  "'" +','+  "'"+ drilldown3 + "'" + ',' +  "'"+ chartTrackid + "'" + ',' +  JSON.stringify(coloroptions) + ',' + JSON.stringify(localJson) + ',' + "'" + charttitle + "'" + ',' + showlegends + ',' + showtooltip + ',' + "'" + legenalignment + "'" + ',' + tooltipgroup + ',' + "'" + valueby + "'" +',' +  "'" + xaxistitle + "'" +',' + "'" + yaxistitle + "'" +')';
        }
        break;
        case 'Area':{
            functionname = 'Area(' +  "'" + drilldown0 + "'" + ','+ "'"  + drilldown1 +  "'" +','+ "'"  + drilldown2 +  "'" +','+  "'"+ drilldown3 + "'" + ',' +  "'"+ chartTrackid + "'" + ',' +  JSON.stringify(coloroptions) + ',' + JSON.stringify(localJson) + ',' + "'" + charttitle + "'" + ',' + showlegends + ',' + showtooltip + ',' + "'" + legenalignment + "'" + ',' + tooltipgroup + ',' + "'" + valueby + "'" +',' + "'" + xaxistitle + "'" +',' + "'" + yaxistitle + "'" + ')';
            
        }

        break;
        case 'Bar':{
            functionname = 'Bar(' +  "'" + drilldown0 + "'" + ','+ "'"  + drilldown1 +  "'" +','+ "'"  + drilldown2 +  "'" +','+  "'"+ drilldown3 + "'" + ',' +  "'"+ chartTrackid + "'" + ',' +  JSON.stringify(coloroptions) +  ',' + JSON.stringify(localJson) + ','+ "'" + charttitle + "'" + ',' + showlegends + ',' + showtooltip + ',' + "'" + legenalignment + "'" + ',' + tooltipgroup + ',' + "'" + valueby + "'"  +',' + "'" + xaxistitle + "'" +',' + "'" + yaxistitle + "'" + ')';
        }
        break;
    }

    var globaljsonAPIURL = ($("#globaljsonurlfield").val()).trim();
    var callback = 'function(data,status){if(status == "success"){window.globaljsonurl="' + globaljsonAPIURL+ '";'+ functionname + ';}'
    var fetchglobaljson;
    var docreadyfun;

    if(globaljsonAPIURL.length > 0){
        fetchglobaljson = '$.get(' + "\'" + globaljsonAPIURL + "\'" + ',' + callback;
        docreadyfun = '$(document).ready(function(){' + fetchglobaljson + '});});';
    }
    else {
        fetchglobaljson = functionname;
         docreadyfun = '$(document).ready(function(){' + fetchglobaljson + '});';
    }
    

    var result=InlineStyleHelper.AllocateEvents(htmlControlobj,divChartContainer,docreadyfun);
    divChartContainer=result.htmlControl;
    inlineJsfunctions=result.inlineJsfunctions;
    divChartContainer.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
    divChartContainer.class = "chart-container";

    var svgControl={};
    svgControl.type="svg";
    divChartContainer.html=svgControl;
    innerGraphHtml.push(divChartContainer);

    var divTooltip={};
    divTooltip.type="div";
    divTooltip.id="tooltip"+chartTrackid;
    divTooltip.class='graphtooltip';
    
    var titleParagraph={};
    titleParagraph.type="p";
    var titleSpan={};
    titleSpan.type="span";
    titleSpan.id="title"+chartTrackid;
    titleParagraph.html=titleSpan;

    var valueParagraph={};
    valueParagraph.type="p";
    var valueSpan={};
    valueSpan.type="span";
    valueSpan.id="title"+chartTrackid;
    valueParagraph.html=valueSpan;
    divTooltip.html=[titleParagraph,valueParagraph];
    if(showtooltip)
    {
        innerGraphHtml.push(divTooltip);
    }

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlGraph[key]=htmlControlobj[key];
            }
        }
    })

    htmlControlGraph["id"]=htmlControlobj["chartTrackid"]; 
    htmlControlGraph.html=innerGraphHtml ; 
    htmlControldiv.html=htmlControlGraph;
     var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;
	 if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Graph;