/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Harsh.Raval, Zymr
*******************************************************/

import React from 'react';
import Filesaver from 'file-saver';
import Button from '../formbuildercontrols/buttoncontrol.jsx';
import Label from '../formbuildercontrols/labelcontrol.jsx';
import Header from '../formbuildercontrols/headercontrol.jsx';
import Image from '../formbuildercontrols/imagecontrol.jsx';
import Checkboxes from '../formbuildercontrols/checkboxescontrol.jsx';
import RadioButtons from '../formbuildercontrols/radiobuttonscontrol.jsx';
import TextInput from '../formbuildercontrols/textinputcontrol.jsx';
import NumberInput from '../formbuildercontrols/numberinputcontrol.jsx';
import TextArea from '../formbuildercontrols/textareacontrol.jsx';
import FBIcon from '../formbuildercontrols/facebookcontrol.jsx';
import TWIcon from '../formbuildercontrols/twittercontrol.jsx';
import YouTubeIcon from '../formbuildercontrols/youtubecontrol.jsx';
import YoutubeEmbed from '../formbuildercontrols/youtubeembedcontrol.jsx';
import HyperLink from '../formbuildercontrols/hyperlinkcontrol.jsx';
import Paragraph from '../formbuildercontrols/paragraphcontrol.jsx';
import GoogleMap from '../formbuildercontrols/googlemapcontrol.jsx';
import Graph from '../formbuildercontrols/graphcontrol.jsx';
import Forms from '../formbuildercontrols/formscontrol.jsx';
import Canvas from '../formbuildercontrols/canvascontrol.jsx';
import Tab from '../formbuildercontrols/tabcontrol.jsx';
import Panel from '../formbuildercontrols/panelcontrol.jsx';
import Table from '../formbuildercontrols/tablecontrol.jsx';
import ListGroup from '../formbuildercontrols/listgroupcontrol.jsx';
import Dropdown from '../formbuildercontrols/dropdowncontrol.jsx';
import ButtonGroup from '../formbuildercontrols/buttongroupcontrol.jsx';
import LoginForm from '../formbuildercontrols/loginformcontrol.jsx';
import ImageCarousal from '../formbuildercontrols/carousalcontrol.jsx';
import Navbar from '../formbuildercontrols/navigationcontrol.jsx';
import LineBreak from '../formbuildercontrols/linebreakcontrol.jsx';
import Page from '../formbuildercontrols/pagecontrol.jsx';
import Section from '../formbuildercontrols/sectioncontrol.jsx';
import Calendar from '../formbuildercontrols/calendarcontrol.jsx';
import QRcode from '../formbuildercontrols/QRcodecontrol.jsx';
import Barcode from '../formbuildercontrols/barcodecontrol.jsx';
import Collapsible from '../formbuildercontrols/collapsiblecontrol.jsx';
import Progressbar from '../formbuildercontrols/progressbarcontrol.jsx';
import InnerSection from '../formbuildercontrols/innersectioncontrol.jsx';
import CheckboxGroup from '../formbuildercontrols/checkboxgroupcontrol.jsx';
import RadiobuttonGroup from '../formbuildercontrols/radiobuttongroupcontrol.jsx';
import { updateLocale } from 'moment';
//import jszip from 'jszip';

// import SimpleFileWriter from 'simple-file-writer'

