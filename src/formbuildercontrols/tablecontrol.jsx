/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
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
import ReactDOM from 'react-dom';

var tableHeaders=[];
var apiResponseData=[];
var PropsSetOrChangeMixin = {
  componentWillMount: function() {
    this.onPropsSetOrChange(this.props);
  }
};

//create the header class
var Table = React.createClass({

   mixins: [PropsSetOrChangeMixin],
   onPropsSetOrChange: function(props) {   
   //tableData=this.props.data.datadetails;
    var tbData=[]; 
    var dataFound=false;    
    if(this.props.data.tabledatabind!=''&&this.props.data.previousDataBind!=this.props.data.tabledatabind)
    {
      this.props.data.previousDataBind=this.props.data.tabledatabind;
      var jsonFileds=this.props.data.tabledatabind.split(".");
      var tempData={};
      for (var i = 0; i < jsonFileds.length; i++) {
        if(i==0)
        {
          tempData= apiResponseData[jsonFileds[i]];
        }
        else
        {
          tempData=tempData[jsonFileds[i]];;
        }
      } 
      if(tempData)
       tbData=tempData;
      else
       tbData=[];
      //tbData=apiResponseData[this.props.data.tabledatabind];      
    }
    else if(this.props.data.tabledatabind==''&&this.props.data.jsondata!=''&&
    this.props.data.jsondata.length>0)
    {
      tbData=eval(this.props.data.jsondata) ;
    }
    if(tbData)
      {
        if(tbData.length>0)
        {
           var headers=[];
           for (var name in tbData[0]) {
               var headerdata={
                   datafield:name,
                   headertext:name,
                   sortable:false,
                   isgroupby:false,
                   showcolumn:true,
                   datavisible:true,
                   colspan:'',
                   groupheading:''
               }
               headers.push(headerdata);
            }
            this.props.data.tableheaders=headers;
            this.props.data.tableData=tbData;
        }
      }
   },
   componentDidMount() { 
     var el = ReactDOM.findDOMNode(this.refs[this.props.data.controlid]);    
     $("#"+this.props.data.controlid+"[data-key='"+el.getAttribute("data-key")+"']").bootstrapTable({
                data: this.props.data.tableData
        });
    if(this.props.globaldata) {
      if( Object.keys(this.props.globaldata).length > 0 && this.props.globaldata!= null)
      {
        apiResponseData=this.props.globaldata;
      }
    }
    var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
    if(url && url!='')
    {
        var xhttp = new XMLHttpRequest();
        var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
        xhttp.open("GET", url, true);
        xhttp.send();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            apiResponseData = JSON.parse(this.response);
          } else {
            //do nothing for now
          }
        }
    }
   },
  getTableHeader(option,type) {
    if(type=='normal') {
      return (
        <th key={ID.uuid()} data-field={option.datafield} data-visible={option.datavisible}
      data-radio={option.dataradio}  data-checkbox={option.datacheckbox}   data-sortable={option.sortable}>{option.headertext}</th>
      )
    }
    else {
      return (
        <th key={ID.uuid()} colSpan={option.colspan} >{option.headertext}</th>
      )
    }
  },
  getTableHeaderRow(options) {
    if(options.length>0) {
      return(
        <tr>				 
      {options
       .map(function (option) {
         return this.getTableHeader(option,option.coltype);
      },this)}
      </tr>
      )
    }
  },
  renderTableHeaders(tblHeaderData,headerClass)
  {
    let isColspan=false;
    let colUnderColspan=[];
    let currentColNumber=0;
    tblHeaderData.map(function (option) {
      if(option.colspan!='') {
      isColspan =true;
      for(var i=0;i<parseInt(option.colspan);i++) {
        if(colUnderColspan.indexOf(currentColNumber+i)<0) {
          colUnderColspan.push(currentColNumber+i);
        }
      }
    }
    currentColNumber++;
    });
   let normalHeaders=[];
   let colspanHeaders=[];
   if(isColspan) {
     let headerCounter=0;
      tblHeaderData.map(function (option) {
        if(option.colspan!='') {
          let colSpanOption={'headertext':option.groupheading,
          'colspan':option.colspan,'coltype':'colspan'};
          colspanHeaders.push(colSpanOption);
        }
        if(colUnderColspan.indexOf(headerCounter)>=0) {
          normalHeaders.push(option);
        }
        else {
          colspanHeaders.push(option);
        }
        headerCounter++;
      });

   }
   else {
     tblHeaderData.map(function (option) {
       option.coltype='normal';
       normalHeaders.push(option);
     });
   }
    return(
       <thead className={headerClass}>
      {this.getTableHeaderRow(colspanHeaders)}
       {this.getTableHeaderRow(normalHeaders)}
      
       </thead>
    );
  },
  //render the html
  render() {
    let classNames = 'designer_draggable'; //class to activate drag on designer  
	  let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
    let inlinestyle = styleDictionary.inlinestyle;
    let divStyle=styleDictionary.divinlinestyle;
    let displaygroupradio=this.props.data.datashowgrouponoffcontrol;
    if(displaygroupradio==true||displaygroupradio=='true')displaygroupradio=true;
    else displaygroupradio=false;
    return (
      <div style={divStyle}
        draggable='true'
        onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
        className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
        onClick={this
        .props
        .setSelectedControl
        .bind(this, this.props.data)}>
        <div>
          <div className="form-inline"
           style={{display:displaygroupradio==true?'block':'none'}} role="form">
           <lable> <input type="radio"/><span>Show All</span></lable>
           <lable>  <input type="radio"/><span>Show Group</span></lable>
          </div>
         </div>
          <table ref={this.props.data.controlid} id={this.props.data.controlid} data-group-by={this.props.data.datagroupby}  
          data-key={this.props.data.controlid} data-striped={this.props.data.datastriped} 
          data-show-print={this.props.data.datashowprint}
          data-cache={this.props.data.datacache} data-page-size={this.props.data.datapagesize}
           data-classes={this.props.data.dataclasses}
          data-height={this.props.data.dataheight}
          data-group-by-field={this.props.data.datagroupbyfield} data-search={this.props.data.datasearch}  
          data-show-columns={this.props.data.datashowcolumns}   data-show-toggle={this.props.data.datashowtoggle}
           data-pagination={this.props.data.datapagination} data-show-refresh={this.props.data.datashowrefresh}>
           
             {this.renderTableHeaders(this.props.data.tableheaders,this.props.data.tableheadersclass)}
             
           
        </table>
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
        <span
          className="glyphicon glyphicon-copy"
          onClick={this
          .props
          .clonecontrol
          .bind(this, this.props.data)}></span>
      </div>
    )
  }
});

