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
 Contain form preview for designing
*/
import React from 'react';
//import TestComponent from './test.jsx';
import ControlStore from './common/controlstore.jsx';
import ControlActions from './common/controlactions.jsx';
import Header from './formbuildercontrols/headercontrol.jsx';
import Label from './formbuildercontrols/labelcontrol.jsx';
import Paragraph from './formbuildercontrols/paragraphcontrol.jsx';
import LineBreak from './formbuildercontrols/linebreakcontrol.jsx';
import Dropdown from './formbuildercontrols/dropdowncontrol.jsx';
import Tags from './formbuildercontrols/tagscontrol.jsx';
import Checkboxes from './formbuildercontrols/checkboxescontrol.jsx';
import RadioButtons from './formbuildercontrols/radiobuttonscontrol.jsx';
import TextInput from './formbuildercontrols/textinputcontrol.jsx';
import NumberInput from './formbuildercontrols/numberinputcontrol.jsx';
import TextArea from './formbuildercontrols/textareacontrol.jsx';
import Image from './formbuildercontrols/imagecontrol.jsx';
import Rating from './formbuildercontrols/ratingcontrol.jsx';
import DatePicker from './formbuildercontrols/datepickercontrol.jsx';
import HyperLink from './formbuildercontrols/hyperlinkcontrol.jsx';
import Download from './formbuildercontrols/downloadcontrol.jsx';
import RangeControl from './formbuildercontrols/rangecontrol.jsx';
import Button from './formbuildercontrols/buttoncontrol.jsx';
import ButtonGroup from './formbuildercontrols/buttongroupcontrol.jsx';
import GoogleMap from './formbuildercontrols/googlemapcontrol.jsx';
import Graph from './formbuildercontrols/graphcontrol.jsx';
import Forms from './formbuildercontrols/formscontrol.jsx';
import Canvas from './formbuildercontrols/canvascontrol.jsx';
import Tab from './formbuildercontrols/tabcontrol.jsx';
import Panel from './formbuildercontrols/panelcontrol.jsx';
import Table from './formbuildercontrols/tablecontrol.jsx';
import ListGroup from './formbuildercontrols/listgroupcontrol.jsx';
import Navbar from './formbuildercontrols/navigationcontrol.jsx';
import Toolbox from './toolbox.jsx';
import ID from './common/UUID.js';
import PropertyWindow from './propertywindow.jsx';
import Filesaver from 'file-saver';

import FBIcon from './formbuildercontrols/facebookcontrol.jsx';
import TWIcon from './formbuildercontrols/twittercontrol.jsx';
import YouTubeIcon from './formbuildercontrols/youtubecontrol.jsx';
import ImageCarousal from './formbuildercontrols/carousalcontrol.jsx';
import YouTubeEmbed from './formbuildercontrols/youtubeembedcontrol.jsx';


import Calendar from './formbuildercontrols/calendarcontrol.jsx';
import QRcode from './formbuildercontrols/QRcodecontrol.jsx';
import Barcode from './formbuildercontrols/barcodecontrol.jsx';
import Collapsible from './formbuildercontrols/collapsiblecontrol.jsx';
import Progressbar from './formbuildercontrols/progressbarcontrol.jsx';
import Page from './formbuildercontrols/pagecontrol.jsx';
import HtmloutputGenerator from './common/htmloutputgenerator.jsx';
import Section from './formbuildercontrols/sectioncontrol.jsx';
import SectionColumnDiv from './formbuildercontrols/sectioncontrol.jsx';
import LoginForm from './formbuildercontrols/loginformcontrol.jsx';
import InnerSection from './formbuildercontrols/innersectioncontrol.jsx';
import CheckboxGroup from './formbuildercontrols/checkboxgroupcontrol.jsx';
import RadiobuttonGroup from './formbuildercontrols/radiobuttongroupcontrol.jsx';
import Modal from 'react-modal';
import FileReaderInput from 'react-file-reader-input';
import Notifications, {notify} from 'react-notify-toast';

import ColorPicker from 'rc-color-picker';
import Mousetrap from 'mousetrap';
// import carousalstyles  from './auriocarousal.css'; import carousalstyles from
// '/Users/kuldeep.b/KDs
// All/Projects/AurioPro/code/aurionpro-designer-tool/css/aurioncarousal.css'
var selectedHtmlControl = [];