var himalaya = require('himalaya');
var toHTML = require('himalaya/translate').toHTML;
var HtmloutputGenerator = {};
var LoginURLtest="";
var encHTML="";
HtmloutputGenerator.generateHtmlOutput = function (rawHtml,data,extracss,globleCss,globlejs,
globalcolor,bgglobalcolor, 
loginForm,navigationData,navigationTabData,
isTemplateGeneration,pageProperties,datamodalpopupMapping,globaldata,gloablAPIResponseData,extraJavascript,isToolTemplateGeneration) 
{
    var numberCSS;
    var numberJS;
    var strcss;
    var strjs;
    HtmloutputGenerator.istemplate = isTemplateGeneration;
     HtmloutputGenerator.isTooltemplate = isToolTemplateGeneration;

    if(globleCss.length!=0)
    {
        numberCSS = globleCss.trim().split("\n");
        for (var i = 0; i < numberCSS.length; i++) {
         if(strcss==undefined)
        {
            strcss="<link rel='stylesheet' href='"+numberCSS[i]+"'/>";
        }
        else
        {
            strcss+="<link rel='stylesheet' href='"+numberCSS[i]+"'/>";
        }
      }
    }
    if(globlejs.length!=0)
    {
        numberJS = globlejs.trim().split("\n");
        for (var i = 0; i <  numberJS.length; i++) {
        if(strjs==undefined)
        {
            strjs="<script type='text/javascript' src='"+numberJS[i]+"'></script>";
        }
        else
        {
            strjs+="<script type='text/javascript' src='"+numberJS[i]+"'> </script>";
        }
      }
     }
    //create container div
    var htmlObject={};
    htmlObject.type="div";
    htmlObject.class="container-fluidbody";
    htmlObject.html=[];
    var inlineJsfunctions=" ";
    var pageStyle=Page.getPageInlineStyleForOutput(pageProperties);
    if(pageStyle!="")
    {
        htmlObject.style=pageStyle;
    }
    var rowIdsToIgnore=
    HtmloutputGenerator.getRowIdsToIgnoreFromPrimaryControl(navigationTabData,data);
    //fetch the row div and append to html htmlObject
    var rowObjectCanvas={};
    rowObjectCanvas.type="div";
    rowObjectCanvas.class="row canvasformid";
    rowObjectCanvas.html=[];

    if(data.length > 0){
    for(var rowCounter=0;rowCounter<data.length;rowCounter++)
    {
      if(rowIdsToIgnore.indexOf(data[rowCounter].id)<0)
      {
        var rowObject={};
        rowObject.type="div";
        rowObject.class="row";
        rowObject.html=[];
        var rowStyle=Section.getRowInlineStyleForOutput(data[rowCounter]);
        rowObject.style='';
        if(rowStyle!="")
        {
          rowObject.style=rowStyle;
        }
        if(data[rowCounter].rowbgColor)
        {
          if(rowStyle!="")
          rowObject.style=rowObject.style+" ;background-color:"+data[rowCounter].rowbgColor;
          else
          rowObject.style="background-color:"+data[rowCounter].rowbgColor;
        }      
        var tabDataHtml={};
        tabDataHtml.type="div";
        tabDataHtml.class="row";
        tabDataHtml.html=[];

        for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
        {
            var colObject={};
            colObject.type="div";
            colObject.class=data[rowCounter].columnDiv[colCounter].class;
            colObject.html=[];
            
            for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
            {
              var result=HtmloutputGenerator.generateHtmlOutputObject(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter]);
              var htmlControlObj= result.htmlControl;
              if(result.inlineJsfunctions)
                inlineJsfunctions=inlineJsfunctions+"\n"+result.inlineJsfunctions;  
              colObject.html.push(htmlControlObj);

              var elementType=data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].element;
              if(elementType=="Tab")
              {
                result=HtmloutputGenerator.generateTabControlHtml(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter],
                navigationTabData);
                htmlControlObj= result.htmlControl;
                if(result.inlineJsfunctions)
                inlineJsfunctions=inlineJsfunctions+"\n"+result.inlineJsfunctions;  

              // rowObject.html.push(htmlControlObj);
              tabDataHtml.html.push(htmlControlObj);
              }
            }
            rowObject.html.push(colObject);
        }
        if(tabDataHtml.html.length>0) {
          var tabDataHtmlColumn={};
          tabDataHtmlColumn.type="div";
          tabDataHtmlColumn.class="col-xs-12";
          tabDataHtmlColumn.html=[];
          tabDataHtmlColumn.html.push(tabDataHtml);
          rowObject.html.push(tabDataHtmlColumn);
        }
        rowObjectCanvas.html.push(rowObject);
      }    
    } 
 }
 else {
      var rowObject={};
      rowObject.type="div";
      rowObject.class="row canvasformid";
      rowObject.html=[];
      rowObjectCanvas.html.push(rowObject);      
 }
 htmlObject.html.push(rowObjectCanvas);
  if($('#chkLogin').is(":checked")==true) {
     // Login form collector
    var loginformobj={};
    loginformobj.type="div";
    loginformobj.class="row";
    loginformobj.id="loginformid";
    loginformobj.html=[];
    for(var colCounter=0;colCounter<loginForm.columnDiv.length;colCounter++)
    {
        var colObject={};
        colObject.type="div";
        colObject.class=loginForm.columnDiv[colCounter].class;
        colObject.html=[];
        LoginURLtest=loginForm.columnDiv[0].htmlControls[3].loginAPI;
        for(var htmlcounter=0;htmlcounter<loginForm.columnDiv[colCounter].htmlControls.length;htmlcounter++)
        {
          var result=HtmloutputGenerator.generateHtmlOutputObject(loginForm.columnDiv[colCounter].htmlControls[htmlcounter]);
          var htmlControlObj= result.htmlControl;
          if(result.inlineJsfunctions)
            inlineJsfunctions=inlineJsfunctions+"\n"+result.inlineJsfunctions;  
          colObject.html.push(htmlControlObj);
        }
        loginformobj.html.push(colObject);
    }
    htmlObject.html.push(loginformobj);
  }
 var modalHtml=HtmloutputGenerator.getHtmlObjectsForModalWindow(datamodalpopupMapping);
 if(modalHtml.html.length>0)
  {
    htmlObject.html.push(modalHtml);
  }
 HtmloutputGenerator.generateHtmlAndSaveToFile(htmlObject,inlineJsfunctions,extracss,strcss,strjs,globalcolor,bgglobalcolor,globaldata,pageProperties,gloablAPIResponseData,extraJavascript);
}
HtmloutputGenerator.getHtmlObjectsForModalWindow=function(datamodalpopupMapping){
    var htmlObject={};
    htmlObject.type="div";
    htmlObject.html=[];
    if (datamodalpopupMapping!=null && datamodalpopupMapping !=undefined)
    {
    var keys = Object.keys(datamodalpopupMapping);
    keys.forEach(function (key) {
       var modalFade={};
       modalFade.html=[];
       modalFade.type="div";
       modalFade.id=key;
       modalFade.class="modal fade";
       modalFade.role="dialog";

       var modalDialog={};
       modalDialog.type="div";
       modalDialog.html=[];
       modalDialog.class="modal-dialog";
       modalFade.html.push(modalDialog);

       var modalContent={};
       modalContent.type="div";
       modalContent.html=[];
       modalContent.class="modal-content";
       modalDialog.html.push(modalContent);

       var modalHeader={};
       modalHeader.type="div";
       modalHeader.html=[];
       modalHeader.class="modal-header";
       modalContent.html.push(modalHeader);

       var closeButton={};

       var modalBody={};
       modalBody.type="div";
       modalBody.html=[];
       modalBody.class="modal-body";
       modalContent.html.push(modalBody);

      var data=datamodalpopupMapping[key];
   
      if(data && data.length>0){
      for(var rowCounter=0;rowCounter<data.length;rowCounter++)
      {
        var rowObject={};
        rowObject.type="div";
        rowObject.class="row";
        rowObject.html=[];
        for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
        {
          var colObject={};
          colObject.type="div";
          colObject.class=data[rowCounter].columnDiv[colCounter].class;
          colObject.html=[];
          for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
          {
            var result=HtmloutputGenerator.generateHtmlOutputObject(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter]);
            var htmlControlObj= result.htmlControl;
            colObject.html.push(htmlControlObj);
          }
          rowObject.html.push(colObject);
        }
        modalBody.html.push(rowObject);
      }
    }
       var modalFooter={};
       modalFooter.type="div";
       modalFooter.html=[];
       modalFooter.class="modal-footer";
       modalContent.html.push(modalFooter);

       htmlObject.html.push(modalFade);
    })
    }
   return  htmlObject;
}
HtmloutputGenerator.getDataByRowId=function(rowId,data)
{
  var rowObj=[];
  for(var rowCounter=0;rowCounter<data.length;rowCounter++)
  {
    if(data[rowCounter].id==rowId)
    {
      $.extend(rowObj,data[rowCounter]);
    }
  }
  return rowObj;
}
HtmloutputGenerator.getRowIdsToIgnoreFromPrimaryControl=function(navigationTabData,data)
{
  var rowIds=[];
  if(navigationTabData)
  {
     var keys = Object.keys(navigationTabData);
      keys.forEach(function (key) {
        if(navigationTabData[key])
        {
          var tabData=navigationTabData[key];
          for(var tabdtCounter=0;tabdtCounter<tabData.length;tabdtCounter++)
          {
            if(rowIds.indexOf(tabData[tabdtCounter].id)<0)
            {
             rowIds.push(tabData[tabdtCounter].id);
            }  
            tabData[tabdtCounter]=HtmloutputGenerator.getDataByRowId(tabData[tabdtCounter].id,data)
          }
        }
      })
  }
  return rowIds;
}
HtmloutputGenerator.generateHtmlOutputObject=function(htmlControlobj)
{
  var htmlControl={};
  var controlFound=false;
  switch(htmlControlobj.element)
  {
     case "Button":htmlControl=Button.HtmlControl_Button(htmlControlobj);controlFound=true;break;
     case "Header":htmlControl=Header.HtmlControl_Header(htmlControlobj);controlFound=true;break;
     case "Label":htmlControl=Label.HtmlControl_Label(htmlControlobj);controlFound=true;break;
     case "Paragraph":htmlControl=Paragraph.HtmlControl_Paragraph(htmlControlobj);controlFound=true;break;
     case "LineBreak":htmlControl=LineBreak.HtmlControl_LineBreak(htmlControlobj);controlFound=true;break;
     case "Dropdown":htmlControl=Dropdown.HtmlControl_Dropdown(htmlControlobj);controlFound=true;break;
     case "Tags":controlFound=true;break;
     case "Checkboxes":htmlControl=Checkboxes.HtmlControl_Checkboxes(htmlControlobj);controlFound=true;break;
     case "RadioButtons":htmlControl=RadioButtons.HtmlControl_RadioButtons(htmlControlobj);controlFound=true;break;
     case "TextInput":htmlControl=TextInput.HtmlControl_TextInput(htmlControlobj);controlFound=true;break;
     case "TextArea":htmlControl=TextArea.HtmlControl_TextArea(htmlControlobj);controlFound=true;break;
     case "Image":htmlControl=Image.HtmlControl_Image(htmlControlobj);controlFound=true;break;
     case "ImageCarousal":htmlControl=ImageCarousal.HtmlControl_ImageCarousal(htmlControlobj);controlFound=true;break;
     case "FBIcon":htmlControl=FBIcon.HtmlControl_FBIcon(htmlControlobj);controlFound=true;break;
     case "TWIcon":htmlControl=TWIcon.HtmlControl_TWIcon(htmlControlobj);controlFound=true;break;
     case "YouTubeIcon":htmlControl=YouTubeIcon.HtmlControl_YouTubeIcon(htmlControlobj);controlFound=true;break;
     case "YouTubeEmbed":htmlControl=YoutubeEmbed.HtmlControl_YoutubeEmbed(htmlControlobj);controlFound=true;break;
     case "Rating":controlFound=true;break;
     case "DatePicker":controlFound=true;break;
     case "HyperLink":htmlControl=HyperLink.HtmlControl_HyperLink(htmlControlobj);controlFound=true;break;
     case "Download":controlFound=true;break;
     case "Range":controlFound=true;break;
     case "ButtonGroup":htmlControl=ButtonGroup.HtmlControl_ButtonGroup(htmlControlobj);controlFound=true;break;
     case "GoogleMap":htmlControl=GoogleMap.HtmlControl_GoogleMap(htmlControlobj);controlFound=true;break;
     case "Graph":htmlControl=Graph.HtmlControl_Graph(htmlControlobj);controlFound=true;break;
     case "Tab":htmlControl=Tab.HtmlControl_Tab(htmlControlobj);controlFound=true;break;
     case "Forms":htmlControl=HtmloutputGenerator.generateFormControlHtml(htmlControlobj);controlFound=true;break;
     case "Panel":htmlControl=HtmloutputGenerator.generatePanelControlHtml(htmlControlobj);controlFound=true;break;
     case "Table":htmlControl=Table.HtmlControl_Table(htmlControlobj);controlFound=true;break;
     case "ListGroup":htmlControl=ListGroup.HtmlControl_ListGroup(htmlControlobj);controlFound=true;break;
     case "LoginForm":htmlControl=LoginForm.HtmlControl_LoginForm(htmlControlobj);controlFound=true;break;
     case "Navbar":htmlControl=HtmloutputGenerator.generateNavbarControlHtml(htmlControlobj);controlFound=true;break;
     case "Calendar":htmlControl=Calendar.HtmlControl_Calendar(htmlControlobj);controlFound=true;break;
     case "Barcode":htmlControl=Barcode.HtmlControl_Barcode(htmlControlobj);controlFound=true;break;
     case "QRcode":htmlControl=QRcode.HtmlControl_QRcode(htmlControlobj);controlFound=true;break;
     case "Collapsible":htmlControl=HtmloutputGenerator.generateCollapsibleControlHtml(htmlControlobj);controlFound=true;break;
     case "Progressbar":htmlControl=Progressbar.HtmlControl_Progressbar(htmlControlobj);controlFound=true;break;
     case "InnerSection":htmlControl=HtmloutputGenerator.generateInnerSectionControlHtml(htmlControlobj);controlFound=true;break;
     case "CheckboxGroup":htmlControl=CheckboxGroup.HtmlControl_CheckboxGroup(htmlControlobj);controlFound=true;break;
     case "RadiobuttonGroup":htmlControl=RadiobuttonGroup.HtmlControl_RadiobuttonGroup(htmlControlobj);controlFound=true;break;
  } 
  return htmlControl;
}
HtmloutputGenerator.generateNavbarControlHtml=function(htmlControlobj)
{
  var htmlControl={};
  htmlControl=Navbar.HtmlControl_Navbar(htmlControlobj)
  return htmlControl;
}
HtmloutputGenerator.getRowIdsBindToOtherTabs=function(tabData,tabToExclude)
{
  var rowIdToExlude=[];
  var keys = Object.keys(tabData);
  keys.forEach(function (key) {
    if(key!=tabToExclude)
    {
       if(tabData[key])
       {
          var specificTabData=tabData[key];
          var tabHtmlControls=[];
          for(var rowCounter=0;rowCounter<specificTabData.length;rowCounter++)
          {
            var rowData=specificTabData[rowCounter];
            rowIdToExlude.push(rowData.id);
          }
       }
    }
  })
  return rowIdToExlude;
}
HtmloutputGenerator.generateTabControlHtml=function(htmlControlobj,tabData)
{
  var htmlControl={};
  var childhtmlControlobj=[];
  var inlineJsfunctions='';
  if(tabData)
  {
    var tabOptions=htmlControlobj.taboptions;
    var tabDataWithHtmlControls=[]; 
    var childtabDataWithHtmlControls=[];
    for(var counter=0;counter<tabOptions.length;counter++)
    {
      var tabkey=tabOptions[counter].href;
     
      if(tabData[tabkey])
      {
        var specificTabData=tabData[tabkey];
        var tabHtmlControls=[];
        var rowIdToExlude=HtmloutputGenerator.getRowIdsBindToOtherTabs(tabData,tabkey);
        for(var rowCounter=0;rowCounter<specificTabData.length;rowCounter++)
        {
          var rowData=specificTabData[rowCounter];
          if(rowIdToExlude.indexOf(rowData.id)<0)
          {
            var rowObject={};
            rowObject.type="div";
            rowObject.class="row";
            rowObject.html=[];
            for(var colCounter=0;colCounter<rowData.columnDiv.length;colCounter++)
            {
                var colObject={};
                colObject.type="div";
                colObject.class=rowData.columnDiv[colCounter].class;
                colObject.html=[];
                for(var htmlcounter=0;htmlcounter<rowData.columnDiv[colCounter].htmlControls.length;htmlcounter++)
                {
                  var controlData=rowData.columnDiv[colCounter].htmlControls[htmlcounter];
                  var result=HtmloutputGenerator.generateHtmlOutputObject(controlData);
                  var htmlControlObj= result.htmlControl;
                  if(result.inlineJsfunctions)
                    inlineJsfunctions=inlineJsfunctions+"\n"+result.inlineJsfunctions;  
                  colObject.html.push(htmlControlObj);

                  //if inner objects contain tab controls
                  if(controlData.element=="Tab")
                  {
                    var childtabOptions=controlData.taboptions;                   
                    for(var counter1=0;counter1<childtabOptions.length;counter1++)
                    {
                      var childtabkey=childtabOptions[counter1].href;
                      if(tabData[childtabkey])
                      {
                        var specificchildTabData=tabData[childtabkey];
                        var childtabHtmlControls=[];
                        for(var rowCounter1=0;rowCounter1<specificchildTabData.length;rowCounter1++)
                        {
                          var childrowData=specificchildTabData[rowCounter1];
                          var childrowObject={};
                          childrowObject.type="div";
                          childrowObject.class="row";
                          childrowObject.html=[];
                          for(var colCounter1=0;colCounter1<childrowData.columnDiv.length;colCounter1++)
                          {
                            var childcolObject={};
                            childcolObject.type="div";
                            childcolObject.class=childrowData.columnDiv[colCounter1].class;
                            childcolObject.html=[];
                            for(var htmlcounter1=0;htmlcounter1<childrowData.columnDiv[colCounter1].htmlControls.length;htmlcounter1++)
                            {
                               var controlData1=childrowData.columnDiv[colCounter1].htmlControls[htmlcounter1];
                               var result1=HtmloutputGenerator.generateHtmlOutputObject(controlData1);
                               var htmlControlObj1= result1.htmlControl;

                               if(result1.inlineJsfunctions)
                               inlineJsfunctions=inlineJsfunctions+"\n"+result1.inlineJsfunctions; 

                               childcolObject.html.push(htmlControlObj1);
                            }
                            childrowObject.html.push(childcolObject);
                          }
                          childtabHtmlControls.push(childrowObject);
                        }
                        childtabDataWithHtmlControls[childtabkey]=childtabHtmlControls;
                      }
                      else
                      {
                        childtabDataWithHtmlControls[childtabkey]=[];
                      }
                    }
                    var divContentForChildTab=Tab.HtmlControl_TabContent(htmlControlobj,
                      childtabDataWithHtmlControls,[]);
                    childhtmlControlobj[tabkey]=divContentForChildTab.htmlControl;
                    
                  }
                 
                }
                rowObject.html.push(colObject);
            }
            tabHtmlControls.push(rowObject);
          }          
        }
       tabDataWithHtmlControls[tabkey]=tabHtmlControls;
      }
      else
      {
        tabDataWithHtmlControls[tabkey]=[];
      }
    }
   htmlControl= Tab.HtmlControl_TabContent(htmlControlobj,
   tabDataWithHtmlControls,childhtmlControlobj); 
   if(htmlControl.inlineJsfunctions)  
    htmlControl.inlineJsfunctions=htmlControl.inlineJsfunctions+inlineJsfunctions;
   else
    htmlControl.inlineJsfunctions=inlineJsfunctions;
  } 
  return htmlControl;
}
HtmloutputGenerator.generateInnerSectionControlHtml=function(htmlControlobj)
{
var inlineJsfunctions='';
var childhtmlControlobj=[];
var rowObject={};
rowObject.type="div";
rowObject.class="row";
rowObject.html=[];
for(var colCounter=0;colCounter<htmlControlobj.columnDiv.length;colCounter++)
{
  var colObject={};
  colObject.type="div";
  colObject.class=htmlControlobj.columnDiv[colCounter].class;
  if(colCounter==0 && htmlControlobj.controlid) {
     colObject.id =htmlControlobj.controlid;
  }
  colObject.html=[];
  var rowStyle=InnerSection.getRowInlineStyleForOutput(htmlControlobj);
  rowObject.style='';
  if(rowStyle!="")
  {
      rowObject.style=rowStyle;
  }
      
  for(var htmlcounter=0;htmlcounter<htmlControlobj.columnDiv[colCounter].htmlControls.length;htmlcounter++)
  {
    var result=HtmloutputGenerator.generateHtmlOutputObject(htmlControlobj.columnDiv[colCounter].htmlControls[htmlcounter]);
    var htmlControlObj= result.htmlControl;
    if(result.inlineJsfunctions)
      inlineJsfunctions=inlineJsfunctions+"\n"+result.inlineJsfunctions;
    colObject.html.push(htmlControlObj);
  }
  rowObject.html.push(colObject);
}
 return {'htmlControl':rowObject,'inlineJsfunctions':inlineJsfunctions};
}
HtmloutputGenerator.generatePanelControlHtml=function(htmlControlobj)
{
  var htmlControl={};
  var childhtmlControlobj=[];
  for(var childElementCounter=0;childElementCounter<htmlControlobj.childdata.length;childElementCounter++)
  {
    var childData=HtmloutputGenerator.generateHtmlOutputObject(htmlControlobj.childdata[childElementCounter]);
    childhtmlControlobj.push(childData);
  }
  htmlControl=Panel.HtmlControl_Panel(htmlControlobj,childhtmlControlobj);
  return htmlControl;
}
HtmloutputGenerator.generateFormControlHtml=function(htmlControlobj)
{
  var htmlControl={};
  var childhtmlControlobj=[];
  for(var childElementCounter=0;childElementCounter<htmlControlobj.childdata.length;childElementCounter++)
  {
    var childData=HtmloutputGenerator.generateHtmlOutputObject(htmlControlobj.childdata[childElementCounter]);
    childhtmlControlobj.push(childData);
  }
  htmlControl=Forms.HtmlControl_Forms(htmlControlobj,childhtmlControlobj);
  return htmlControl;
}
HtmloutputGenerator.generateCollapsibleControlHtml=function(htmlControlobj)
{
  var htmlControl={};
  var childhtmlControlobj=[];
  for(var childElementCounter=0;childElementCounter<htmlControlobj.childdata.length;childElementCounter++)
  {
    var childData=HtmloutputGenerator.generateHtmlOutputObject(htmlControlobj.childdata[childElementCounter]);
    childhtmlControlobj.push(childData);
  }
  htmlControl=Collapsible.HtmlControl_Collapsible(htmlControlobj,childhtmlControlobj);
  return htmlControl;
}