//set the control default properties
Table.properties = function (cntrlDefaultProperties) {
    // var properties = Util.defaultProperties();
    // var keys = Object.keys(properties);
    // for (var i = 0; i<keys.length; i++) {
    //   cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    // }
  cntrlDefaultProperties['borderClass'] = '';  
  cntrlDefaultProperties['style_borderTop'] = '';
  cntrlDefaultProperties['style_borderBottom']='';
  cntrlDefaultProperties['style_borderRight'] = '';
  cntrlDefaultProperties['style_borderLeft']='';
  cntrlDefaultProperties['controlid'] = 'table1';  
  cntrlDefaultProperties['tableheaders'] = [];
  cntrlDefaultProperties['tableheaderscolspan'] = [];
  cntrlDefaultProperties['tableheadersclass'] ='';
  cntrlDefaultProperties['datadetails'] = [];
  cntrlDefaultProperties['datadetailsobjname']='';
  cntrlDefaultProperties['dataloadchoice']="json";
  cntrlDefaultProperties['datagroupbyfield']="[]";  
  cntrlDefaultProperties["datagroupby"] =true;
  cntrlDefaultProperties["datasearch"] = true;
  cntrlDefaultProperties["datashowcolumns"]= true;
  cntrlDefaultProperties["datashowtoggle"] = true;
  cntrlDefaultProperties["datapagination"] = true;
  cntrlDefaultProperties["datashowrefresh"] = true;

  cntrlDefaultProperties["datastriped"] = true;
  cntrlDefaultProperties["datashowprint"] = true;
  cntrlDefaultProperties["datashowgrouponoffcontrol"] = false;
  cntrlDefaultProperties["datacache"] = true;
  cntrlDefaultProperties["datapagesize"] = "10";
  cntrlDefaultProperties["dataclasses"] = '';
  cntrlDefaultProperties["dataheight"] = '';
  cntrlDefaultProperties['div_stylefloat'] = 'none';
  cntrlDefaultProperties['div_stylewidth'] = '';
  cntrlDefaultProperties['div_styleheight'] = '';
  cntrlDefaultProperties['div_styleoverflow'] = 'auto';
  cntrlDefaultProperties['div_styleoverflowx'] = 'auto';
  cntrlDefaultProperties['div_styleoverflowy'] = 'auto';
  cntrlDefaultProperties['div_class'] = '';
  cntrlDefaultProperties['style_display'] = 'block';
  cntrlDefaultProperties['tabledatabind'] = '';
  cntrlDefaultProperties['tableData'] =[];
  cntrlDefaultProperties['jsondata'] = '[{"ACCOUNT":"Savings","CURRENCY":"GBP","AMOUNT":1771.42,"TYPE":"Last Transaction","COLOR":"#272822"}]';
  cntrlDefaultProperties['previousDataBind'] = '';
  cntrlDefaultProperties['rowstyle'] = '';
  cntrlDefaultProperties['rowstylefunction'] = '';
  cntrlDefaultProperties['dataformatterfunction'] = {};
  cntrlDefaultProperties['dataformatterfunctionTemp'] ='';
  cntrlDefaultProperties['dataformatterfunctionNameTemp'] = '';
  cntrlDefaultProperties['dataformatterfunctionFieldTemp'] = '';
  cntrlDefaultProperties['dataformatterfunctionExample'] = 'function amountFormatter(value) {'
  +" return \'<i class=\"glyphicon glyphicon-star\"></i>\'  + value;"
  +"}";
  cntrlDefaultProperties['rowstylefunctionexample'] = '<br/>function rowStyle(row, index)<br/> {'
  
  +'<br/>//condition for data field'
  +"<br/>if(parseInt(row.AMOUNT) > 1000)<br/>{<br/>return {'classes' : 'success' }<br/>}<br/>else<br/>{<br/>return {'classes' : 'warning' }<br/>}"
  +"<br/>}<br/>=========<br/>Or<br/>=========<br/>"
  +'function rowStyle(row, index)<br/> {'
  +'<br/>//condition without data field'
  +"<br/>if (index % 2 === 0)<br/>{<br/>return {'classes' : 'success' }<br/>}<br/>else<br/>{<br/>return {'classes' : 'warning' }<br/>}"
  +"<br/>}";
  //cntrlDefaultProperties = InlineStyleHelper.SetControlEvents(cntrlDefaultProperties, ['loadtabledata', 'loadtabledataapi']);
  return cntrlDefaultProperties;
};
Table.HtmlControl_Table = function (htmlControlobj) {
 var htmlControldiv = {};
  htmlControldiv.type = "div";
  var inlineJsfunctions = '';
  var htmlControlTable = {};
  htmlControlTable.type = "table";
  htmlControlTable.class='table table-responsive';

  var htmlPropertiesForBind = ['name','accesskey','hidden','tabindex','title','class',
  'disabled'];

  var keys = Object.keys(htmlControlobj);
  keys.forEach(function (key) {
    if (htmlPropertiesForBind.indexOf(key) >= 0) {
      if (htmlControlobj[key] && htmlControlobj[key] != "") {
        htmlControlTable[key] = htmlControlobj[key];
      }
    }
  })
  htmlControlTable["id"] = htmlControlobj["controlid"];
  htmlControlTable["value"] = htmlControlobj["content"];

  //table specific properties
  htmlControlTable["data-group-by"] = htmlControlobj["datagroupby"];
  htmlControlTable["data-search"] = htmlControlobj["datasearch"];
  htmlControlTable["data-show-columns"] = htmlControlobj["datashowcolumns"];  
  htmlControlTable["data-show-toggle"] = htmlControlobj["datashowtoggle"];  
  htmlControlTable["data-pagination"] = htmlControlobj["datapagination"];
  htmlControlTable["data-show-refresh"] = htmlControlobj["datashowrefresh"];
  htmlControlTable["data-group-by-field"] = htmlControlobj["datagroupbyfield"];

  htmlControlTable["data-striped"] = htmlControlobj["datastriped"];
  htmlControlTable["data-cache"] = htmlControlobj["datacache"];
  htmlControlTable["data-page-size"] = htmlControlobj["datapagesize"];
  htmlControlTable["data-classes"] = htmlControlobj["dataclasses"];
  htmlControlTable["data-height"] = htmlControlobj["dataheight"];
  htmlControlTable["data-show-print"] = htmlControlobj["datashowprint"];  

  var thead={};
  var theadrows=[];
  var trnormal={};
  var trcolspan={};
  var thnormal=[];
  var thcolspan=[];
  var data=htmlControlobj["tableheaders"];
  var keys = Object.keys(htmlControlobj["tableheaders"]);
  var dataFormatterFunction='';
   let isColspan=false;
    let colUnderColspan=[];
    let currentColNumber=0;
  keys.forEach(function (key) {
    if(data[key].colspan!='') {
      isColspan =true;
      for(var i=0;i<parseInt(data[key].colspan);i++) {
        if(colUnderColspan.indexOf(currentColNumber+i)<0) {
          colUnderColspan.push(currentColNumber+i);
        }
      }
    }
    currentColNumber++;
  });
  let normalHeaders=[];
  let colspanHeaders=[];
  if(isColspan) {
    let headerCounter=0;
      data.map(function (option) {
        if(option.colspan!='') {
          let colSpanOption={'headertext':option.groupheading,
          'colspan':option.colspan,'coltype':'colspan'};
          colspanHeaders.push(colSpanOption);
        }
        if(colUnderColspan.indexOf(headerCounter)>=0) {
          normalHeaders.push(option);
        }
        else {
          colspanHeaders.push(option);
        }
        headerCounter++;
      });
  }
  else{
   keys.forEach(function (key) {
       normalHeaders.push(data[key]);
     });
    }
  normalHeaders.map(function (option) {
    var header={};
    header.type="th";
    header["data-field"]=option.datafield;
    header["data-sortable"]=option.sortable;
    header["data-visible"]=option.datavisible;
    header["data-checkbox"]=option.datacheckbox;
    header["data-radio"]=option.dataradio;
    header["class"]=option.dataclass;
    header["data-align"]=option.dataalign;    
    header["data-valign"]=option.datavalign;
    if(htmlControlobj["dataformatterfunction"])
    {
      
      var dataFormatter=htmlControlobj["dataformatterfunction"];
      if(dataFormatter[option.datafield])
      {        
        var functiondetails=dataFormatter[option.datafield];        
        header["data-formatter"]=functiondetails.functionname;
        dataFormatterFunction=dataFormatterFunction+' '+functiondetails.function;
      }
    }
    header.html=option.headertext;
    thnormal.push(header);
  });
  if(isColspan) {
    colspanHeaders.map(function (option) {
    var header={};
    header.type="th";
    if(option.groupheading!='')
    {
      header["colspan"]=option.colspan;
      header.html=option.headertext;
      }
   else
    {
    header["data-field"]=option.datafield;
    header["data-sortable"]=option.sortable;
    header["data-visible"]=option.datavisible;
    header["data-checkbox"]=option.datacheckbox;
    header["data-radio"]=option.dataradio;
    header["class"]=option.dataclass;
    header["data-align"]=option.dataalign;    
    header["data-valign"]=option.datavalign;
     header.html=option.headertext;
    }
     
  
    thcolspan.push(header);
  });

  trcolspan.type="tr";
  trcolspan.html=thcolspan;
  theadrows.push(trcolspan);
  }
  trnormal.type="tr";
  trnormal.html=thnormal;
  theadrows.push(trnormal);
  thead.type="thead";
  thead.html=theadrows;
  if(htmlControlobj["tableheadersclass"]!="")
  {
    thead.class=htmlControlobj["tableheadersclass"];
  }
  htmlControlTable.html=thead;
  var tableDivControls=[];  
  var toolbardivid='';
  if(htmlControlobj["datashowgrouponoffcontrol"]==true||htmlControlobj["datashowgrouponoffcontrol"]=="true")
  {
   var toolbardiv={};
   toolbardiv.type='div';
   toolbardivid=ID.uuid();
   toolbardiv.id=toolbardivid;

   var innerDiv={};
   innerDiv.type='div';
   innerDiv.class='form-inline';
   innerDiv.role='form';
   var innerDivHtml=[];

   var showallspan={}; showallspan.type='span'; showallspan.html='Show All';
   var showallRadio={}; showallRadio.type='radio';showallRadio.name=toolbardivid;
   var lableControl={}; lableControl.type='lable';
   showallRadio.onclick="onOffTableGrouping('#"+htmlControlobj["controlid"]+"','showall');";
   var lablehtmlControl=[]; lablehtmlControl.push(showallRadio); lablehtmlControl.push(showallspan);   
   lableControl.html=lablehtmlControl;

   var showGroupspan={}; showGroupspan.type='span'; showGroupspan.html='Show Group';
   var showGroupRadio={}; showGroupRadio.type='radio';showGroupRadio.name=toolbardivid;
   var lableControl1={}; lableControl1.type='lable';
   showGroupRadio.onclick="onOffTableGrouping('#"+htmlControlobj["controlid"]+"','showgroup');";
   var lablehtmlControl=[]; lablehtmlControl.push(showGroupRadio); lablehtmlControl.push(showGroupspan);   
   lableControl1.html=lablehtmlControl;

   innerDivHtml.push(lableControl); innerDivHtml.push(lableControl1);
   innerDiv.html=innerDivHtml;
   toolbardiv.html=innerDiv;
   tableDivControls.push(toolbardiv);

   htmlControlTable["data-toolbar"]="#"+toolbardivid;
  }
 
  var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
     htmlControldiv.style=inlineStyle;

	  if(htmlControlobj["div_class"]!="")
     htmlControldiv.class=htmlControlobj["div_class"];
	 
  var loadTblData='';
  inlineJsfunctions =  inlineJsfunctions + 'window.tableid=' +  "'#" + htmlControlobj["controlid"] + "'"  + ';' + 'window.tablebinddata='+ "'" + htmlControlobj["tabledatabind"]+ "'" + ';';
  inlineJsfunctions=inlineJsfunctions+"tablebinddataArray.push('"+htmlControlobj["tabledatabind"]+"');";
  inlineJsfunctions=inlineJsfunctions+"tableidAray.push('#"+htmlControlobj["controlid"]+"');";
  inlineJsfunctions=inlineJsfunctions+"tableJsonData.push('"+htmlControlobj["jsondata"]+"');";
 // inlineJsfunctions=inlineJsfunctions+" function rowStyle(row, index) { if (index % 2 === 0){ return {classes : 'success' }} return {classes : 'warning' } }";
  if(htmlControlobj["rowstyle"]!=''&&htmlControlobj["rowstylefunction"]!='')
  {
    htmlControlTable["data-row-style"] =htmlControlobj["rowstyle"];
     inlineJsfunctions=inlineJsfunctions+" "+htmlControlobj["rowstylefunction"];
  } 
 if(dataFormatterFunction!='')
   inlineJsfunctions=inlineJsfunctions+" "+dataFormatterFunction;
   
 tableDivControls.push(htmlControlTable);
 htmlControldiv.html = tableDivControls;

 return {'htmlControl': htmlControldiv, 'inlineJsfunctions': inlineJsfunctions};

}
//export the modules
module.exports = Table;