var selectedSectionRowControl = [];
var draggedSourceControl = [];
var droppedTargetControl = [];
var droponColumnNumber=0;
var navigationData={};
var navigationTabData={};
var navigationHiddenTabs=[];
var gloablAPIResponseData = [];
class Preview extends React.Component
{
    componentDidMount() {
        // this._data;
        Mousetrap.bind(['ctrl+z', 'command+z'], function(){
            ControlActions.undo();
        });
        Mousetrap.bind(['ctrl+y', 'command+shift+z'], function(){
            ControlActions.redo();
        });
    }
    componentWillUnmount() {
        Mousetrap.unbind(['ctrl+z', 'command+z'], function(){
            // ControlActions.undo();
        });
        Mousetrap.unbind(['ctrl+y', 'command+shift+z'], function(){
            // ControlActions.redo();
        });
    }
    constructor(props)
    {
        super(props);

        this.state = {
            data: [],
            datamodalpopup:[],
            datamodalpopupMapping:[],
            modalpopupnames:[],
            selectedView:'designer',
            selectedModelDialog:'',
            selectedControl: [],
            extraCss:[],
            extraJavascript:[],
            globleCss:[],
            globlejs:[],
            globalcolor:'#000',
            bgglobalcolor:'#fff',
            globalStyle:[],
            loginForm: {"rownumber":0,"columncount":"1","borderClass":"row designer_selectrow","class":"row","global_json":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","id":"B5D47194-64D8-44AC-8EE4-2C91A142A0F6","element":"Section","static":true,"required":false,"columnnumber":0,"columnDiv":[{"rownumber":0,"columncount":"1","borderClass":"row","class":"col-md-12","global_json":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","id":"17DE1261-C436-4AF8-83F5-8FC534D8D2CC","element":"SectionColumn","htmlControls":[{"accesskey":"","autofocus":false,"notRemovable":true,"name":"","src":"./images/default-placeholder.png","tabindex":"","title":"","height":"","width":"","draggable":"","class":" ","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","alt":"","style_underline":"","style_overline":"","style_linethrough":"","rownumber":0,"columnnumber":0,"style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","parentcontrolid":"0","borderClass":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","events_onblur":{"event":"onblur","methodname":"","method":""},"events_onchange":{"event":"onchange","methodname":"","method":""},"events_onclick":{"event":"onclick","methodname":"","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onfocus":{"event":"onfocus","methodname":"","method":""},"events_onload":{"event":"onload","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"div_stylefloat":"none","div_stylewidth":"","div_class":"","div_style_float":"none","id":"8FDA60E8-F35D-4866-814B-A3D98E071D43","element":"Image","required":false,"field_name":"image_006667D4-FB47-4B90-8EE1-830EF826FBCD"},{"class":"form-control","notRemovable":true,"accesskey":"","autofocus":false,"name":"","placeholder":"","tabindex":"","title":"","controlid":"loginformusernamefield","content":"Label","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","input_type":"text","style_underline":"","style_overline":"","style_linethrough":"","rownumber":0,"columnnumber":0,"parentcontrolid":"0","style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","form_type":"","borderClass":"","div_stylefloat":"none","div_stylewidth":"","div_class":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","events_onblur":{"event":"onblur","methodname":"","method":""},"events_onchange":{"event":"onchange","methodname":"","method":""},"events_onclick":{"event":"onclick","methodname":"","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onfocus":{"event":"onfocus","methodname":"","method":""},"events_onkeydown":{"event":"onkeydown","methodname":"","method":""},"events_onkeypress":{"event":"onkeypress","methodname":"","method":""},"events_onkeyup":{"event":"onkeyup","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"events_onselect":{"event":"onselect","methodname":"","method":""},"id":"loginformusernamefield","element":"TextInput","required":false},{"class":"form-control","accesskey":"","notRemovable":true,"autofocus":false,"name":"","placeholder":"","tabindex":"","title":"","controlid":"loginformpasswordfield","content":"Label","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","input_type":"text","style_underline":"","style_overline":"","style_linethrough":"","rownumber":0,"columnnumber":0,"parentcontrolid":"0","style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","form_type":"","borderClass":"","div_stylefloat":"none","div_stylewidth":"","div_class":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","events_onblur":{"event":"onblur","methodname":"","method":""},"events_onchange":{"event":"onchange","methodname":"","method":""},"events_onclick":{"event":"onclick","methodname":"","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onfocus":{"event":"onfocus","methodname":"","method":""},"events_onkeydown":{"event":"onkeydown","methodname":"","method":""},"events_onkeypress":{"event":"onkeypress","methodname":"","method":""},"events_onkeyup":{"event":"onkeyup","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"events_onselect":{"event":"onselect","methodname":"","method":""},"id":"loginformpasswordfield","element":"TextInput","required":false},{"accesskey":"","notRemovable":true,"form":"","formaction":"","formenctype":"","loginAPI":"","formmethod":"","formnovalidate":false,"formtarget":"","buttontype":"submit","content":"Button","contenteditable":false,"draggable":false,"hidden":false,"name":"","tabindex":false,"title":"","class":"btn btn-default","controlid":"","onClick":"aurionprologin()","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","style_border":"","style_borderRadius":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","rownumber":0,"columnnumber":0,"parentcontrolid":"0","style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","borderClass":"","div_stylefloat":"none","div_stylewidth":"","div_class":"","events_onclick":{"event":"onclick","methodname":"aurionprologin()","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseout":{"event":"onmouseout","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"events_onsubmit":{"event":"onsubmit","methodname":"","method":""},"id":"0AA65169-AAC9-46E8-A057-BB40698E5FC3","element":"Button","static":true,"required":false}],"columnnumber":0,"colnumber":0}]},
            pageProperties:{},
            globaldata:''
        }
        this.openModalWindow = this
         .openModalWindow
         .bind(this);
        this.closeModalWindow = this
            .closeModalWindow
            .bind(this);
             this.stylecloseModalWindow = this
            .stylecloseModalWindow
            .bind(this);
        var loadData = (this.props.url)
            ? this.props.url
            : (this.props.data)
                ? this.props.data
                : [];
        ControlStore.loadDefaultData();
        ControlActions.setselectedView('designer');
        ControlStore.listen(this.onChange.bind(this));
        this.setSelectedControl = this
            .setSelectedControl
            .bind(this);
        this.handleImportFile=this.handleImportFile.bind(this);   
        this.handleLocalJsonFile=this.handleLocalJsonFile.bind(this);  
         Mousetrap.bind(['ctrl+z', 'command+z'], function(){});
        Mousetrap.bind(['ctrl+y', 'command+shift+z'], function(){ });     
    }
   
    openModalWindow(ev) {
        this.setState({ cssModalIsOpen: true })
    }
     openModalJSWindow(ev) {
        this.setState({ JSModalIsOpen: true })
    }
    openGlobleModalWindow(ev)
    {
        this.setState({ globlecssModalIsOpen: true })
    }
    openPageStyle(ev)
    {
        if(this.state.pageProperties.element=="Page")
        {
             this.setState({selectedControl: this.state.pageProperties});
        }   
        else
        {
            //this.setState({pageProperties: {}});
            var opt = {};
            opt = Page.properties(opt);
            this.setState({pageProperties: opt},
            this.setState({selectedControl: opt})
            );
        }
        // if(this.state.pageProperties.length<1)
        // {
        //     this.setState({pageProperties: []});
        //     var opt = [];
        //     opt = Page.properties(opt);
        //     this.setState({pageProperties: opt},
        //     this.setState({selectedControl: opt})
        //     );
        // }   
        // else
        //   this.setState({selectedControl: this.state.pageProperties});
    }
    undoDesigner(){
        ControlActions.undo();
    }
    redoDesigner(){
        ControlActions.redo();
    }
    removeJSON(){
        var userconfirm=confirm("Are you sure you want to remove Local Json?");
      
      if(userconfirm==true) {
        this.setState({globaldata: []});
        $('#txtLocalJson').val('Select Local JSON File');
      }
    }
    openGlobleJsModalWindow(ev)
    {
        this.setState({ globlejsModalIsOpen: true })
    }
    closeModalWindow(ev) {
        this.setState({ cssModalIsOpen: false })
          this.setState({JSModalIsOpen: false })
         this.setState({ globlecssModalIsOpen: false })
         this.setState({ globlejsModalIsOpen: false })
    }
    applyGlobalStyle() {
        var removesheet = document.getElementById('globalStylesheet')
        if(removesheet!=null)
        {
            removesheet.parentNode.removeChild(removesheet)
        }
        var sheet = document.createElement('style');
        sheet.id="globalStylesheet"; 
        sheet.type="text/css";
        sheet.innerHTML = this.state.extraCss;
        document.body.appendChild(sheet);
        //document.getElementById('designer').appendChild(document.createTextNode(sheet));
        this.setState({ cssModalIsOpen: false })
    }
    stylecloseModalWindow(ev)
    {
        this.applyGlobalStyle();
    }
    editExtraCss(e) {
        this.setState({extraCss: e.target.value}); 
    }
    editJavascript(e)
    {
         this.setState({extraJavascript: e.target.value}); 
    }
     globleCss(e) {
        this.setState({globleCss: e.target.value}); 
    }
    globlejs(e)
    {
        this.setState({globlejs: e.target.value}); 
    }
    setExtraCss()
    {
       //this.setState({extraCss: extraCss});  
    }
    onChange(data) {
        let key=data.key;
        let designerData= data.data;
       switch(key)
        {
        case "modalpopup":
        this.setState({datamodalpopup: data.datamodalpopup});
        this.setState({datamodalpopupMapping: data.datamodalpopupMapping});
        this.setState({modalpopupnames: data.modalpopupnames});
            break;
        case "designer":this.setState({data: designerData});
            break;
        case "loaddefault":
            this.setState({data: []});
            this.setState({datamodalpopup: []});
            this.setState({datamodalpopupMapping: []});
            this.setState({modalpopupnames: []});
         break;
        }
    }
    callapi(){
         var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
    if(url && url!='')
    {
        var xhttp = new XMLHttpRequest();
        var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
        xhttp.open("GET", url, true);
        xhttp.send();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
          gloablAPIResponseData = JSON.parse(this.response);
          } 
        }
    }
    }
    updateInnerSectionControlProperty(cntrl)
    {
    let data = this.dataToRefer();
    let found = false;
    let updatedRow=[];
    for (var dataCount = 0, len = data.length; dataCount < len; dataCount++) {
    if (cntrl.rownumber === data[dataCount].rownumber) {
     var columns =data[cntrl.rownumber-1].columnDiv;
   
    for (var colCounter = 0; colCounter < columns.length; colCounter++) {
    if (columns[colCounter].columnnumber == cntrl.columnnumber) {
   
    var htmlControls= columns[colCounter].htmlControls;
     for (var htmlcounter = 0; htmlcounter < htmlControls.length; htmlcounter++) {
     if(htmlControls[htmlcounter].id==cntrl.id){
   cntrl = this.verifyInnerSectionColumnDivNumberChange(cntrl);
   htmlControls[htmlcounter]= cntrl;
   columns[colCounter].htmlControls=htmlControls;
   data[cntrl.rownumber-1].columnDiv=columns;
   // data[dataCount] = cntrl;
    found = true;
    break; 
    }
    }
    }
    }  
    }
    }
    if (found) {
    this.dataToUpdate(data);
    }
    }