HtmloutputGenerator.generateHtmlAndSaveToFile=function(htmlObj,inlineJsfunctions,extracss,strcss,strjs,globalcolor,bgglobalcolor,globaldata,pageProperties,gloablAPIResponseData,extraJavascript)
{ 
 var $form = $('<form/>', {
        id: "myform"
        });$form.dform({
  class: 'form-horizontal',
  html: htmlObj
});
  var finalHtml = $form.html();
  var jsfilename ="output-"+new Date().getTime() +".js";
  var cssfilename= "output-"+new Date().getTime()+".css";
  var htmlfilename= "output-"+new Date().getTime()+".html";

  //var row = $("body").find('loginform');
  // $("body").find($( "#loginform" ).nextAll().css( "background-color", "red" ));
  var bootstrap = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css' +
    '/bootstrap.min.css"><script   src="https://ajax.googleapis.com/ajax/libs/jquery/3.' +
    '1.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstr' +
    'ap/3.3.7/js/bootstrap.min.js"></script><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtOsLFOWJ1YIOks9VqUMp7tqrlTFRVh1U"></script>' ;
  
  
  var cssFile =  require('../../css/exportable.css') +' '+require('../../css/bootstrap-datetimepicker.min.css');
  
  var chartstr =  require('raw-loader!./Donut3D.js');   
  
  var cssOPRef = '<link rel="stylesheet"  href="output.css">';
  var jsOPRef =  '<script src="output.js"></script>';
  var noOPRef = '';
if(!strjs){strjs='';}
if(!extraJavascript){extraJavascript=''}
  var bootstrap = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css' +
    '/bootstrap.min.css"><link rel="stylesheet"  href='+cssfilename+'><script src="https://cdn.jsdelivr.net/jsbarcode/3.5.8/JsBarcode.all.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.3/d3.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.' +
    '1.1/jquery.min.js"></script><script async defer '+
            'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtOsLFOWJ1YIOks9VqUMp7tqrlTFRVh1U">'+
    '</script><script src="https://maxcdn.bootstrapcdn.com/bootstr' +
    'ap/3.3.7/js/bootstrap.min.js"></script>'+strjs+'<script src="'+jsfilename+'"></script>' ;
    '/bootstrap.min.css">'+cssOPRef+'<script src="https://cdn.jsdelivr.net/jsbarcode/3.5.8/JsBarcode.all.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.3/d3.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.' +
    '1.1/jquery.min.js"></script><script async defer '+
            'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtOsLFOWJ1YIOks9VqUMp7tqrlTFRVh1U">'+
    '</script><script src="https://maxcdn.bootstrapcdn.com/bootstr' +
    'ap/3.3.7/js/bootstrap.min.js"></script>' + jsOPRef ;

  var chartstr='',functionname='',tablehelperstr='',qrcodestr='',datepicker='',datepicker1='',barcodestr='';
     // collect this file as css
    var cssFile =  require('../../css/exportable.css') +' '+require('../../css/bootstrap-datetimepicker.min.css');; 
    if(finalHtml.indexOf('Donut') !== -1){
      var donutchart = require('raw-loader!./Donut3D.js').replace('module.exports = Donut3D',''); 
        chartstr += "; " + donutchart;
        // functionname = 'Donut3D()';
    }
    if(finalHtml.indexOf('Line') !== -1){
      var linechart = require('raw-loader!./Line.js').replace('module.exports = Line',''); 
        chartstr += "; " + linechart;
        // functionname = 'Line()';
    }
    if(finalHtml.indexOf('Bar') !== -1){
      var barchart = require('raw-loader!./Bar.js').replace('module.exports = Bar',''); 
        chartstr += "; " + barchart;
        // functionname = 'Bar()';
    }
    if(finalHtml.indexOf('Area') !== -1){
      var areachart = require('raw-loader!./Area.js').replace('module.exports = Area',''); 
        chartstr += "; " + areachart;
        // functionname = 'Area()';
    }
    if(finalHtml.indexOf('<table') !== -1){
      
       tablehelperstr= require('raw-loader!../../js/bootstrap-table.js');
       tablehelperstr=tablehelperstr+' '+require('raw-loader!../../js/jquery.treetable.js');
       tablehelperstr=tablehelperstr+' '+require('raw-loader!../../js/bootstrap-table-print.js');
       tablehelperstr =tablehelperstr+' '+ require('raw-loader!../../js/bootstraptablecustom.js'); 
       cssFile=cssFile+' '+require('../../css/bootstrap-table.css');
       cssFile=cssFile+' '+require('../../css/bootstraptablecustom.css');
    }   
    qrcodestr= require('raw-loader!../../js/jquery.qrcode.min.js');
    datepicker= require('raw-loader!../../js/bootstrap-datetimepicker.js');// + require('raw-loader!../../js/jquery-1.8.3.min.js');
    datepicker1= require('raw-loader!../../js/bootstrap-datetimepicker.min.js');

    //collect the JS file by concating the JS code and export individually
    //var writer = new SimpleFileWriter('../public/output/output.js');
    //writer.write(chartstr);

    var mustache =  require('raw-loader!mustache/mustache.min.js');
    var tablebinddata = '$(document).ready(function(){if (typeof bindAllTableData === "function") { bindAllTableData()}});';
    chartstr = chartstr.replace('use strict;', '')

    // login toggle function & document ready function
    var loadmapfun = '';
    var loadmapfuncall = '';

    if(finalHtml.indexOf('gmap-container') !== -1){
        loadmapfun = "function loadMap"+ window.trackid + "() {  if (document.getElementById('" + window.trackid + "')){var uluru = {'lat': parseFloat('"+window.latitude+"'),'lng': parseFloat('"+window.longitude+"')};var map; var marker; if (!map) {map = new google.maps.Map(document.getElementById('" + window.trackid + "'), {zoom: 4,center: uluru});marker = new google.maps.Marker({position: uluru, map: map});}else {marker.setPosition(uluru);}}}";
       
       loadmapfuncall="$(document).ready(function(){";
      //  loadmapfuncall=loadmapfuncall+  'window.latitude = data['+window.latkeyname+'];window.longitude = data['+ window.longkeyname+'];';

        loadmapfuncall =loadmapfuncall+ "loadMap" + window.trackid + "();";
        loadmapfuncall=loadmapfuncall+"});";
    }

    var globaljsonAPIURL = ($("#globaljsonurlfield").val()).trim();
    if (HtmloutputGenerator.isTooltemplate)
    {
      globaljsonAPIURL = "";
    } 
    else
    {
      globaljsonAPIURL = ($("#globaljsonurlfield").val()).trim();
    }
    var globlestyle="";
    var globalFont = ($("#globalFontfield").val()).trim();
    //var globalBackground = ($("#globalbackgroundfield").val()).trim();
    var globalColor =globalcolor;
    var bgglobalcolor=bgglobalcolor;
    // var callback = 'function(data,status){if(status == "success"){var rendered = Mustache.render($("#htmloutput").html(), data);$("#htmloutput").html(rendered);window.globaljsonurl="' + globaljsonAPIURL +'";' +'}'
    var callback = 'function(data,status){if(status == "success"){var rendered = Mustache.render($("#htmloutput").html(), data);$("#htmloutput").html(rendered);window.globaljsonurl="' + globaljsonAPIURL +'";'+ 'window.latitude = data['+window.latkeyname+'];window.longitude = data['+ window.longkeyname+'];' + loadmapfuncall +'}'
    var fetchglobaljson = '$.get(' + "\'" + globaljsonAPIURL + "\'" + ',' + callback;

    var hidefunction = 'function toggle (elements,toshow) {elements = elements.length ? elements : [elements];for (var index = 0; index < elements.length; index++) {if(toshow){elements[index].style.display = "block";}else{elements[index].style.display = "none";}}}'
    var docreadyfun;
    var localJson = '';
    var bindControlToLocalJson='';
    if(globaljsonAPIURL==''&& globaldata!='') {
      //localJson = 'window.globaldata='+JSON.stringify(globaldata);
       //localJson = 'window.globaldata="'+btoa(JSON.stringify(globaldata));
       if(HtmloutputGenerator.isTooltemplate)
       {
           localJson='$(document).ready(function(){window.globaldata="{EncodedContentInBase64}"});';
       }
       else
       {
      localJson='$(document).ready(function(){window.globaldata="'+btoa(JSON.stringify(globaldata))+'"});';
       }
      bindControlToLocalJson ='$(document).ready(function(){var rendered = Mustache.render($("#htmloutput").html(), window.globaldata);$("#htmloutput").html(rendered);});';
      //var gloablAPIResponseDataVariable ='$(document).ready(function(){ window.Aurion_apidata='+JSON.stringify(gloablAPIResponseData)+'});';
    }
    if($('#chkLogin').is(":checked")==true){
      var loginfunctionbody="";
      if(LoginURLtest=="")
      {
          //If the login url is not available
          loginfunctionbody = 'function aurionprologin(){var username = document.getElementById("loginformusernamefield").value;var password = document.getElementById("loginformpasswordfield").value;$.get("'+ globaljsonAPIURL +'",{username:username,password:password},function(data,status){if(status == "success" || status == 200){var resUsername = data["USERNAME"];var resPassword = data["PASSWORD"]; var loginformusername = document.getElementById("loginformusernamefield").value; var loginformpassword = document.getElementById("loginformpasswordfield").value; if(resUsername === loginformusername && loginformpassword == resPassword){toggle(document.getElementsByClassName("canvasformid"),true);toggle(document.getElementById("loginformid"),false);} else{alert("Authentication Failed! Please check the username and password")} }});};'
      }
      else{
          //If the login url is  available
          loginfunctionbody = 'function aurionprologin(){var username = document.getElementById("loginformusernamefield").value;var password = document.getElementById("loginformpasswordfield").value;$.post("'+ LoginURLtest +'",{username:username,password:password},function(data,status){if(status == "success" || status == 200){toggle(document.getElementsByClassName("canvasformid"),true);toggle(document.getElementById("loginformid"),false);}});};'
      }
      var funGloablJson="$(document).ready(function(){window.globaljsonurl='"+ globaljsonAPIURL+"';});";
    docreadyfun = funGloablJson+ '$(document).ready(function(){toggle(document.getElementsByClassName("canvasformid"),false);toggle(document.getElementById("loginformid"),true);' +  fetchglobaljson  + '})});' + hidefunction + loginfunctionbody + loadmapfun+loadmapfuncall+tablebinddata;   
  }
  else {
   
    var funGloablJson="$(document).ready(function(){window.globaljsonurl='"+ globaljsonAPIURL+"';});";
    docreadyfun = funGloablJson+ '$(document).ready(function(){toggle(document.getElementsByClassName("canvasformid"),true);' +  fetchglobaljson  + '})});'  +hidefunction+ loadmapfun+loadmapfuncall+tablebinddata;
  }

    // HTML to export
    if(!strcss){strcss = '';} //if no data than init with blank
    if(!extracss){extracss='';} //if no data than init with blank
    if(!strjs){strjs='';}
    
    var exportedHTML = '';
    var funGloablJson="$(document).ready(function(){window.globaljsonurl='"+ globaljsonAPIURL+"';});";

    var gloablAPIResponseDataVariable ='$(document).ready(function(){ window.Aurion_apidata='+JSON.stringify(gloablAPIResponseData)+'});';
    if(HtmloutputGenerator.istemplate){
        // TEMPLATE
        var JS = chartstr +' ' + tablehelperstr + ' '+ qrcodestr +' '+ datepicker +' '+datepicker1+' ' + mustache +  docreadyfun+inlineJsfunctions;
        JS = HtmloutputGenerator.minifyJS(JS);
        var CSS = cssFile;
        CSS=HtmloutputGenerator.minifyCSS(CSS);
        finalHtml =HtmloutputGenerator.utoa(finalHtml);
        let htmlToNormal ="$(document).ready(function(){document.getElementById('htmloutput').innerHTML=decodeURIComponent(escape(window.atob((document.getElementById('htmloutput').innerHTML))));});";
        let JStoNormal ="$(document).ready(function(){window.Aurion_apidata=JSON.parse(atob(window.Aurion_apidata));});";
         let GlobaldatatoNormal ="$(document).ready(function(){window.globaldata=JSON.parse(atob(window.globaldata));});";
         if(HtmloutputGenerator.isTooltemplate)
         {
            exportedHTML = '<!DOCTYPE html><html><head>'+ strcss +'<style>'+CSS+HtmloutputGenerator.minifyCSS(extracss)+'</style><title>'+pageProperties.pagetitle+'</title>'+bootstrap+'</head><body style="color:'+globalColor+';background:'+bgglobalcolor+';font-family:'+globalFont+'"><div id="htmloutput">' + finalHtml + '</div><script>'+htmlToNormal+funGloablJson+localJson+'window.Aurion_apidata="{EncodedContentInBase64}";'+JS+JStoNormal+GlobaldatatoNormal+bindControlToLocalJson+HtmloutputGenerator.minifyJS(extraJavascript)+'</script></body></html>';
         }
         else
         {
           exportedHTML = '<!DOCTYPE html><html><head>'+ strcss +'<style>'+CSS+HtmloutputGenerator.minifyCSS(extracss)+'</style><title>'+pageProperties.pagetitle+'</title>'+bootstrap+'</head><body style="color:'+globalColor+';background:'+bgglobalcolor+';font-family:'+globalFont+'"><div id="htmloutput">' + finalHtml + '</div><script>'+htmlToNormal+funGloablJson+localJson+'window.Aurion_apidata="'+btoa(JSON.stringify(gloablAPIResponseData))+'";'+JStoNormal+GlobaldatatoNormal+bindControlToLocalJson+JS+HtmloutputGenerator.minifyJS(extraJavascript)+'</script></body></html>';
         }

        //Remove dependencies of JS and CSS output files
        exportedHTML = exportedHTML.replace(cssOPRef, noOPRef);
        exportedHTML = exportedHTML.replace(jsOPRef, noOPRef);
        exportedHTML=HtmloutputGenerator.minifyHTML(exportedHTML);
        var html = new Blob([exportedHTML], {type: "attachment/html;charset=utf-8"});
        Filesaver.saveAs(html, "output.html");
        return;
    }

    // HTML
     finalHtml =HtmloutputGenerator.utoa(finalHtml);
     // fH + '<script>'
     // fH + js
     // fh + </script>
    var exportedHTML = '<!DOCTYPE html><html><head>' + strcss+'<style>'+HtmloutputGenerator.minifyCSS(extracss)+'</style><title>'+pageProperties.pagetitle+'</title>'+bootstrap+'</head><body style="color:'+globalColor+';background:'+bgglobalcolor+';font-family:'+globalFont+'"><div id="htmloutput">' + finalHtml + '</div></body></html>';
   
    let htmlToNormal ="$(document).ready(function(){document.getElementById('htmloutput').innerHTML=decodeURIComponent(escape(window.atob((document.getElementById('htmloutput').innerHTML))));});";
 let JStoNormal ="$(document).ready(function(){window.Aurion_apidata=JSON.parse(atob(window.Aurion_apidata));});";
 let GlobaldatatoNormal ="$(document).ready(function(){window.globaldata=JSON.parse(atob(window.globaldata));});";
    exportedHTML=HtmloutputGenerator.minifyHTML(exportedHTML);
    var html = new Blob([exportedHTML], {type: "attachment/html;charset=utf-8"});
    Filesaver.saveAs(html, htmlfilename);

    // JS
    var exportJS = chartstr +' ' + tablehelperstr + ' ' + qrcodestr +' '+ datepicker +' '+ datepicker1 +' '+ ' ' + mustache +  docreadyfun+funGloablJson+inlineJsfunctions;
    exportJS =htmlToNormal+ localJson+'window.Aurion_apidata="'+btoa(JSON.stringify(gloablAPIResponseData))+'";'+JStoNormal+GlobaldatatoNormal+ bindControlToLocalJson+HtmloutputGenerator.minifyJS(exportJS)+extraJavascript;
    var JS = new Blob([exportJS], {type: "attachment/javascript;charset=utf-8"});
    //Filesaver.saveAs(JS, "output.js");
    Filesaver.saveAs(JS, jsfilename);

    // CSS
    var exportCSS = cssFile;
     exportCSS=HtmloutputGenerator.minifyCSS(exportCSS);
    var CSS = new Blob([exportCSS], {type: "attachment/plain;charset=utf-8"});
    Filesaver.saveAs(CSS,cssfilename);

    // var zip = new JSZip();
    // jszip.file("output.html", exportedHTML);
    // jszip.file("output.js", exportJS);
    // jszip.file("output.css", exportCSS);
    // jszip.generateAsync({type:"blob"}).then(function(content) {
    //     // see FileSaver.js 
    //     saveAs(content, "output.zip");
    // });
}

//remove the designer inline style and classes
HtmloutputGenerator.removeDesignerStyles= function (htmlJson) {

    for (var childObjCounter = 0; childObjCounter < htmlJson[0].children.length; childObjCounter++) {
         var childObject = htmlJson[0].children[childObjCounter];
         if (childObject && childObject.tagName && childObject.tagName == 'div') {
             
              if (childObject && childObject.attributes && childObject.attributes.className) 
              {
                  if(childObject.attributes.className.indexOf("row")>-1)
                  {
                    //remove styles from column div
                    for(var colDivCounter=0;colDivCounter<childObject.children.length;colDivCounter++)
                    {
                        var colObject=childObject.children[colDivCounter];
                        if(colObject && colObject.attributes && colObject.attributes.style&&colObject.attributes.style.border)
                        {
                            htmlJson[0].children[childObjCounter].children[colDivCounter].attributes.style.border='0px';
                        }
                    }
                  }                 
              }
         }
    }
    return htmlJson;
}

HtmloutputGenerator.exportDesignToJsonFile = function (data) {
 
  var jsonData=JSON.stringify(data);
  var html = new Blob([jsonData], {type: "text/plain;charset=utf-8"});
  Filesaver.saveAs(html, "designer.json");  
}
HtmloutputGenerator.importDesignerJsonFile = function (data) {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      
    } 
    else {
      alert('The File APIs are not fully supported in this browser.');
    }
}