verifyInnerSectionColumnDivNumberChange(sectionControlDtls)
    {       
        var columncount = sectionControlDtls.columncount;
        var isColNumberChange=0;
        if (sectionControlDtls.element == "InnerSection") {
            if (sectionControlDtls.columnDiv.length > columncount) {
                var deleteColumnNumder = sectionControlDtls.columnDiv.length - columncount;
                for (var counter = 0; counter < deleteColumnNumder; counter++) {
                    sectionControlDtls
                        .columnDiv
                        .pop();
                }
                isColNumberChange=1;
            }
            if (sectionControlDtls.columnDiv.length < columncount) {
                var addColumnNumder = columncount - sectionControlDtls.columnDiv.length;
                var colnumberfornewcol = sectionControlDtls.columnDiv.length;
                isColNumberChange=1;
                for (var counter = 0; counter < addColumnNumder; counter++) {
                    var sectionColumnDivOptions = {};
                    sectionColumnDivOptions['class'] = 'col-md-12';
                    sectionColumnDivOptions['id'] = ID.uuid();
                    sectionColumnDivOptions['element'] = "InnerSectionColumn";
                    sectionColumnDivOptions.htmlControls = [];
                    sectionColumnDivOptions.columnnumber = colnumberfornewcol;
                    sectionColumnDivOptions.rownumber = sectionControlDtls.rownumber;
                    colnumberfornewcol++;
                    sectionControlDtls
                        .columnDiv
                        .push(sectionColumnDivOptions);
                }
            }
        }
        if(isColNumberChange==1)
        {
           sectionControlDtls=this.setColumnClassAfterColNumberChange(sectionControlDtls);
        }
        return sectionControlDtls;
    }    

    updateSectionControlProperty(cntrl)
    {
        let data = this.dataToRefer();
        let found = false;
        let updatedRow=[];
        for (var dataCount = 0, len = data.length; dataCount < len; dataCount++) {
            if (cntrl.id === data[dataCount].id) {               
                cntrl = this.verifySectionColumnDivNumberChange(cntrl);
                data[dataCount] = cntrl;
                updatedRow=cntrl;
                found = true;
                break;
            }
        }
        if (found) {
           this.dataToUpdate(data);
           // ControlActions.saveData(data);
        }        
    }
   
    updateHtmlControlProperty(cntrl)
    {
        ControlActions.editElement(cntrl);
    }
    //update the controls when property is changed
    updateControl(cntrl) {
if(cntrl){
    if (cntrl.element == "Section") {
        this.updateSectionControlProperty(cntrl);
    } 
    else if (cntrl.element == "InnerSection") {
        this.updateInnerSectionControlProperty(cntrl);
    } 
    else if(cntrl.element == "Page")
    {
        this.setState({pageProperties: cntrl});
    }
    else {
        this.updateHtmlControlProperty(cntrl);
    }
        
    }
}
    
    // getNavigationTabRowNumbers(tablink)
    // {     
    //   var rowNumers='';
    //   var tabData=navigationTabData[tablink];
    //   if(tabData)
    //   {          
    //     for(var tabdtCounter=0;tabdtCounter<tabData.length;tabdtCounter++)
    //     {
    //       rowNumers=rowNumers+tabData[tabdtCounter].rownumber;
    //       if(tabdtCounter<(tabData.length-1))
    //       rowNumers=rowNumers+',';
    //     }
    //   }
    //   return rowNumers;
    // }
    getNavigationTabRowNumbers(tablink)
     {    
    
      var rowNumers='';
      var tabData=navigationTabData[tablink];
      if(tabData)
      {      
          var rowCounter=0;  
        
        for(var tabdtCounter=0;tabdtCounter<tabData.length;tabdtCounter++)
        {
        
        if(tabData[tabdtCounter]&& tabData[tabdtCounter].rownumber)
         {
            rowNumers=rowNumers+tabData[tabdtCounter].rownumber;
            rowCounter++;  
         }
          
         if(rowCounter>0 && tabdtCounter<tabData.length-1)
          rowNumers=rowNumers+',';
        }
      }
      return rowNumers;
    }
    saveNavigationTabData(tablink,rownumbers,navcontrol,e)
    {
     if(!e) e=window.event;
     e.cancelBubble = true;
     if(e.stopPropagation) e.stopPropagation();
       var navObj=[];
       var tempnavObj=[];
       var rownumberArray=rownumbers.split(",").map(Number).filter(Boolean);;
       
       $.extend(tempnavObj,this.parent.state.data);      
       for (var rowCounter = 0; rowCounter < tempnavObj.length; rowCounter++) {        
        if(rownumberArray.indexOf(tempnavObj[rowCounter].rownumber)>=0)
        {
            if(navcontrol.rownumber!=tempnavObj[rowCounter].rownumber)
            {
             navObj.push(tempnavObj[rowCounter]);
            }            
        }
       }
       //var dataDetails={"data":navObj,"rownumbers":rownumberArray}
       navigationTabData[tablink]=navObj;
    }
    loadDataAsPerNavigationTab(tablink,navcontrol,e)
    {          
      if(!e) e=window.event;
      e.cancelBubble = true;
      if(e.stopPropagation) e.stopPropagation();
      var data=this.parent.state.data;
      //hide other tabs of particulat tab controls
      if(navcontrol&&navcontrol.taboptions)
      {
        for(var counter=0;counter<navcontrol["taboptions"].length;counter++)
        {
            var tab=navcontrol["taboptions"];
            var index=navigationHiddenTabs.indexOf(tab[counter].href);
            if(index<0)
            {
                navigationHiddenTabs.push(tab[counter].href);
            }
        }
        var index=navigationHiddenTabs.indexOf(tablink);
        if(index>=0)
        {
            navigationHiddenTabs.splice(index, 1);
        }
      }
      var rowIdsToHide=[];
      for(var counter=0;counter<=navigationHiddenTabs.length;counter++)
      {
        var link=navigationHiddenTabs[counter];
        if(navigationTabData[link])
        {
          var tabData=navigationTabData[link];
          for(var tabdtCounter=0;tabdtCounter<tabData.length;tabdtCounter++)
          {
           if(rowIdsToHide.indexOf(tabData[tabdtCounter].id)<0)
           {
            rowIdsToHide.push(tabData[tabdtCounter].id);
           }               
          }
        }
      }
      for(var counter=0;counter<data.length;counter++)
        {
          if(rowIdsToHide.indexOf(data[counter].id)>=0)
          {
            data[counter].display="none";
          }
          else
          {
            data[counter].display="block";  
          }
        }
        this.parent.setState({data: data});
        ControlActions.saveData(data);
    }
    saveNavigationData(pagelink,e)
    {
     if(!e) e=window.event;
     e.cancelBubble = true;
     if(e.stopPropagation) e.stopPropagation();
       var navObj=[];
       $.extend(navObj,this.parent.state.data);
       navigationData[pagelink]=navObj;
    }
    loadDataAsPerNavigation(pagelink,e)
    {    
     if(!e) e=window.event;
     e.cancelBubble = true;
     if(e.stopPropagation) e.stopPropagation();
     if(navigationData[pagelink])
     {
       var navObj=[];
       var newStateData=[];
       $.extend(navObj,navigationData[pagelink]);
       
        var data=this.parent.state.data;
            while(data.length > 1) {
                data.pop();
            }
       for(var counter=0;counter<navObj.length;counter++)
       {
            if(counter!=0)
            {
                data.push(navObj[counter]);
            }
       }
       this.parent.setState({data: data});
            ControlActions.saveData(data);
     }
     else
     {      
        var data=this.parent.state.data;
            while(data.length > 1) {
                data.pop();
            }
            this.parent.setState({data: data});
            ControlActions.saveData(data); 
            
     }
    }
    verifySectionColumnDivNumberChange(sectionControlDtls)
    {       
        var columncount = sectionControlDtls.columncount;
        var isColNumberChange=0;
        if (sectionControlDtls.element == "Section") {
            if (sectionControlDtls.columnDiv.length > columncount) {
                var deleteColumnNumder = sectionControlDtls.columnDiv.length - columncount;
                for (var counter = 0; counter < deleteColumnNumder; counter++) {
                    sectionControlDtls
                        .columnDiv
                        .pop();
                }
                isColNumberChange=1;
            }
            if (sectionControlDtls.columnDiv.length < columncount) {
                var addColumnNumder = columncount - sectionControlDtls.columnDiv.length;
                var colnumberfornewcol = sectionControlDtls.columnDiv.length;
                isColNumberChange=1;
                for (var counter = 0; counter < addColumnNumder; counter++) {
                    var sectionColumnDivOptions = {};
                    sectionColumnDivOptions = SectionColumnDiv.properties(sectionColumnDivOptions);
                    sectionColumnDivOptions['id'] = ID.uuid();
                    sectionColumnDivOptions['element'] = "SectionColumn";
                    sectionColumnDivOptions.htmlControls = [];
                    sectionColumnDivOptions.columnnumber = colnumberfornewcol;
                    sectionColumnDivOptions.rownumber = sectionControlDtls.rownumber;
                    colnumberfornewcol++;
                    sectionControlDtls
                        .columnDiv
                        .push(sectionColumnDivOptions);
                }
            }
        }
        if(isColNumberChange==1)
        {
            sectionControlDtls=this.setColumnClassAfterColNumberChange(sectionControlDtls);
        }
        return sectionControlDtls;
    }    
    setColumnClassAfterColNumberChange(sectionControlDtls)
    {
        var colcount=sectionControlDtls.columnDiv.length;
        //default set the blank
        for(var counter=0;counter<12;counter++)
        {
            var colToCheck="column"+(counter+1)+"class";
            sectionControlDtls[colToCheck]='';
        }

        for(var counter=0;counter<colcount;counter++)
        {
         var columnClass='col-xs-';
         if(colcount==1||colcount==2||colcount==3||colcount==4||colcount==6||colcount==12)
            columnClass=columnClass+ (12 / colcount);
         else
         {
            var colValue=Math.floor(12 / colcount);
            if((counter+1)<colcount)
              columnClass=columnClass+colValue;
            else
            {
              columnClass=columnClass+(12-(((colcount-1)*colValue)));
            }
         }
         var colToCheck="column"+(counter+1)+"class";
         sectionControlDtls[colToCheck]=columnClass;
        }
        return sectionControlDtls;
    }
    dragStart(selecteddata, e) {        
        e.dataTransfer.setData('Text','')
        draggedSourceControl = selecteddata;
        if(!e) e=window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
    }

    dataToUpdate(data){
        if(this.state.selectedView=='modalpopup'){
        this.setState({datamodalpopup: data});
        }
        else {
            this.setState({data: data});
        }
    }
    dataToRefer(){
        var dataToRefer=[];
        if(this.state.selectedView!='modalpopup'){
            dataToRefer= this.state.data;
        }
        else
        {
        if(this.state.datamodalpopupMapping[this.state.selectedModelDialog]){
            dataToRefer=this.state.datamodalpopupMapping[this.state.selectedModelDialog];
        }
        }
        return dataToRefer;
    }
    setSelectedControl(selecteddata, e)
    {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();

        if (selecteddata.element == "Section") {           
            selecteddata.borderClass = "row designer_selectrow";
            $.extend(selectedSectionRowControl,selecteddata) ;
            Toolbox.setSelectedRow(selectedSectionRowControl);
        }
        else if(selecteddata.element == "InnerSection") {
            $.extend(selectedSectionRowControl,selecteddata) ;
            Toolbox.setSelectedRow(selectedSectionRowControl);
        }    
        var dataToRefer=this.dataToRefer();
        // event.preventDefault()
        for (var dataCount = 0, len = dataToRefer.length; dataCount < len; dataCount++) {
            if (dataToRefer[dataCount]) {
                if(dataToRefer[dataCount].id!=selectedSectionRowControl.id)
                {
                  dataToRefer[dataCount].borderClass="row";
                }
                let columns = dataToRefer[dataCount].columnDiv;
                for (var columnIndex = 0, columnLen = columns.length; columnIndex < columnLen; columnIndex++) {
                   let controls = columns[columnIndex].htmlControls;
                   for (var controlIndex = 0, controlLen = controls.length; controlIndex < controlLen; controlIndex++) {
                   let control = controls[controlIndex];
                   if(dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].borderClass)
                   {
                   dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].borderClass=
                    dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].borderClass.replace('borderred', " ");
                   }
                   var childData=dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].childdata;
                   if(childData)
                   {
                      for(var childDataCounter=0;childDataCounter<childData.length;childDataCounter++)
                      {  
                       dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].childdata[childDataCounter].borderClass=                         
                       dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].childdata[childDataCounter].borderClass.replace('borderred', " ");
                      }
                   }             
                   if(selecteddata.parentcontrolid=="0"|| selecteddata.parentcontrolid===undefined)
                   {
                     if(selecteddata.id==control.id)
                      {                      
                       dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].borderClass ="borderred";
                      }
                   }
                   else
                   {
                       if(selecteddata.parentcontrolid==control.id)//found the parent control
                       {
                        var childData=dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].childdata;
                        if(childData)
                        {
                            for(var childDataCounter=0;childDataCounter<childData.length;childDataCounter++)
                            {                           
                             dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].childdata[childDataCounter].borderClass.replace('borderred', " ");
                             if(childData[childDataCounter].id==selecteddata.id)
                             {
                              dataToRefer[dataCount].columnDiv[columnIndex].htmlControls[controlIndex].childdata[childDataCounter].borderClass ="borderred";                              
                             }
                            }
                        }
                       }
                   }                  
                 }
                }
            }
        }        
        selectedHtmlControl = selecteddata;       
        this.setState({selectedControl: selecteddata});
       
    }
    generateHTML() {   
    var navData={};
    navData=$.extend(true,navData,navigationTabData);
    var navData1={};
    navData1=$.extend(true,navData1,navigationData);

      var isTemplateGeneration = false;  
      var isToolTemplateGeneration = false;   
      var nodestring = this.nodeToString(this.refs.generatedoutput);
      HtmloutputGenerator.generateHtmlOutput(nodestring,this.state.data, this.state.extraCss,
      this.state.globleCss,this.state.globlejs,this.state.globalcolor,this.state.bgglobalcolor,
       this.state.loginForm,navData1,navData,isTemplateGeneration,this.state.pageProperties,
    this.state.datamodalpopupMapping,this.state.globaldata,gloablAPIResponseData,this.state.extraJavascript,isToolTemplateGeneration);
    }
    generateTemplate(){
         var navData={};
    navData=$.extend(true,navData,navigationTabData);
    var navData1={};
    navData1=$.extend(true,navData1,navigationData);
        var isTemplateGeneration = true;
         var isToolTemplateGeneration = false;
        var nodestring = this.nodeToString(this.refs.generatedoutput);
        HtmloutputGenerator.generateHtmlOutput(nodestring,this.state.data, this.state.extraCss,
        this.state.globleCss,this.state.globlejs,this.state.globalcolor,this.state.bgglobalcolor, this.state.loginForm,
        navData1,navData,
         isTemplateGeneration,this.state.pageProperties,this.state.datamodalpopupMapping,this.state.globaldata,gloablAPIResponseData,this.state.extraJavascript,isToolTemplateGeneration);
    }
    toolTemplate(){
        var navData={};
    navData=$.extend(true,navData,navigationTabData);
    var navData1={};
    navData1=$.extend(true,navData1,navigationData);
        var isTemplateGeneration = true;
        var isToolTemplateGeneration = true;
        var nodestring = this.nodeToString(this.refs.generatedoutput);
        HtmloutputGenerator.generateHtmlOutput(nodestring,this.state.data, this.state.extraCss,
        this.state.globleCss,this.state.globlejs,this.state.globalcolor,this.state.bgglobalcolor, this.state.loginForm,
        navData1,navData,
         isTemplateGeneration,this.state.pageProperties,this.state.datamodalpopupMapping,this.state.globaldata,gloablAPIResponseData,this.state.extraJavascript,isToolTemplateGeneration);
    }
    expandcollapse(){
        if($('#btnExpand').text()=="Collapse")
        {
            $('#btnExpand').text('Expand');
            $('.PanelDiv').hide();
              var wHeight = $(window).height() - 235;
            var wWidth = $(window).width();
            if (wHeight > 250) {
                
                $('#toolboxcontrol, #designer, #divproperty').css({
                    'overflow-y': 'scroll'
                });
                $('#designer, #divproperty').height(wHeight+150);
                $('#toolboxcontrol').height(wHeight + 160);
            } 
        }
        else
        {
            $('#btnExpand').text('Collapse');
            $('.PanelDiv').show();
             var wHeight = $(window).height() - 200;
            var wWidth = $(window).width();
            if (wHeight > 250) {
                
                $('#toolboxcontrol, #designer, #divproperty').css({
                    'overflow-y': 'scroll'
                });
                $('#designer, #divproperty').height(wHeight);
                $('#toolboxcontrol').height(wHeight + 140);
              
            }
        }
    }
    clearNavTabConfiguration()
    {
      navigationData={};
      navigationTabData={};
      navigationHiddenTabs=[];
    }
    newHTML(){
      var userconfirm=confirm("Are you sure you want to clear?");
      
      if(userconfirm==true) {
          var data=this.state.data;
          while(data.length > 0) {
              data.pop();
          }
          this.clearNavTabConfiguration();
          this.setState({data: data});
          this.setState({selectedControl: []});

          this.setState({datamodalpopup: []});
          this.setState({datamodalpopupMapping: []});
          this.setState({modalpopupnames: []});
          this.setState({selectedView: 'designer'});

          this.setState({extraCss: []});
           this.setState({globleCss: []});
           this.setState({globlejs: []});
           $('#designer').css("color",'');
           $('#designer').css("background",'');
           $('#designer .row').css("background",'');
           $('#designer').css("font-family",'');
           this.setState({globalcolor: '#000'});
           this.setState({bgglobalcolor: '#fff'});
            $("#globalFontfield").val('');
            $("#globaljsonurlfield").val('');
            $('#chkLogin').prop('checked', false);
           this.setState({globalStyle: []});
          this.setState({loginForm: {"rownumber":0,"columncount":"1","borderClass":"row designer_selectrow","class":"row","global_json":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","id":"B5D47194-64D8-44AC-8EE4-2C91A142A0F6","element":"Section","static":true,"required":false,"columnnumber":0,"columnDiv":[{"rownumber":0,"columncount":"1","borderClass":"row","class":"col-md-12","global_json":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","id":"17DE1261-C436-4AF8-83F5-8FC534D8D2CC","element":"SectionColumn","htmlControls":[{"accesskey":"","autofocus":false,"notRemovable":true,"name":"","src":"./images/default-placeholder.png","tabindex":"","title":"","height":"","width":"","draggable":"","class":" ","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","alt":"","style_underline":"","style_overline":"","style_linethrough":"","rownumber":0,"columnnumber":0,"style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","parentcontrolid":"0","borderClass":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","events_onblur":{"event":"onblur","methodname":"","method":""},"events_onchange":{"event":"onchange","methodname":"","method":""},"events_onclick":{"event":"onclick","methodname":"","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onfocus":{"event":"onfocus","methodname":"","method":""},"events_onload":{"event":"onload","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"div_stylefloat":"none","div_stylewidth":"","div_class":"","div_style_float":"none","id":"8FDA60E8-F35D-4866-814B-A3D98E071D43","element":"Image","required":false,"field_name":"image_006667D4-FB47-4B90-8EE1-830EF826FBCD"},{"class":"form-control","notRemovable":true,"accesskey":"","autofocus":false,"name":"","placeholder":"","tabindex":"","title":"","controlid":"loginformusernamefield","content":"Label","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","input_type":"text","style_underline":"","style_overline":"","style_linethrough":"","rownumber":0,"columnnumber":0,"parentcontrolid":"0","style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","form_type":"","borderClass":"","div_stylefloat":"none","div_stylewidth":"","div_class":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","events_onblur":{"event":"onblur","methodname":"","method":""},"events_onchange":{"event":"onchange","methodname":"","method":""},"events_onclick":{"event":"onclick","methodname":"","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onfocus":{"event":"onfocus","methodname":"","method":""},"events_onkeydown":{"event":"onkeydown","methodname":"","method":""},"events_onkeypress":{"event":"onkeypress","methodname":"","method":""},"events_onkeyup":{"event":"onkeyup","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"events_onselect":{"event":"onselect","methodname":"","method":""},"id":"loginformusernamefield","element":"TextInput","required":false},{"class":"form-control","accesskey":"","notRemovable":true,"autofocus":false,"name":"","placeholder":"","tabindex":"","title":"","controlid":"loginformpasswordfield","content":"Label","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","input_type":"text","style_underline":"","style_overline":"","style_linethrough":"","rownumber":0,"columnnumber":0,"parentcontrolid":"0","style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","form_type":"","borderClass":"","div_stylefloat":"none","div_stylewidth":"","div_class":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","events_onblur":{"event":"onblur","methodname":"","method":""},"events_onchange":{"event":"onchange","methodname":"","method":""},"events_onclick":{"event":"onclick","methodname":"","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onfocus":{"event":"onfocus","methodname":"","method":""},"events_onkeydown":{"event":"onkeydown","methodname":"","method":""},"events_onkeypress":{"event":"onkeypress","methodname":"","method":""},"events_onkeyup":{"event":"onkeyup","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"events_onselect":{"event":"onselect","methodname":"","method":""},"id":"loginformpasswordfield","element":"TextInput","required":false},{"accesskey":"","notRemovable":true,"form":"","formaction":"","formenctype":"","loginAPI":"","formmethod":"","formnovalidate":false,"formtarget":"","buttontype":"submit","content":"Button","contenteditable":false,"draggable":false,"hidden":false,"name":"","tabindex":false,"title":"","class":"btn btn-default","controlid":"","onClick":"aurionprologin()","style":{},"style_fontSize":"","style_fontFamily":"","style_fontWeight":"","style_fontStyle":"","style_fontVariant":"","style_textTransform":"","style_color":"","style_backgroundColor":"","style_backgroundImage":"","style_backgroundRepeat":"","style_backgroundattachment":"","style_backgroundxposition":"","style_backgroundyposition":"","style_position":"","style_zIndex":"","style_width":"","style_height":"","style_top":"0px","style_right":"","style_bottom":"","style_left":"0px","style_border":"","style_borderRadius":"","style_borderTop":"","style_borderBottom":"","style_borderRight":"","style_borderLeft":"","rownumber":0,"columnnumber":0,"parentcontrolid":"0","style_margin":"","style_padding":"","style_textAlign":"","style_lineHeight":"","borderClass":"","div_stylefloat":"none","div_stylewidth":"","div_class":"","events_onclick":{"event":"onclick","methodname":"aurionprologin()","method":""},"events_oncontextmenu":{"event":"oncontextmenu","methodname":"","method":""},"events_ondblclick":{"event":"ondblclick","methodname":"","method":""},"events_onmousedown":{"event":"onmousedown","methodname":"","method":""},"events_onmouseout":{"event":"onmouseout","methodname":"","method":""},"events_onmouseover":{"event":"onmouseover","methodname":"","method":""},"events_onmouseup":{"event":"onmouseup","methodname":"","method":""},"events_onsubmit":{"event":"onsubmit","methodname":"","method":""},"id":"0AA65169-AAC9-46E8-A057-BB40698E5FC3","element":"Button","static":true,"required":false}],"columnnumber":0,"colnumber":0}]},});
          ControlActions.saveData(data);
      }
    }
    exportDesign(){
        var exportData={};
     
        exportData.navigationTabData=navigationTabData;
        exportData.pageProperties=this.state.pageProperties;
        exportData.datamodalpopup=this.state.datamodalpopup;
        exportData.datamodalpopupMapping=this.state.datamodalpopupMapping;
        exportData.modalpopupnames=this.state.modalpopupnames;
        exportData.selectedView=this.state.selectedView;
        exportData.selectedModelDialog=this.state.selectedModelDialog;
        exportData.designerData=this.state.data;
        var GlobalStyle={};
        GlobalStyle.globlejs=this.state.globlejs;
        GlobalStyle.globleCss=this.state.globleCss;
        GlobalStyle.extraCss=this.state.extraCss;
        GlobalStyle.extraJavascript=this.state.extraJavascript;
        GlobalStyle.globalcolor=this.state.globalcolor;
        if(this.state.bgglobalcolor=='#fff' || this.state.bgglobalcolor == '#ffffff')
        {
            this.state.bgglobalcolor='';
        }
        GlobalStyle.bgglobalcolor=this.state.bgglobalcolor;
        GlobalStyle.globaljsonurl=$("#globaljsonurlfield").val();
        GlobalStyle.globalFont=$("#globalFontfield").val();
        GlobalStyle.EnableLogin=$('#chkLogin').is(":checked")
        exportData.GlobalStyle=GlobalStyle;
        exportData.loginForm = this.state.loginForm;
        HtmloutputGenerator.exportDesignToJsonFile(exportData);
    }
    handleImportFile(e, results)
    {
        results.forEach(result => {
        const [e, file] = result;
       // var filedetails=e.target.result;
        var filedetails=this.isValidJSON(e.target.result) ;
       
        if(filedetails){
            var designerData=filedetails.designerData;
            navigationTabData=filedetails.navigationTabData;
           var  GlobalStyle=filedetails.GlobalStyle;
           var idatamodalpopup=filedetails.datamodalpopup;
           var idatamodalpopupMapping=filedetails.datamodalpopupMapping;
           var imodalpopupnames=filedetails.modalpopupnames;
           var iselectedView=filedetails.selectedView;
           var iselectedModelDialog=filedetails.selectedModelDialog;
           $("#globaljsonurlfield").val(GlobalStyle.globaljsonurl);
           this.setState({extraCss: GlobalStyle.extraCss});
           this.setState({globleCss: GlobalStyle.globleCss});
           this.setState({globlejs: GlobalStyle.globlejs});
            this.setState({extraJavascript: GlobalStyle.extraJavascript});
           this.setState({datamodalpopup: idatamodalpopup});
           this.setState({datamodalpopupMapping: idatamodalpopupMapping});
           this.setState({modalpopupnames: imodalpopupnames});
           this.setState({selectedView: iselectedView});
           this.setState({selectedModelDialog: iselectedModelDialog});
            $('#my-file-input').val('');
            this.setState({data: designerData});
            
            this.setState({pageProperties: filedetails.pageProperties});
            // this.setState({extraCss: GlobalStyle.extraCss});
            // this.setState({globleCss: GlobalStyle.globleCss});
            // this.setState({globlejs: GlobalStyle.globlejs});
            //  this.setState({extraJavascript: GlobalStyle.extraJavascript});

            this.setState({globalcolor: GlobalStyle.globalcolor});
            this.setState({bgglobalcolor: GlobalStyle.bgglobalcolor});
             $('#designer').css("color",GlobalStyle.globalcolor); 
             $('#designer').css("background",GlobalStyle.bgglobalcolor);
             $('#designer .row').css("background",GlobalStyle.bgglobalcolor);
             if(filedetails.loginForm)
             this.setState({loginForm: filedetails.loginForm});
            
            $("#globalFontfield").val(GlobalStyle.globalFont);
              $('#chkLogin').prop('checked', GlobalStyle.EnableLogin);
              if($('#globaljsonurlfield').val()!=null && $('#globaljsonurlfield').val()!=undefined)
              {
                  this.callapi();
              }
           ControlActions.setselectedView(iselectedView);
          ControlActions.loadModalPopUpData(imodalpopupnames,idatamodalpopupMapping,
            idatamodalpopup);
            ControlStore.load(designerData);
            this.applyGlobalStyle();
        }
        else {
          //toast to user that json is not valid
          $('#my-file-input').val('');  // this will enable the filereader to invoke the onChange
          notify.show('Please provide valid JSON!');
        }
    });
   
}
handleLocalJsonFile(e, results)
    {
           var filename=results[0][1].name;
           $('#txtLocalJson').val(results[0][1].name);
        results.forEach(result => {
        const [e, file] = result;
        var filedetails=this.isValidJSON(e.target.result) ;
        if(filedetails){
            var localJsonData=filedetails;
            $('#my-file-localjsoninput').val('');  // this will enable the filereader to invoke the onChange
            this.setState({globaldata: localJsonData});
            if($('#globaljsonurlfield').val()=='' )
            {
                gloablAPIResponseData = localJsonData;
            }
        }
        else {
          //toast to user that json is not valid
          $('#my-file-localjsoninput').val('');  // this will enable the filereader to invoke the onChange
          $('#txtLocalJson').val('');
          notify.show('Please provide valid JSON!');
        }
    });
}

    isValidJSON(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }
    moveUpcontrol(selecteddata, e) {
      if(!e) e=window.event;
      e.cancelBubble = true;
      if(e.stopPropagation) { e.stopPropagation(); }
       if(selecteddata.element=="Section")//reste the navigation tab setting
        {
            this.clearNavTabConfiguration();
        }
         ControlActions.moveElement(selecteddata, 1);
    }
    moveDowncontrol(selecteddata, e) {       
        if(!e) e=window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) { e.stopPropagation(); }
        if(selecteddata.element=="Section")//reste the navigation tab setting
        {
            this.clearNavTabConfiguration();
        }
         ControlActions.moveElement(selecteddata, 0);
    }
    removecontrol(selecteddata, e)
    {
        var e = window.event || e;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
       
         ControlActions.deleteElement(selecteddata);
    }
    clonecontrol(selecteddata,e){
        var e = window.event || e;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
        ControlActions.copyElement(selecteddata);
        // this.setState({data: data});
        //setSelectedControl(selecteddata)        
    }
    nodeToString(node) {
        var tmpNode = document.createElement("div");
        tmpNode.appendChild(node.cloneNode(true));
        var str = tmpNode.innerHTML;
        tmpNode = node = null; // prevent memory leaks in IE
        return str;
    }
    updateHtmlControlOnDragDropForInnerSectionPanel(innerSection,selectedelement){
    
    var iscontrolRemoved=false;
    var iscontrolAppend=false;
   
    //remove the dragged control
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
    if(innerSection.columnDiv[colCounter].columnnumber==draggedSourceControl.columnnumber)
      {
      for(var htmlcounter=0;htmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;htmlcounter++)
       {
       if(innerSection.columnDiv[colCounter].htmlControls[htmlcounter].id==draggedSourceControl.id)
        {
        innerSection.columnDiv[colCounter].htmlControls.splice(htmlcounter, 1);
        iscontrolRemoved=true;
        break;
        }
       }
    break;
      }
    }
    //append the dragged control
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
    if(innerSection.columnDiv[colCounter].columnnumber==selectedelement.columnnumber)
      {
        for(var htmlcounter=0;htmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;htmlcounter++)
       {
       
        if(innerSection.columnDiv[colCounter].htmlControls[htmlcounter].id==selectedelement.id)
        {
         
        draggedSourceControl.parentelement=selectedelement.element;
        draggedSourceControl.parentcontrolid=selectedelement.id;
        draggedSourceControl.columnnumber=selectedelement.columnnumber;
        innerSection.columnDiv[colCounter].htmlControls[htmlcounter].childdata.push(draggedSourceControl);
        break;
        }
       }break;
      }
    }

    return innerSection;

    }
    updateHtmlControlOnDragDropForInnerSection(innerSection,selectedelement)
    {
   
    var iscontrolRemoved=false;
    var iscontrolAppend=false;
   
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
      if(innerSection.columnDiv[colCounter].columnnumber==selectedelement.columnnumber)
      {
      
       for(var htmlcounter=0;htmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;htmlcounter++)
       {
       
        if(innerSection.columnDiv[colCounter].htmlControls[htmlcounter].id==selectedelement.id)
        {
        innerSection.columnDiv[colCounter].htmlControls.splice(htmlcounter, 1);
        iscontrolRemoved=true;
        break;
        }
       }
        break;
      }
    }
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
      if(innerSection.columnDiv[colCounter].columnnumber==droponColumnNumber)
      {
        selectedelement.columnnumber=droponColumnNumber;
        innerSection.columnDiv[colCounter].htmlControls.push(selectedelement);
      }
    }
    return innerSection;
    }
    updateDataOnDragDropForInnerSection(preview) {
        var data=this.dataToRefer();
        var selectedelement=this.state.selectedControl;        
        var isDone=false;
       
        if((selectedelement.element=='Panel' &&
        draggedSourceControl.element!='Panel')||
     (selectedelement.element=='Forms' &&
        draggedSourceControl.element!='Forms')){
        this.updateDataOnDragDropForInnerSectionPanelAppend(preview);
        }
    else
      {
        for(var rowCounter=0;rowCounter<data.length;rowCounter++)
        {
         if(data[rowCounter].rownumber==selectedelement.parentrownumber)//found the row
          {
          
            for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
            {
            if(data[rowCounter].columnDiv[colCounter].columnnumber==selectedelement.parentcolumnnumber)
             {
          
            for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
               {
                if(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].id==selectedelement.parentcontrolid)
                {
                 data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter]=
                    preview.updateHtmlControlOnDragDropForInnerSection(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter],
                    selectedelement);
                 isDone=true;
                    break;
                }
               }
             }
            if(isDone)break;
            }
          }
        if(isDone)break;
        }
      }
      this.dataToUpdate(data);
      // ControlActions.saveData(data);
    }
    droponInnerColumnDiv(targetdata,preview, e) {
 
    if(targetdata&&targetdata.element=='InnerSectionColumn')
    {
    var dropedcontrolid = e.dataTransfer.getData("Text");
    var isdragFromToolbox=false;
    if(dropedcontrolid){if(dropedcontrolid.length>=1)isdragFromToolbox=true}
  
     var selectedControl=preview.state.selectedControl;    
   droponColumnNumber=targetdata.columnnumber;
    if(selectedControl.element!="InnerSection"){
      
      if(!isdragFromToolbox){
        preview.updateDataOnDragDropForInnerSection(preview);
      }
     }
    }
    }
    droponColumnDiv(targetdata, e) {
     if(targetdata&&targetdata.element!='InnerSectionColumn'&&
    this.state.selectedControl.element!='InnerSection')
    {
       var dropedcontrolid = e.dataTransfer.getData("Text");
       droponColumnNumber=targetdata.colnumber; 
       var isdragFromToolbox=false;
       if(dropedcontrolid){if(dropedcontrolid.length>=1)isdragFromToolbox=true}
     
       if(!isdragFromToolbox)//dragdrop - not from toolbox
       {
           droppedTargetControl = targetdata;
            // event.preventDefault();       
            if(this.state.selectedControl.element=="Panel"&&
            draggedSourceControl.element!="Panel"
            &&this.state.selectedControl.rownumber==draggedSourceControl.rownumber)
            {               
                draggedSourceControl.parentelement='Panel';
                this.updateDataOnDragDropForPanelAppend();
            }
            else if(this.state.selectedControl.element=="Forms"&&
            draggedSourceControl.element!="Forms"
            &&this.state.selectedControl.rownumber==draggedSourceControl.rownumber)
            {
                draggedSourceControl.parentelement='Forms';
                this.updateDataOnDragDropForPanelAppend();
            }
             else if(this.state.selectedControl.element=="Collapsible"&&
            draggedSourceControl.element!="Collapsible"
            &&this.state.selectedControl.rownumber==draggedSourceControl.rownumber)
            {
                draggedSourceControl.parentelement='Forms';
                this.updateDataOnDragDropForPanelAppend();
            }
            else
            {
                this.updateDataOnDragDropForColumnChange();
            } 
       }
     }
    }
    updateDataOnDragDropForInnerSectionPanelAppend(preview)
    {
        var data=this.dataToRefer();
        var selectedelement=this.state.selectedControl;        
        var iscontrolRemoved=false;
        var iscontrolAppend=false;
        var isDone=false;
         //find the panel and append the child element
        for(var rowCounter=0;rowCounter<data.length;rowCounter++)
        {
        if(data[rowCounter].rownumber==selectedelement.parentrownumber)//found the row
          {
            for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
            {
            if(data[rowCounter].columnDiv[colCounter].columnnumber==selectedelement.parentcolumnnumber)
             {
             
            for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
               {
                if(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].id==selectedelement.parentcontrolid)
                {
                data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter]=
                 preview.updateHtmlControlOnDragDropForInnerSectionPanel(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter],
                    selectedelement);
                    isDone=true;
                    break;
                }
               }
             }
            }
          }
        }
    }
    updateDataOnDragDropForPanelAppend()
    {
        var data=this.dataToRefer();
        var selectedelement=this.state.selectedControl;        
        var iscontrolRemoved=false;
        var iscontrolAppend=false;
        
        //find the panel and append the child element
        for(var rowCounter=0;rowCounter<data.length;rowCounter++)
        {
          if(data[rowCounter].rownumber==selectedelement.rownumber)//found the row
          {
            //find the html control and remove it from original state/position
            for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
            {
             // check with draggedSourceControl
             if(data[rowCounter].columnDiv[colCounter].columnnumber==draggedSourceControl.columnnumber)
             {
               for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
               {
                 if(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].id==draggedSourceControl.id)
                 {
                   data[rowCounter].columnDiv[colCounter].htmlControls.splice(htmlcounter, 1);
                   iscontrolRemoved=true;
                   break;
                 }
               }
               break;
             }
            }
            
            for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
            {
             if(data[rowCounter].columnDiv[colCounter].columnnumber==selectedelement.columnnumber)
             { 
                            
                //find the panel selected and append the control to child
                for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
                {
                 if(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].id==selectedelement.id)
                 {                  
                    draggedSourceControl.parentcontrolid=selectedelement.id;
                    draggedSourceControl.columnnumber=selectedelement.columnnumber;
                    data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].childdata.push(draggedSourceControl);
                    iscontrolAppend=true;
                   break;
                 }
                }
                break;            
              }
            }
            break;
          }
        }
        if(iscontrolRemoved && iscontrolAppend)
        {
         this.dataToUpdate(data);
         // ControlActions.saveData(data);
        }
    }     
    updateDataOnDragDropForColumnChange()
    {
   
       if ((draggedSourceControl.columnnumber==droppedTargetControl.columnnumber)||
       (draggedSourceControl.rownumber!=droppedTargetControl.rownumber))
          return;

       var data=this.dataToRefer();
       for(var rowCounter=0;rowCounter<data.length;rowCounter++)
       {
            if(data[rowCounter].rownumber==draggedSourceControl.rownumber)//found the row
            {
               //loop to remove the html control from source column               
               for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
               { 
                   if(data[rowCounter].columnDiv[colCounter].columnnumber==draggedSourceControl.columnnumber)
                   {
                    //find the html control and remove item
                    for(var htmlcounter=0;htmlcounter<data[rowCounter].columnDiv[colCounter].htmlControls.length;htmlcounter++)
                    {
                        if(data[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].id==draggedSourceControl.id)
                        {
                            data[rowCounter].columnDiv[colCounter].htmlControls.splice(htmlcounter, 1);
                        }
                    }
                   }
               }
               //loop to add source control to target column
               for(var colCounter=0;colCounter<data[rowCounter].columnDiv.length;colCounter++)
               { 
                   if(data[rowCounter].columnDiv[colCounter].columnnumber==droppedTargetControl.columnnumber)
                   {
                    draggedSourceControl.columnnumber=droppedTargetControl.columnnumber;
                   draggedSourceControl=this.UpdateInnerSectionControls(draggedSourceControl);
                    data[rowCounter].columnDiv[colCounter].htmlControls.push(draggedSourceControl);
                   }
               }
            }
       }
      this.dataToUpdate(data);
      // ControlActions.saveData(data);
    }
    UpdateInnerSectionControls(innerSection)
    {
    if(innerSection.element=='InnerSection'){
        for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
        {
            for(var htmlcounter=0;htmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;htmlcounter++)
            {
                innerSection.columnDiv[colCounter].htmlControls[htmlcounter].parentcolumnnumber=
                innerSection.columnnumber;
            }
        }
    }
    return innerSection;
    }
    preventDefault(e) {    
       if(!e)
       e=window.event;
        e.preventDefault();       
    }
    renderColumnDiv(colDetails, colnumber)
    {   
        
        colDetails.colnumber=colnumber;
        return (
            <div className="coldiv"
                id={ID.uuid()}
                onDrop={this
                .droponColumnDiv
                .bind(this, colDetails)}
                onDragOver={this.preventDefault.bind()}
                className={colDetails.class}
                key={ID.uuid()}
                style={{
                border: '1px dashed #727272',
                 minHeight: "50px"
            }}>
                {colDetails
                    .htmlControls
                    .map(item => 
                    {                      
                        return this.mapHtmlControl(item, this)
                    })
				}
            </div>
        )
    }
    mapHtmlControl(item,preview)
    {
    switch (item.element) {
        case "Header":
        return <Header 
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
        case "Label":
        return <Label
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
            key={item.id}/>
        case "Paragraph":
        return <Paragraph
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "LineBreak":
        return <LineBreak
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "Dropdown":
        return <Dropdown
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id} globaldata={preview.state.globaldata}/>
        case "Tags":
        return <Tags
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            key={item.id}/>
        case "Checkboxes":
        return <Checkboxes
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "RadioButtons":
        return <RadioButtons
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "TextInput":
        return <TextInput
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "NumberInput":
        return <NumberInput
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "TextArea":
        return <TextArea
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "Image":
        return <Image
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            editModeOn={preview.props.editModeOn}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>

        case "ImageCarousal":
        return <ImageCarousal
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            editModeOn={preview.props.editModeOn}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>

        case "FBIcon":
        return <FBIcon
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            editModeOn={preview.props.editModeOn}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>

        case "TWIcon":
        return <TWIcon
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            editModeOn={preview.props.editModeOn}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>

        case "YouTubeIcon":
        return <YouTubeIcon
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            editModeOn={preview.props.editModeOn}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>

        case "YouTubeEmbed":
        return <YouTubeEmbed
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            editModeOn={preview.props.editModeOn}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>

        case "Rating":
        return <Rating
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            key={item.id}/>
        case "DatePicker":
        return <DatePicker
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "HyperLink":
        return <HyperLink
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
        case "Download":
        return <Download
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            key={item.id}/>
        case "Range":
        return <RangeControl
            mutable={false}
            parent={preview.props.parent}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            editModeOn={preview.props.editModeOn}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            key={item.id}/>
        case "Button":
        return <Button
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
            key={item.id}/>
        case "ButtonGroup":
        return <ButtonGroup
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
            key={item.id}/>
        case "GoogleMap":
        return <GoogleMap
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
            key={item.id}/>
        case "Graph":
        return <Graph
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
            key={item.id} globaldata={preview.state.globaldata}/>
        case "Tab":
        return <Tab 
            mutable={false}
            parent={preview}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            saveNavigationTabData={preview.saveNavigationTabData} 
            getNavigationTabRowNumbers={preview.getNavigationTabRowNumbers}
            loadDataAsPerNavigationTab={preview.loadDataAsPerNavigationTab}
            key={item.id}/>
        case "Navbar":
        return <Navbar 
            mutable={false}
            parent={preview}
            data={item} 
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            isDraggable={true}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id} saveNavigationData={preview.saveNavigationData}
            loadDataAsPerNavigation={preview.loadDataAsPerNavigation}/>
        case "Forms":
        return <Forms
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
            key={item.id}/>

        case "Panel":
        return <Panel
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
            key={item.id}/>
            
        case "Table":
        return <Table
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
            key={item.id}
            globaldata={preview.state.globaldata}/>
        case "ListGroup":
        return <ListGroup
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
            key={item.id} globaldata={preview.state.globaldata}/>
        case "LoginForm":
            return <LoginForm
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
            key={item.id}/>
        case "Calendar":
            return <Calendar
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
            key={item.id}/>
        case "QRcode":
            return <QRcode
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
            key={item.id} globaldata={preview.state.globaldata}/>
        case "Barcode":
            return <Barcode
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
            key={item.id} globaldata={preview.state.globaldata}/>
        case "Collapsible":
            return <Collapsible
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
            key={item.id}/>
        case "Progressbar":
            return <Progressbar
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
            key={item.id}/>
	case "InnerSection":
            return <InnerSection
            mutable={false} mapHtmlControl={preview.mapHtmlControl}
            parent={preview}
            data={item}
            dragStart={preview.dragStart}
            setSelectedControl={preview.setSelectedControl}
            droponInnerColumnDiv={preview.droponInnerColumnDiv}
            isDraggable={true} preventDefault={preview.preventDefault}
            removecontrol={preview.removecontrol}
            clonecontrol = {preview.clonecontrol}
            moveUpcontrol = {preview.moveUpcontrol}
            moveDowncontrol = {preview.moveDowncontrol}
            key={item.id}/>
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
            key={item.id} globaldata={preview.state.globaldata}/>
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
            key={item.id} globaldata={preview.state.globaldata}/>

    }
    }
    renderSectionDiv(itemData, notRemovable)
    {      
        

        var columnData = [];
        var colCount = itemData.columnDiv.length;
        for (let i = 0; i < colCount; i++) {
            var colToCheck="column"+(i+1)+"class";
            var columnClass = itemData[colToCheck];
            itemData.columnDiv[i].class=columnClass;
            columnData.push(this.renderColumnDiv(itemData.columnDiv[i], i));
        }
        var rowDisplay='block';
        var rowStyle=Section.getRowInlineStyle(itemData);
        if(itemData.display)rowDisplay=itemData.display;
        rowStyle.minHeight= "50px";
        rowStyle.minwidth= "800px";
        rowStyle.overflow= "hidden";
        rowStyle.display=rowDisplay;
        return (
            <div
                key={itemData.id?itemData.id:ID.uuid()}
                id={ID.uuid()}
                className={itemData.borderClass + itemData.class}
                style={rowStyle}
                onDoubleClick={this
                .setSelectedControl
                .bind(this, itemData)}>
                {columnData}
                <div  style={{"float":"left","clear":"both"}} >
                <span className="glyphicon glyphicon-upload delete-icon" onClick={this
                .moveUpcontrol
                .bind(this, itemData)}></span>
                 <span className="glyphicon glyphicon-download delete-icon" onClick={this
                .moveDowncontrol
                .bind(this, itemData)}></span>
                <span  className="glyphicon glyphicon-remove delete-icon" onClick={this
                .removecontrol
                .bind(this, itemData)}></span>
                <span  className="glyphicon glyphicon-copy" onClick={this
                .clonecontrol
                .bind(this, itemData)}></span>
                <span style={{"marginLeft":"5px"}}>Row {itemData.rownumber}</span>
                </div>
            </div>
        )
    }
    droponDesigner(e) {   
        if(!e)
        {
             e= window.event;
        }
        if(e.preventDefault) { e.preventDefault(); }
        if(e.stopPropagation) { e.stopPropagation(); }
        // var e = window.event || e;
         var dropedcontrolid;
         if (e.dataTransfer)
           dropedcontrolid = e.dataTransfer.getData("Text");
         else 
           dropedcontrolid = e.dragcontrolid;
         var item ={};
         item.key=dropedcontrolid;
         item.field_name='';
         item.static='static';
         var options = Toolbox.elementOptionsForCreateControl(item);
         var elementOptions=options.elementOptions;
         var sectionColumnDivOptions=options.sectionColumnDivOptions;
         
           elementOptions['rownumber'] = 0;
           elementOptions['columnnumber']=droponColumnNumber;
           elementOptions['parentrownumber'] = '';
           elementOptions['parentcolumnnumber'] = '';
           ControlActions.createElement(elementOptions, selectedHtmlControl, sectionColumnDivOptions);
     }
    allowDrop(e) {         
      if(!e) e=window.event;  
      e.preventDefault();
    }
     colorcloseHandler(colors)
    {     
      this.updateControl();
      
    }
     colorchangeHandler(colors)
    {     
        this.setState({globalcolor: colors.color}); 
         var gStyle=this.state.globalStyle;
        gStyle["color"]= colors.color;
        this.setState({globalStyle:gStyle}); 
        $('#designer').css("color",colors.color);
    }

    globalFont(font)
    {
        var gStyle=this.state.globalStyle;
        gStyle["font"]=($("#globalFontfield").val()).trim();
        this.setState({globalStyle:gStyle}); 
        $('#designer').css("font-family",($("#globalFontfield").val()).trim());

    }
    globalBackground()
    {
         var gStyle=this.state.globalStyle;
       // gStyle["backgroundColor"]=($("#globalbackgroundfield").val()).trim();
       // this.setState({globalStyle:gStyle}); 
        $('#designer').css("background",($("#globalbackgroundfield").val()).trim());
        $('#designer .row').css("background",($("#globalbackgroundfield").val()).trim());
    }
     bgcolorchangeHandler(colors)
    {     
        this.setState({bgglobalcolor: colors.color}); 
         var gStyle=this.state.globalStyle;
       // gStyle["backgroundColor"]=($("#globalbackgroundfield").val()).trim();
       // this.setState({globalStyle:gStyle}); 
        $('#designer').css("background",colors.color);
        $('#designer .row').css("background",colors.color);
    }
    onModalNameBur() {
        ControlStore.setSelectedModalName('');
    this.setState({selectedModelDialog: ''});
    this.setState({datamodalpopup: []});
    ControlActions.loadModalPopUpData(null,null,[]);
    }
    selectModalPopUpDesign(val,e)
    {
    var v= e.target[val];
    var newData=[];
    if(this.state.datamodalpopupMapping[v]){
     newData=this.state.datamodalpopupMapping[v];
    }
    ControlStore.setSelectedModalName(v);
    this.setState({selectedModelDialog: v});
    this.setState({datamodalpopup: newData});
    ControlActions.loadModalPopUpData(null,null,newData);
    }
    saveModalPopUpDesign(e)
    {
    var el = document.getElementById('modalname');
    this.setState({selectedModelDialog: el.value});
    ControlStore.setSelectedModalName(el.value);
    if(this.state.datamodalpopupMapping[el.value]){
        //this.state.datamodalpopupMapping[el.value]=
    //this.state.datamodalpopup;
    }
    else {
      let newStateData=this.state.datamodalpopupMapping;
      newStateData[el.value]=[];
      this.setState({datamodalpopupMapping: newStateData});
      let newModalpopupnames= this.state.modalpopupnames;
      newModalpopupnames.push(el.value);
     this.setState({modalpopupnames: newModalpopupnames});
     ControlActions.loadModalPopUpData(newModalpopupnames,
     this.state.datamodalpopupMapping,[]);

    }
    ControlActions.setselectedView('modalpopup');
   
 }