HtmloutputGenerator.minifyJS = function (code) {
  if(typeof(code)!='string'){return code};
  var ast = UglifyJS.parse(code);
  ast.figure_out_scope();
  ast.compute_char_frequency();
  ast.mangle_names();
  return ast.print_to_string();
}
HtmloutputGenerator.minifyHTML = function (code) {
var output;
  return output = code
      .replace(/\<\!--\s*?[^\s?\[][\s\S]*?--\>/g,'')
      .replace(/\>\s*\</g,'><')
    ;
 
}

HtmloutputGenerator.minifyCSS = function (code) {
  if(typeof(code)!='string'){return code};
 var output;
  return output = code
    .replace(/\/\*.*\*\/|\/\*[\s\S]*?\*\/|\n|\t|\v|\s{2,}/g,'')
    .replace(/\s*\{\s*/g,'{')
    .replace(/\s*\}\s*/g,'}')
    .replace(/\s*\:\s*/g,':')
    .replace(/\s*\;\s*/g,';')
    .replace(/\s*\,\s*/g,',')
    .replace(/\s*\~\s*/g,'~')
    .replace(/\s*\>\s*/g,'>')
    .replace(/\s*\+\s*/g,'+')
    .replace(/\s*\!\s*/g,'!')
    ;
}
HtmloutputGenerator.utoa = function(str) 
{
  return window.btoa(unescape(encodeURIComponent(str)));
}


//export the modules
module.exports = HtmloutputGenerator;