renderModalPopupDesignerData()
{
  
    return(
        <div>
        {
            this.state.datamodalpopup.map(item => {
          switch (item.element) {
               case "Section":
                    var sectionData = this.renderSectionDiv(item, false);
                    return sectionData;
          }
        })
        }
        </div>
    )
}
    renderModalPopupDesigner()
    {
        
        let selectedModalData=[];
 
        return(
    
    <div className="row" >
        <div className="row">
        <div className="col-xs-4">
        Select
        <select value={this.state.selectedModelDialog} onChange={this
            .selectModalPopUpDesign
            .bind(this,'value')}>
           
        {this.state.modalpopupnames
         .map(function (option) {
             return <option value={option} key={option}>{option}</option>;
        })}
                </select>
        </div>
        <div className="col-xs-4">
        Name : <input type="input" id="modalname" onBlur={this.onModalNameBur.bind(this)}/>
        </div>
        <div className="col-xs-4">
        <input type="button" value="Save"
         onClick={this.saveModalPopUpDesign.bind(this)}/>
        </div>
        </div>
        
         <div className="row rowWithoutMargin">
         <div  onDragOver={this.allowDrop.bind()} onDrop={this.droponDesigner.bind()}
       className="p15"
        id='designer'   ref="generatedoutput">
       { 
           this.renderModalPopupDesignerData()
      }
     </div>
        </div>
    </div>
       
        );
    }
    setselectedView(view)
    {
       this.setState({selectedView: view});
       ControlActions.setselectedView(view);
    }
    render()
    {
        // let pageStyles=Page.getPageInlineStyle(this.state.pageProperties);
       
        return (
            <div className='w85percent pull-right'>
                <div style={{"float":"right"}}>
                      <button id="btnExpand" className='pull-right'  className="btn btn-sm btn-default"
                       onClick={this
                      .expandcollapse
                      .bind(this)}>Collapse</button>
                    </div>
                   
                <div className="PanelDiv" style={{"clear":"both"}}>
              <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default"
                       onClick={this
                      .generateHTML
                      .bind(this)}>Save</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" onClick={() => this.openModalWindow()}>CSS</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" onClick={() => this.openModalJSWindow()}>JS</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" onClick={this
                      .newHTML
                      .bind(this)}>New</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" onClick={() => this.openGlobleModalWindow()}>External CSS</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button  className="btn btn-sm btn-default" onClick={() => this.openGlobleJsModalWindow()}>External JS</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" onClick={this
                      .exportDesign
                      .bind(this)}>Export</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <FileReaderInput as="text" id="my-file-input"
                       onChange={this.handleImportFile}>
                        <button className="btn btn-sm btn-default">Import</button>
                      </FileReaderInput>
                    </a>
                  </li>

                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" onClick={this
                      .generateTemplate
                      .bind(this)}>Generate Template</button>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" 
                      onClick={() => this.openPageStyle()}>Page style</button>
                    </a>
                  </li>
                   <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" 
                      onClick={() => this.redoDesigner()}>Redo</button>
                    </a>
                  </li>
                   <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" 
                      onClick={() => this.undoDesigner()}>Undo</button>
                    </a>
                  </li>
                   <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" 
                      onClick={() => this.removeJSON()}>Remove JSON</button>
                    </a>
                  </li>
                   <li>
                    <a href="javascript:;">
                      <button className="btn btn-sm btn-default" 
                      onClick={() => this.toolTemplate()}>Tool Template</button>
                    </a>
                  </li>
                </ul>
              </nav>
             
              <Notifications />
{/*<div class="row">*/}
 <label>Global JSON URL : </label>
              <input id="globaljsonurlfield"  width="100%" type="text" 
                  placeholder="Global JSON URL" onBlur={this.callapi} />
              
 <a href="javascript:;">
                      <FileReaderInput as="text" id="my-file-localjsoninput"
                       onChange={this.handleLocalJsonFile}>
                        <input type="text" id="txtLocalJson" style={{"width":"100%"}} readOnly="true"  placeholder="Select Local JSON File" className="btn btn-sm btn-default"/>
                      </FileReaderInput>
                    </a>
  <label style={{"marginLeft":"5px"}}>Global Font : </label>
              <input id="globalFontfield"  width="100%" type="text" onBlur={this.globalFont.bind(this)}
                  placeholder="Global Font" />
                  
                   
{/*  
</div>
              <div class="row">*/}
                   <label style={{"marginLeft":"5px"}}>Global background : </label>
                   <ColorPicker  color={this.state.bgglobalcolor}
                        onChange={this.bgcolorchangeHandler.bind(this)}
                         onClose={this.colorcloseHandler.bind(this)}>
                         <span className="rc-color-picker-trigger"/></ColorPicker>
                   <label style={{"marginLeft":"5px"}}>Global color : </label>
                    <ColorPicker  color={this.state.globalcolor}
                        onChange={this.colorchangeHandler.bind(this)}
                         onClose={this.colorcloseHandler.bind(this)}>
                         <span className="rc-color-picker-trigger"/></ColorPicker>
                         <label style={{"marginLeft":"5px"}}>Login Enable : </label>
                    <input type="checkbox" id="chkLogin"  />

                  {/*</div>*/}
                  </div>
              <ul className="nav nav-pills">
              <li  className="active"><a data-toggle="pill"  href="#designerTab">
                <button  className="btn btn-info" onClick={this.setselectedView.bind(this,'designer')}>Designer</button>
                </a></li> 
                <li><a data-toggle="pill" href="#loginTab">
                <button className="btn btn-info" onClick={this.setselectedView.bind(this,'login')}>Login</button>
                </a></li>
                <li><a data-toggle="pill"  href="#modalDialogTab">
                <button className="btn btn-info" onClick={this.setselectedView.bind(this,'modalpopup')}>Modal Dialog</button>
                </a></li>
              </ul>
              <div className="tab-content">
                <div id="loginTab" className="tab-pane fade">
                  <div className='form-builder-preview pull-left container-fluid'
                      id='login-designer'
                      ref="login-generatedoutput">
                      {this.renderSectionDiv(this.state.loginForm, true)}
                  </div>
                </div>
                <div id="designerTab" className="tab-pane fade in active" >
                  <div  onDragOver={this.allowDrop.bind()} onDrop={this.droponDesigner.bind()}
                      className='form-builder-preview pull-left container-fluid'
                      id='designer'
                      ref="generatedoutput">
                      {this
                          .state
                          .data
                          .map(item => {
                              switch (item.element) {
                                  case "Section":
                                      var sectionData = this.renderSectionDiv(item, false);
                                      return sectionData;
                              }
                          })
                      }
                  </div>
                </div>
                <div id="modalDialogTab" className="tab-pane fade" >
                 <div className='form-builder-preview pull-left container-fluid'>
                   { this.renderModalPopupDesigner()
                      }
                  </div>
                </div>
              </div>
                <Modal
                    isOpen={this.state.cssModalIsOpen}
                    onRequestClose={this.stylecloseModalWindow}
                    onCancel={this.stylecloseModalWindow}
                    contentLabel="CSS"
                    className="text-center">
                     <div className="row">
                         <h3 >Globle Style<span onClick={this.stylecloseModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span></h3>
                          <textarea rows="25" cols="150"  value={this.state.extraCss}  onChange={this
                               .editExtraCss
                               .bind(this)} ></textarea>
                      </div>
                  </Modal>
                  <Modal
                    isOpen={this.state.JSModalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="CSS"
                    className="text-center">
                     <div className="row">
                         <h3 >Globle javascript<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span></h3>
                          <textarea rows="25" cols="150"  value={this.state.extraJavascript}  onChange={this
                               .editJavascript
                               .bind(this)} ></textarea>
                      </div>
                  </Modal>
                <Modal
                    isOpen={this.state.globlecssModalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="CSS"
                    className="text-center">
                    
                     <div className="row">
                         <h3>Globle CSS<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span></h3>
                          <textarea rows="25" cols="150"  value={this.state.globleCss}  onChange={this
                               .globleCss
                               .bind(this)} ></textarea>
                      </div>
                  </Modal>
                  <Modal
                    isOpen={this.state.globlejsModalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="CSS"
                    className="text-center">
                    
                     <div className="row">
                         <h3>Globle JS<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span></h3>
                          <textarea rows="25" cols="150"  value={this.state.globlejs}  onChange={this
                               .globlejs
                               .bind(this)} ></textarea>
                      </div>
                  </Modal>
                <PropertyWindow
                    selectedControl={this.state.selectedControl}
                    preview={this}
                    updateControl={this.updateControl}/>
            </div>
           
        )
    }
}
//Export the module
module.exports = Preview;