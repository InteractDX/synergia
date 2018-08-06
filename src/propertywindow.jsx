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
import Modal from 'react-modal';
import ID from './common/UUID.js'
var selectedeventformodification={event:'',methodname:'',method:''};
import ColorPicker from 'rc-color-picker';
//properties window Component
export default class PropertyWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            control: this.props.selectedControl,
            data: this.props.data,
            dirty: false,
            stylemodalIsOpen: false,
            showpropertyevent:'Properties',
            loaddataeventcall:false
        }
        //bind methods for close/open the modal windows
        this.openModalWindow = this
            .openModalWindow
            .bind(this);
        this.closeModalWindow = this
            .closeModalWindow
            .bind(this);
             this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    //function called when property edit is started
    editControlProp(sourceProperty, targetProperty, e) {
        let this_control = this.props.selectedControl;
        if(sourceProperty.indexOf("events_")>-1)
        {
            var eventArray=sourceProperty.split('.');
            var eventname=eventArray[0];
            var propertychange=eventArray[1];

            if(propertychange="methodname")
                this_control[eventname].methodname=e.target[targetProperty];
            if(propertychange=="method")
                this_control[eventname].method=e.target[targetProperty];
        }
        else
        {
            this_control[sourceProperty] = e.target[targetProperty];
        }
        this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        });
    }
    editControlPropOnly(sourceProperty, targetProperty, e) {
        let this_control = this.props.selectedControl;
        this_control[sourceProperty] = e.target[targetProperty];
        this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        });
    }

    edittableHeaders(sourceProperty, targetProperty,index, e) {

        let this_control = this.props.selectedControl;    
        var headerdtl=this_control['tableheaders'][index];
        headerdtl[sourceProperty]= e.target[targetProperty];
        this_control['tableheaders'][index]=headerdtl;        
        
        if(sourceProperty=="isgroupby")
        {
            var groupbycol='';
            for(var counter=0;counter<this_control['tableheaders'].length;counter++)
            {
                var headercontrol=this_control['tableheaders'][counter]
                if(headercontrol.isgroupby==true)
                  groupbycol=groupbycol+headercontrol.datafield+",";
            }
            if(groupbycol!='')
              this_control["datagroupbyfield"]=groupbycol.substring(0, groupbycol.length - 1);
            else
              this_control["datagroupbyfield"]="[]";
        }
       this.props.updateControl.call(this.props.preview, this_control);
    }
    updateTableDataFormatter(e)
    {
        let this_control = this.props.selectedControl;
        var field=document.getElementById("dataformatterfunctionField").value;
        var fieldFunction=document.getElementById("dataformatterfunctionFieldFunction").value;
        var funName=document.getElementById("dataformatterfunctionNameInput").value;        
        var tempData=this_control['dataformatterfunction'];   
        var funDetails={};
        funDetails.function=fieldFunction;
        funDetails.functionname=funName;
        tempData[field]=funDetails;
        this_control['dataformatterfunction']=tempData;
         this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        }); 
        
    }
    editTableDataFormatter(sourceProperty, targetProperty, e) {
        let this_control = this.props.selectedControl;
        this_control[sourceProperty] = e.target[targetProperty];
        var tempData=this_control['dataformatterfunction'];
      
        if(sourceProperty=='dataformatterfunctionFieldTemp')
        {
            this_control['dataformatterfunctionTemp']='';
            this_control['dataformatterfunctionNameTemp']='';
            if(tempData[e.target[targetProperty]])
            {
             this_control['dataformatterfunctionTemp']=tempData[e.target[targetProperty]].function;
             this_control['dataformatterfunctionNameTemp']=tempData[e.target[targetProperty]].functionname;              
            }
        }    
        this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        });  
    }
    //called after edit is completed, this function call the parent updateControl function
    updateControl() {
        let this_control = this.props.selectedControl;
        if (this.state.dirty) {
                this.props.updateControl.call(this.props.preview, this_control);
                this.setState({dirty: false});
        }
    }    
    colorBgchangeHandler(colors)
    {
     var colorVal=colors.color;
      let this_control = this.props.selectedControl;
      this_control['style_backgroundColor'] = colorVal;
     
      this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        });
    }
     colorRowbgchangeHandler(colors)
    {
     var colorVal=colors.color;
      let this_control = this.props.selectedControl;
      this_control['rowbgColor'] = colorVal;
     
      this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        });
    }
    colorchangeHandler(colors)
    {     
      var colorVal=colors.color;
      let this_control = this.props.selectedControl;
      this_control['style_color'] = colorVal;
     
      this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        });
    }
     colorchartchangeHandler(index,colors)
    {     
      var colorVal=colors.color;
      let this_control = this.props.selectedControl;
       this_control.colorOptions[index].Color = colorVal;
     
      this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:false
        }, () => {
            this.updateControl();
        });
    }
    colorcloseHandler(colors)
    {     
      this.updateControl();
    }
    updateloaddata() {
       
       let this_control = this.props.selectedControl;       
        if (this.state.dirty) {
         if(this_control["dataloadchoice"]=="json")
           this_control["datadetails"]=JSON.parse(selectedeventformodification.method);
         else
         {
            this_control["datadetails"]=globalappdata[selectedeventformodification.method];
            this_control['datadetailsobjname']=selectedeventformodification.method;
         }
        
        if(this_control["datadetails"]&&this_control["datadetails"].length>0)
        {
            var headers=[];
            for (var name in this_control["datadetails"][0]) {
               var headerdata={
                   datafield:name,
                   headertext:name,
                   sortable:false,
                   isgroupby:false,
                   showcolumn:true,
                   dataclass:'',
                   dataalign:'left',
                   datavalign:'left',
                   colspan:'',
                   groupheading:''
               }
               headers.push(headerdata);
            }
            this_control["tableheaders"]=headers;
        }
        
         this.props.updateControl.call(this.props.preview, this_control);
         this.setState({dirty: false});
        }
    }
    editControlEvents(sourceProperty, targetProperty, e) {
        
        let this_control = this.props.selectedControl;        
        if(selectedeventformodification.event.indexOf("events_")>-1)
        {          
            var eventname=selectedeventformodification.event;      
            
            if(sourceProperty=="methodname")
            {
             this_control[eventname].methodname=e.target[targetProperty];
             selectedeventformodification.methodname=e.target[targetProperty];
            }
            if(sourceProperty=="method")
            {
              this_control[eventname].method=e.target[targetProperty];
              selectedeventformodification.method=e.target[targetProperty];
            }
        
        }
        else if(selectedeventformodification.event.indexOf("loaddata")>-1)
        { 
            selectedeventformodification.method=e.target[targetProperty];
        }
       
        this.setState({
            element: this_control,
            dirty: true,
            loaddataeventcall:true
        }, () => {
             if(selectedeventformodification.event.indexOf("events_")>-1)
             {
                this.updateControl();
             }             
        });
    }

    //used to update the state of drop down option modal dialog as open
    openModalWindow(ev) {
        this.setState({ddloptionModalIsOpen: false});
         this.setState({radiooptionModalIsOpen: false});
          this.setState({checkboxoptionModalIsOpen: false});
        this.setState({stylemodalIsOpen: false});
        this.setState({buttongroupmodalIsOpen: false});
        this.setState({eventsmodalIsOpen: false});
        this.setState({rowstylemodalIsOpen: false});
        this.setState({tblDataFormattermodalIsOpen: false});
        this.setState({tabmodalIsOpen: false});
        this.setState({listOptionmodalIsOpen: false});
        this.setState({loaddatamodalIsOpen: false});
        this.setState({tableheadermodalIsOpen: false});
        this.setState({navigationmenumodalIsOpen: false});
        this.setState({jsondatamodalIsOpen: false});
        if(ev.target.value=="Click here to configure dropdown options")
        {
            this.setState({ddloptionModalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure checkbox options")
        {
            this.setState({checkboxoptionModalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure radio options")
        {
            this.setState({radiooptionModalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure styles")
        {
           this.setState({stylemodalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure buttons")
        {
           this.setState({buttongroupmodalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure menus")
        {
           this.setState({navigationmenumodalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure tab")
        {
            this.setState({tabmodalIsOpen: true});
        }
        if(ev.target.value=="configure list Options")
        {
           this.setState({listOptionmodalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure CarousalImage")
        {
             this.setState({ImageOptionmodalIsOpen: true});
        }
        if(ev.target.value=="Click here to configure Color")
        {
             this.setState({ColorOptionmodalIsOpen: true});
        }
        if(ev.target.value=="loaddata")
        {
          selectedeventformodification.event="loaddata";
          let this_control = this.props.selectedControl;
          selectedeventformodification.methodname="loaddata";
          if(this_control["dataloadchoice"]=="json")
            selectedeventformodification.method=JSON.stringify(this_control["datadetails"]);
          else
            selectedeventformodification.method=this_control['datadetailsobjname'];

          this.setState({loaddatamodalIsOpen: true});
        }
        if(ev.target.value=="tableheaders")
        {
          this.setState({tableheadermodalIsOpen: true});
        }
        if(ev.target.title.indexOf("events_")>-1)
        {
          selectedeventformodification.event=ev.target.title;
          let this_control = this.props.selectedControl;
          selectedeventformodification.methodname=this_control[ev.target.title].methodname;
          selectedeventformodification.method=this_control[ev.target.title].method;
          this.setState({eventsmodalIsOpen: true});
        }
        if(ev.target.title=="Click here to configure row styles")
        {
            this.setState({rowstylemodalIsOpen: true});
        }
        if(ev.target.title=="Click here to configure data format")
        {
            this.setState({tblDataFormattermodalIsOpen: true});
        }
        if(ev.target.title=="Click here to load JSON Data")
        {
            this.setState({jsondatamodalIsOpen: true});
        }
    }
     afterOpenModal() {
    let this_control=this.props.selectedControl;
    if(this_control.src!="" && this_control.src!=undefined && this_control.element!="LoginForm")
    {
        $('#FontDiv,#lblFont').css("display","none");
        $('#BackgroundDiv').css("display","block");
    }
  }
    //used to update the state of drop down option modal dialog as close
    closeModalWindow(ev) {
        this.setState({ddloptionModalIsOpen: false});
        this.setState({radiooptionModalIsOpen: false});
        this.setState({checkboxoptionModalIsOpen: false});
        this.setState({stylemodalIsOpen: false});
        this.setState({buttongroupmodalIsOpen: false});
        this.setState({eventsmodalIsOpen: false});
        this.setState({rowstylemodalIsOpen: false});
        this.setState({tblDataFormattermodalIsOpen: false});
        this.setState({tabmodalIsOpen: false});
        this.setState({listOptionmodalIsOpen: false});
        this.setState({loaddatamodalIsOpen: false});
        this.setState({tableheadermodalIsOpen: false});
        this.setState({ImageOptionmodalIsOpen: false});
        this.setState({ColorOptionmodalIsOpen: false});
	    this.setState({navigationmenumodalIsOpen: false});
        this.setState({jsondatamodalIsOpen: false});
    }

    //function used to hild the all divs on stype modal popup
    hideAllStyleDiv()
    {
        document
            .getElementById("BackgroundDiv")
            .style
            .display = "none";
        document
            .getElementById("FontDiv")
            .style
            .display = "none";
        document
            .getElementById("PositionDiv")
            .style
            .display = "none";
    }
    //funtion used to runtime hide-show divs on modal window of style
    showHideStyleDiv(selectedvalue)
    {
        if (document.getElementById("BackgroundDiv") != null && document.getElementById("FontDiv") != null) {
            this.hideAllStyleDiv();

            switch (selectedvalue) {
                case "Font":
                    document
                        .getElementById("FontDiv")
                        .style
                        .display = "Block";
                    break;
                case "Background":
                    document
                        .getElementById("BackgroundDiv")
                        .style
                        .display = "Block";
                    break;
                case "Position":
                    document
                        .getElementById("PositionDiv")
                        .style
                        .display = "Block";
                    break;
            }
        }
    }
    //function used to show/hide the button group options
    showHideButtonGroupOptions(selectedvalue)
    {
        if (document.getElementById("PrimaryButtonDiv") != null && document.getElementById("GroupButtonDiv") != null)
        {
            document.getElementById("GroupButtonDiv").style.display = "none";
            document.getElementById("PrimaryButtonDiv").style.display = "none";
            switch (selectedvalue) {
                case "GroupButton":
                    document.getElementById("GroupButtonDiv").style.display = "Block";
                    break;
                default:
                    document.getElementById("PrimaryButtonDiv").style.display = "Block";
                    break;
            }
        }
    }

    //function used to show/hide the navigation menu options
    showHideNavigationMenuOptions(selectedvalue)
    {
        if (document.getElementById("MenuDiv") != null && document.getElementById("SubMenuDiv") != null)
        {
            document.getElementById("MenuDiv").style.display = "none";
            document.getElementById("SubMenuDiv").style.display = "none";
            switch (selectedvalue) {
                case "menus":
                    document.getElementById("MenuDiv").style.display = "Block";
                    break;
                default:
                    document.getElementById("SubMenuDiv").style.display = "Block";
                    break;
            }
        }
    }

    //used to edit the dropdown option
    editDropDownOption(index, e) {

        let this_control = this.props.selectedControl;
        this_control.options[index].text = e.target.value;
        this_control.options[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
     //used to edit the radio option
     editradioOption(index, e) {
        let this_control = this.props.selectedControl;
        this_control.radiooptions[index].text = e.target.value;
        this_control.radiooptions[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
     //used to edit the checkbox option
     editcheckboxOption(index, e) {
        let this_control = this.props.selectedControl;
        this_control.checkboxoptions[index].text = e.target.value;
        this_control.checkboxoptions[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
    //used to edit drop down option value
    editDropDownValue(index, e) {

        let this_control = this.props.selectedControl;
        this_control.options[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
      //used to edit radio button option value
    editRadiobuttonValue(index, e) {

        let this_control = this.props.selectedControl;
        this_control.radiooptions[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
      //used to edit checkbox option value
    editcheckboxValue(index, e) {

        let this_control = this.props.selectedControl;
        this_control.checkboxoptions[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
    //add drodpwon option
    addDropDownOption(index) {
        let this_control = this.props.selectedControl;
        this_control.options.splice(index+1,0,{value: '', text: '', key: ID.uuid()});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove drop down option
    removeDropDownOption(index) {
        let this_control = this.props.selectedControl;
        this_control.options.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //add radio option
    addradioOption(index) {
        let this_control = this.props.selectedControl;
        this_control.radiooptions.splice(index+1,0,{value: '', text: '', key: ID.uuid()});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove radio option
    removeradioOption(index) {
        let this_control = this.props.selectedControl;
        this_control.radiooptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
     //add checkbox option
    addcheckboxOption(index) {
        let this_control = this.props.selectedControl;
        this_control.checkboxoptions.splice(index+1,0,{value: '', text: '', key: ID.uuid()});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove checkbox option
    removecheckboxOption(index) {
        let this_control = this.props.selectedControl;
        this_control.checkboxoptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //Add navigation Tab option
    addTabOption(index) {
        let this_control = this.props.selectedControl;
        this_control.taboptions.splice(index+1,0,{className:'',href:'',value: '',  key: ID.uuid(),rownumbers:''});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    editTabOptions(index,property, e)
    {
        let this_control = this.props.selectedControl;
        var test =this_control.taboptions[index];
        if(test!=undefined)
        {
            test[property]= e.target.value;
            if(property=="TabName")
            {
              test["href"]= "#"+e.target.value.replace(/ /g, "");
            }
            this_control.taboptions[index]=test;
            this.setState({
            control: this_control,
            dirty: true
        });
        }        
    }
    //remove Tab Option
    removeTabOption(index) {

        let this_control = this.props.selectedControl;
        this_control.taboptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //used to edit the dropdown option
    editListOption(index, e) {

        let this_control = this.props.selectedControl;
        this_control.listdata[index] = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }

    //add drodpwon option
    addListOption(index) {

        let this_control = this.props.selectedControl;
        this_control.listdata.splice(index+1,0,'');
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove drop down option
    removeListOption(index) {

        let this_control = this.props.selectedControl;
        this_control.listdata.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
     //add drodpwon option
    addImageOption(index) {
        let this_control = this.props.selectedControl;
        this_control.Carousaloptions.splice(index+1,0,{Src:'', OnClick:'', key: ID.uuid()});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove drop down option
    removeImageOption(index) {
        let this_control = this.props.selectedControl;
        this_control.Carousaloptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    editImageOption(index, e) {
        let this_control = this.props.selectedControl;
        this_control.Carousaloptions[index].Src = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
    editClickImageOption(index, e) {
         let this_control = this.props.selectedControl;
         this_control.Carousaloptions[index].Clickfunction = e.target.value;
         this.setState({
             control: this_control,
             dirty: true
         });
    }
      //add Color option
    addColorOption(index) {
        let this_control = this.props.selectedControl;
        this_control.colorOptions.splice(index+1,0,{Color:'', value:'',legendvalue:'', key: ID.uuid()});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove Color option
    removeColorOption(index) {
        let this_control = this.props.selectedControl;
        this_control.colorOptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    editColorOption(index, e) {
        let this_control = this.props.selectedControl;
        this_control.colorOptions[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
    editLegendOption(index, e) {
        let this_control = this.props.selectedControl;
        this_control.colorOptions[index].legendvalue = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
    //used to edit the dropdown option
    editButtonGroupPrimaryOption(index, e) {

        let this_control = this.props.selectedControl;
        this_control.buttongroupoptions[index].value = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
 editNavigationMenuOption(index,targetProperty, e)
    {
        let this_control = this.props.selectedControl;
        if(targetProperty=="menu")
        {
          this_control.menuoptions[index].menu = e.target.value;
          this_control.menuoptions[index].link="#"+
           e.target.value.replace(/ /g, "");
        }         
        else
         this_control.menuoptions[index].link = e.target.value;
        this.setState({
            control: this_control,
            dirty: true
        });
    }
    //update dropdown
    updateButtonGroupPrimaryOption() {

        if (this.state.dirty) {
            let this_control = this.props.selectedControl;
            this.props.updateControl.call(this.props.preview, this_control);
            this.setState({dirty: false});
        }
    }
     updateNavigationMenuOption() {

        if (this.state.dirty) {
            let this_control = this.props.selectedControl;
            this.props.updateControl.call(this.props.preview, this_control);
            this.setState({dirty: false});
        }
    }
    //add button group
    addButtonGroupPrimaryOption(index) {

        let this_control = this.props.selectedControl;
        this_control.buttongroupoptions.splice(index+1,0,{value: '',nestedbuttons:[], key: ID.uuid()});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    addNavigationMenuOption(index) {
        let this_control = this.props.selectedControl;
        this_control.menuoptions.splice(index+1,0,{menu: '',link:'',class:'',key: ID.uuid(),submenuoptions:[]});
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove button group
    removeButtonGroupPrimaryOption(index) {

        let this_control = this.props.selectedControl;
        this_control.buttongroupoptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    removeNavigationMenuOption(index) {

        let this_control = this.props.selectedControl;
        this_control.menuoptions.splice(index,1);
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //function used to add nested buttons for primary button group
    addButtonGroupNestedOption() {

        var e = document.getElementById("primaryButtonSelected");
        var selectedval = e.options[e.selectedIndex].value;

        //find the primary button and add inner button
        let this_control = this.props.selectedControl;
        this_control.selectednestedbuttons=[];

        for (var buttonIndex = 0; buttonIndex < this_control.buttongroupoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.buttongroupoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                var innerIndex=this_control.buttongroupoptions[buttonIndex].nestedbuttons.length;
                this_control.buttongroupoptions[buttonIndex].nestedbuttons.splice(innerIndex+1,0,{href: '#',text:'Inner button', key: ID.uuid()});
                this.props.updateControl.call(this.props.preview, this_control);
                break;
            }
        }
        this_control.selectednestedbuttons=this_control.buttongroupoptions[buttonIndex].nestedbuttons;
    }

    addSubMenuOption() {

        var e = document.getElementById("menuSelected");
        var selectedval = e.options[e.selectedIndex].value;

        //find the primary button and add inner button
        let this_control = this.props.selectedControl;
        this_control.selectednestedmenus=[];
        
        for (var buttonIndex = 0; buttonIndex < this_control.menuoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.menuoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                var innerIndex=this_control.menuoptions[buttonIndex].submenuoptions.length;
                this_control.menuoptions[buttonIndex].submenuoptions.splice(innerIndex+1,0,{link:'',menu:'', key: ID.uuid()});
                this.props.updateControl.call(this.props.preview, this_control);
                break;
            }
        }
        this_control.selectednestedmenus=this_control.menuoptions[buttonIndex].submenuoptions;
    }

    //set the selected inner buttons
    setSelectedNestedbuttons()
    {
        var e = document.getElementById("primaryButtonSelected");
        var selectedval = e.options[e.selectedIndex].value;
        let this_control = this.props.selectedControl;
        this_control.selectednestedbuttons=[];
        for (var buttonIndex = 0; buttonIndex < this_control.buttongroupoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.buttongroupoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                this_control.selectednestedbuttons=this_control.buttongroupoptions[buttonIndex].nestedbuttons;
                break;
            }
        }
        this.props.updateControl.call(this.props.preview, this_control);
    }

    //set the selected inner buttons
    setSelectedSubMenus()
    {
        var e = document.getElementById("menuSelected");
        var selectedval = e.options[e.selectedIndex].value;
        let this_control = this.props.selectedControl;
        this_control.selectednestedmenus=[];
        for (var buttonIndex = 0; buttonIndex < this_control.menuoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.menuoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                this_control.selectednestedmenus=this_control.menuoptions[buttonIndex].submenuoptions;
                break;
            }
        }
        this.props.updateControl.call(this.props.preview, this_control);
    }

    //used to edit the nested buttons
    editNestedbuttons(index, e) {
        var primaryButton = document.getElementById("primaryButtonSelected");
        var selectedval = primaryButton.options[primaryButton.selectedIndex].value;
        let this_control = this.props.selectedControl;
        for (var buttonIndex = 0; buttonIndex < this_control.buttongroupoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.buttongroupoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                this_control.selectednestedbuttons[index].href=e.target.value;
                this.setState({
                    control: this_control,
                    dirty: true
                });
                break;
            }
        }
    }

    editSubMenu(index, e) {

        var primaryButton = document.getElementById("menuSelected");
        var selectedval = primaryButton.options[primaryButton.selectedIndex].value;
        let this_control = this.props.selectedControl;
        for (var buttonIndex = 0; buttonIndex < this_control.menuoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.menuoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                this_control.selectednestedmenus[index].menu=e.target.value;
                this_control.selectednestedmenus[index].link="#"+e.target.value.replace(/ /g, "");
               
                this.setState({
                    control: this_control,
                    dirty: true
                });
                break;
            }
        }
    }

    //used to edit the nested buttons
    editNestedbuttonsText(index, e) {
        var primaryButton = document.getElementById("primaryButtonSelected");
        var selectedval = primaryButton.options[primaryButton.selectedIndex].value;
        let this_control = this.props.selectedControl;
        for (var buttonIndex = 0; buttonIndex < this_control.buttongroupoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.buttongroupoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                this_control.selectednestedbuttons[index].text=e.target.value;
                this.setState({
                    control: this_control,
                    dirty: true
                });
                break;
            }
        }
    }

    editSubmenuLink(index, e) {

        var primaryButton = document.getElementById("menuSelected");
        var selectedval = primaryButton.options[primaryButton.selectedIndex].value;
        let this_control = this.props.selectedControl;
        for (var buttonIndex = 0; buttonIndex < this_control.menuoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.menuoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;               
                this_control.selectednestedmenus[index].link=e.target.value;               
                this.setState({
                    control: this_control,
                    dirty: true
                });
                break;
            }
        }
    }
    //used to update nested buttons
    updateNestedbuttons(index, e) {
        var primaryButton = document.getElementById("primaryButtonSelected");
        var selectedval = primaryButton.options[primaryButton.selectedIndex].value;
        let this_control = this.props.selectedControl;
        this.props.updateControl.call(this.props.preview, this_control);
    }

    updateSubMenuOption(index, e) {

        var primaryButton = document.getElementById("menuSelected");
        var selectedval = primaryButton.options[primaryButton.selectedIndex].value;
        let this_control = this.props.selectedControl;
        this.props.updateControl.call(this.props.preview, this_control);
    }
    //remove the nested button groups
    removeNestedbuttons(index, e) {

        var e = document.getElementById("primaryButtonSelected");
        var selectedval = e.options[e.selectedIndex].value;

        //find the primary button and add inner button
        let this_control = this.props.selectedControl;
        this_control.selectednestedbuttons=[];

        for (var buttonIndex = 0; buttonIndex < this_control.buttongroupoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.buttongroupoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                var innerIndex=this_control.buttongroupoptions[buttonIndex].nestedbuttons.length;
                this_control.buttongroupoptions[buttonIndex].nestedbuttons.splice(index,1);
                this.props.updateControl.call(this.props.preview, this_control);
                break;
            }
        }
        this_control.selectednestedbuttons=this_control.buttongroupoptions[buttonIndex].nestedbuttons;
        this.props.updateControl.call(this.props.preview, this_control);
    }

    removeSubMenus(index, e) {

        var e = document.getElementById("menuSelected");
        var selectedval = e.options[e.selectedIndex].value;

        //find the primary button and add inner button
        let this_control = this.props.selectedControl;
        this_control.selectednestedbuttons=[];

        for (var buttonIndex = 0; buttonIndex < this_control.menuoptions.length; buttonIndex++)
        {
            if(selectedval==this_control.menuoptions[buttonIndex].key)
            {
                let this_control = this.props.selectedControl;
                var innerIndex=this_control.menuoptions[buttonIndex].submenuoptions.length;
                this_control.menuoptions[buttonIndex].submenuoptions.splice(index,1);
                this.props.updateControl.call(this.props.preview, this_control);
                break;
            }
        }
        this_control.selectednestedmenus=this_control.menuoptions[buttonIndex].submenuoptions;
        this.props.updateControl.call(this.props.preview, this_control);
    }

    showPropertyOrEvent(ev)
    {
        this.setState({showpropertyevent: ev});
    }
    render() {
        return (
             <div className='pull-right w25percent' id='divproperty'>

                <h4>{this.props.selectedControl.element}- {this.state.showpropertyevent}</h4>
                <div className="btn-group">
                 <button className="btn btn-success" style={{"marginBottom":"5px"}} onClick={this.showPropertyOrEvent.bind(this,'Properties')}>Properties</button>&nbsp;&nbsp;
                 <button className="btn btn-success" style={{"marginBottom":"5px"}}  onClick={this.showPropertyOrEvent.bind(this,'Events')}>Events</button>
</div>
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('image1') && <div className="row p2px">
                <div className="col-md-4">Image1
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.image1
            ? this.props.selectedControl.image1
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'image1', 'value')}/>
    </div>
</div>
        }
        
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
        .hasOwnProperty('showarrows') && <div className="row p2px">
            <div className="col-md-4">Show Arrows
            </div>
            <div className="col-md-8">
                <select
            onBlur={this
            .updateControl
            .bind(this)}
            value={this.props.selectedControl.showarrows
            ? this.props.selectedControl.showarrows
            : false}
            onChange={this
            .editControlProp
            .bind(this, 'showarrows', 'value')}>
            <option>true</option>
            <option>false</option>
        </select>
    </div>
</div>
        }
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
       .hasOwnProperty('autofocus') && <div className="row p2px wraptxt">
            <div className="col-md-4">Auto focus</div>
            <div className="col-md-8">
                <select className="form-control h22px"
            onBlur={this
            .updateControl
            .bind(this)}

            value={this.props.selectedControl.autofocus
            ? this.props.selectedControl.autofocus
            : false}
            onChange={this
            .editControlProp
            .bind(this, 'autofocus', 'value')}>
            <option>true</option>
            <option>false</option>
        </select>
    </div>
</div>
        }
         {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
       .hasOwnProperty('barcodeDisplay') && <div className="row p2px wraptxt">
            <div className="col-md-4">Display</div>
            <div className="col-md-8">
                <select className="form-control h22px"
            onBlur={this
            .updateControl
            .bind(this)}

            value={this.props.selectedControl.barcodeDisplay
            ? this.props.selectedControl.barcodeDisplay
            : false}
            onChange={this
            .editControlProp
            .bind(this, 'barcodeDisplay', 'value')}>
            <option value="true">true</option>
            <option value="false">false</option>
        </select>
    </div>
</div>
        }
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
        .hasOwnProperty('direction') && <div className="row p2px">
            <div className="col-md-4">Direction
            </div>
            <div className="col-md-8">
                <select
            onBlur={this
            .updateControl
            .bind(this)}
            value={this.props.selectedControl.direction
            ? this.props.selectedControl.direction
            : false}
            onChange={this
            .editControlProp
            .bind(this, 'direction', 'value')}>
            <option>Horizontol</option>
            <option>Vertical</option>
        </select>
    </div>
</div>
        }
       
 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('alt') && <div className="row p2px wraptxt">
                        <div className="col-md-4">alt
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.alt
                    ? this.props.selectedControl.alt
                    : ' '}
                    onChange={this
                    .editControlProp
                    .bind(this, 'alt', 'value')}/>
                </div>
                </div>
                }
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('source') && <div className="row p2px wraptxt">
                        <div className="col-md-4">API URL</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.source
                    ? this.props.selectedControl.source
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'source', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('barCodeWidth') && <div className="row p2px">
                        <div className="col-md-4">BarCode Width
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.barCodeWidth
                    ? this.props.selectedControl.barCodeWidth
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'barCodeWidth', 'value')}/>
                    </div>
                </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('barCodeHeight') && <div className="row p2px">
                        <div className="col-md-4">BarCode Height
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.barCodeHeight
                    ? this.props.selectedControl.barCodeHeight
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'barCodeHeight', 'value')}/>
                    </div>
                </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('qrCodeWidth') && <div className="row p2px">
                        <div className="col-md-4">QRCode Width
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.qrCodeWidth
                    ? this.props.selectedControl.qrCodeWidth
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'qrCodeWidth', 'value')}/>
                    </div>
                </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('qrCodeHeight') && <div className="row p2px">
                        <div className="col-md-4">QRCode Height
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.qrCodeHeight
                    ? this.props.selectedControl.qrCodeHeight
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'qrCodeHeight', 'value')}/>
                    </div>
                </div>
                }
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('buttontype') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">buttontype</div>
                                    <div className="col-md-8">
                                        <select className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.buttontype
                                ? this.props.selectedControl.buttontype
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'buttontype', 'value')}>
                                <option value='button'>button</option>
                                <option value='reset'>reset</option>
                                <option value='submit'>submit</option>
                            </select>
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('charttype') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Chart type</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.charttype
                    ? this.props.selectedControl.charttype
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'charttype', 'value')}>
                    <option>Donut</option>
                    <option>Line</option>
                    <option>Area</option>
                    <option>Bar</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('charttitle') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Chart Title
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.charttitle
                    ? this.props.selectedControl.charttitle
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'charttitle', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('xaxistitle') && <div className="row p2px wraptxt">
                         <div className="col-md-4">X-Axis Title</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.xaxistitle
                                 ? this.props.selectedControl.xaxistitle
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'xaxistitle', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('yaxistitle') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Y-Axis Title</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.yaxistitle
                                 ? this.props.selectedControl.yaxistitle
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'yaxistitle', 'value')}/>
                         </div>
                     </div>
                     }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('showlegends') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Show legends
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.showlegends
                                ? this.props.selectedControl.showlegends
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'showlegends', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('legenalignment') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Legends Alignment
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.legenalignment
                                ? this.props.selectedControl.legenalignment
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'legenalignment', 'value')}>
                                <option>Horizontol</option>
                                <option>Vertical</option>
                            </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('valueby') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Value By
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.valueby
                                ? this.props.selectedControl.valueby
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'valueby', 'value')}>
                                <option>Percentage</option>
                                <option>Value</option>
                            </select>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('value') && <div className="row p2px wraptxt">
                                                     <div className="col-md-4">Value
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.value
                    ? this.props.selectedControl.value
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'value', 'value')}/>
                    </div>
            
        </div>
                }
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('showtooltip') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Show tooltip
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.showtooltip
                                ? this.props.selectedControl.showtooltip
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'showtooltip', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
            </div>
        </div>
                }

                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('tooltipgroup') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Group tooltip
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.tooltipgroup
                                ? this.props.selectedControl.tooltipgroup
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'tooltipgroup', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
            </div>
        </div>
                }
                
                
      {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('class') &&<div className = "row p2px wraptxt"> <div className="col-md-4">class
            </div> < div className = "col-md-8" > <input
                type="text"
                className="form-control h22px"
                value={this.props.selectedControl.class
                ? this.props.selectedControl.class
                : ' '}
                onChange={this
                .editControlProp
                .bind(this, 'class', 'value')}/>
                </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('data_toggle') &&<div className = "row p2px wraptxt"> <div className="col-md-4">data toggle
            </div> < div className = "col-md-8" > <input
                type="text"
                className="form-control h22px"
                value={this.props.selectedControl.data_toggle
                ? this.props.selectedControl.data_toggle
                : ' '}
                onChange={this
                .editControlProp
                .bind(this, 'data_toggle', 'value')}/>
                </div>
        </div>
                }
               
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('cols') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">cols
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.cols
                                ? this.props.selectedControl.cols
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'cols', 'value')}/>
                        </div>
                    </div>
                            }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('data_target') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">data target
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.data_target
                                ? this.props.selectedControl.data_target
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'data_target', 'value')}/>
                        </div>
                    </div>
                            }
               
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('jsonlong') &&< div className = "row p2px wraptxt" > <div className="col-md-4">API Longitude
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.jsonlong
                        ? this.props.selectedControl.jsonlong
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'jsonlong', 'value')}/>
                </div>
                </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('jsonlat') &&< div className = "row p2px wraptxt" > <div className="col-md-4">API Latitude
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.jsonlat
                        ? this.props.selectedControl.jsonlat
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'jsonlat', 'value')}/>
                </div>
                </div>
                }
              {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('dataformatterfunction') && <div className="row p2px wraptxt">
                        <div className="col-md-4">data formatter 
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" 
                             title="Click here to configure data format" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datagroupby') && <div className="row p2px">
                        <div className="col-md-4">datagroupby
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datagroupby
                                ? this.props.selectedControl.datagroupby
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datagroupby', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datasearch') && <div className="row p2px">
                        <div className="col-md-4">datasearch
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datasearch
                                ? this.props.selectedControl.datasearch
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datasearch', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datashowcolumns') && <div className="row p2px">
                        <div className="col-md-4">datashowcolumns
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datashowcolumns
                                ? this.props.selectedControl.datashowcolumns
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datashowcolumns', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datashowtoggle') && <div className="row p2px">
                        <div className="col-md-4">datashowtoggle
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datashowtoggle
                                ? this.props.selectedControl.datashowtoggle
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datashowtoggle', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datapagination') && <div className="row p2px">
                        <div className="col-md-4">datapagination
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datapagination
                                ? this.props.selectedControl.datapagination
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datapagination', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datashowgrouponoffcontrol') && <div className="row p2px">
                        <div className="col-md-4">datashowgroup onoffcontrol
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datashowgrouponoffcontrol
                                ? this.props.selectedControl.datashowgrouponoffcontrol
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datashowgrouponoffcontrol', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datashowprint') && <div className="row p2px">
                        <div className="col-md-4">datashowprint
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datashowprint
                                ? this.props.selectedControl.datashowprint
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datashowprint', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datashowrefresh') && <div className="row p2px">
                        <div className="col-md-4">datashowrefresh
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datashowrefresh
                                ? this.props.selectedControl.datashowrefresh
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datashowrefresh', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('div_class') && <div className="row p2px">
                        <div className="col-md-4">div class
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.div_class
                    ? this.props.selectedControl.div_class
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'div_class', 'value')}/>
                    </div>
                </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('div_styleheight') && <div className="row p2px">
                        <div className="col-md-4">div height
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.div_styleheight
                    ? this.props.selectedControl.div_styleheight
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'div_styleheight', 'value')}/>
                    </div>
                </div>
            }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('div_styleoverflow') && <div className="row p2px wraptxt">
                       <div className="col-md-4">div overflow</div>
                       <div className="col-md-8">
                           <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.div_styleoverflow
                    ? this.props.selectedControl.div_styleoverflow
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'div_styleoverflow', 'value')}>
                    <option>visible</option>
                    <option>hidden</option>
                    <option>scroll</option>
                    <option>auto</option>
                    <option>initial</option>
                    <option>inherit</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('div_styleoverflowx') && <div className="row p2px wraptxt">
                       <div className="col-md-4">div overflow-x</div>
                       <div className="col-md-8">
                           <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.div_styleoverflowx
                    ? this.props.selectedControl.div_styleoverflowx
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'div_styleoverflowx', 'value')}>
                    <option>visible</option>
                    <option>hidden</option>
                    <option>scroll</option>
                    <option>auto</option>
                    <option>initial</option>
                    <option>inherit</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('div_styleoverflowy') && <div className="row p2px wraptxt">
                       <div className="col-md-4">div overflow-y</div>
                       <div className="col-md-8">
                           <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.div_styleoverflowy
                    ? this.props.selectedControl.div_styleoverflowy
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'div_styleoverflowy', 'value')}>
                    <option>visible</option>
                    <option>hidden</option>
                    <option>scroll</option>
                    <option>auto</option>
                    <option>initial</option>
                    <option>inherit</option>
                </select>
            </div>
        </div>
                }

                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('div_stylewidth') && <div className="row p2px">
                        <div className="col-md-4">div width
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.div_stylewidth
                    ? this.props.selectedControl.div_stylewidth
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'div_stylewidth', 'value')}/>
                    </div>
                </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('div_styletextAlign') && <div className="row p2px">
                        <div className="col-md-4">div align
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                            onBlur={this
                            .updateControl
                            .bind(this)}

                            value={this.props.selectedControl.div_styletextAlign
                            ? this.props.selectedControl.div_styletextAlign
                            : false}
                            onChange={this
                            .editControlProp
                            .bind(this, 'div_styletextAlign', 'value')}>
                            <option value="left">left</option>
                            <option value="right">right</option>
                            <option value="center">center</option>
                            <option value="justify">justify</option>
                        </select>
                    </div>
                </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('disabled') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Disabled</div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.disabled
                    ? this.props.selectedControl.disabled
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'disabled', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('dropzone') && <div className="row p2px wraptxt">
                       <div className="col-md-4">Dropzone</div>
                       <div className="col-md-8">
                           <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.dropzone
                    ? this.props.selectedControl.dropzone
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'dropzone', 'value')}>
                    <option>copy</option>
                    <option>move</option>
                     <option>link</option>
                </select>
            </div>
        </div>
                }

               
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('for') &&< div className = "row p2px wraptxt" > <div className="col-md-4">For
               </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.for
                        ? this.props.selectedControl.for
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'for', 'value')}/>
                </div>
                </div>
                }
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
        .hasOwnProperty('socialurl') && <div className="row p2px">
            <div className="col-md-4">Enter Url
            </div>
            <div className="col-md-8">
                <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.socialurl
            ? this.props.selectedControl.socialurl
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'socialurl', 'value')}/>
    </div>
</div>
        }
         {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datacache') && <div className="row p2px">
                        <div className="col-md-4">data cache
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datacache
                                ? this.props.selectedControl.datacache
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datacache', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                    }
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                        .props
                        .selectedControl
                    .hasOwnProperty('div_stylefloat') && <div className="row p2px wraptxt">
                            <div className="col-md-4">float</div>
                            <div className="col-md-8">
                                <select  className="form-control h22px"
                            onBlur={this
                            .updateControl
                            .bind(this)}

                            value={this.props.selectedControl.div_stylefloat
                            ? this.props.selectedControl.div_stylefloat
                            : false}
                            onChange={this
                            .editControlProp
                            .bind(this, 'div_stylefloat', 'value')}>
                            <option value="none">none</option>
                            <option value="left">left</option>
                            <option value="right">right</option>
                            <option value="initial">initial</option>
                            <option value="inherit">inherit</option>
                        </select>
                    </div>
                </div>
                    }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('form_class') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Form Class</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.form_class
                    ? this.props.selectedControl.form_class
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'form_class', 'value')}>
                    <option value=""></option>
                    <option value="form-inline">inline</option>
                    <option value="form-horizontal">Horizontal</option>

                </select>
            </div>
        </div>
                }
                      {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('form') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">form
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.form
                                ? this.props.selectedControl.form
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'form', 'value')}/>
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('formaction') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">formaction
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.formaction
                                ? this.props.selectedControl.formaction
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'formaction', 'value')}/>
                        </div>
                    </div>
                            }

                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('formenctype') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">formenctype</div>
                                    <div className="col-md-8">
                                        <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.formenctype
                                ? this.props.selectedControl.formenctype
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'formenctype', 'value')}>
                                <option value='application/x-www-form-urlencoded'>application/x-www-form-urlencoded</option>
                                <option value='multipart/form-data'>multipart/form-data</option>
                                <option value='text/plain'>text/plain</option>
                            </select>
                        </div>
                    </div>
                            }
                            
                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('form_method') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Method</div>
                                    <div className="col-md-8">
                                        <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.form_method
                                ? this.props.selectedControl.form_method
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'form_method', 'value')}>
                                <option value='get'>get</option>
                                <option value='post'>post</option>
                            </select>
                        </div>
                    </div>
                            }
                            
                               {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('formtarget') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">formtarget
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.formtarget
                                ? this.props.selectedControl.formtarget
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'formtarget', 'value')}/>
                        </div>
                    </div>
                            }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('group_name') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Group Name</div>
                        <div className="col-md-8">
                          <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.group_name
                    ? this.props.selectedControl.group_name
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'group_name', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('height') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Height</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.height
                    ? this.props.selectedControl.height
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'height', 'value')}/>
            </div>
        </div>
                }
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('panelheadertext') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Header Text</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.panelheadertext
                    ? this.props.selectedControl.panelheadertext
                    : '1'}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'panelheadertext', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('controlid') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Id
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.controlid
                    ? this.props.selectedControl.controlid
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'controlid', 'value')}/>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('innerRadius') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Inner circle radius</div>
                         <div className="col-md-8">
                             <input
                                 type="number"
                                 className="form-control h22px"
                                 max="1.0"
                                 min="0.0"
                                 value={this.props.selectedControl.innerRadius
                                 ? this.props.selectedControl.innerRadius
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'innerRadius', 'value')}/>
                         </div>
                     </div>
                     }
                    
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('Carousaloptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Image Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" value="Click here to configure CarousalImage" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
               {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('colorOptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Color Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" value="Click here to configure Color" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
        .hasOwnProperty('interval') && <div className="row p2px">
            <div className="col-md-4">Interval
            </div>
            <div className="col-md-8">
                <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.interval
            ? this.props.selectedControl.interval
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'interval', 'value')}/>
    </div>
</div>
        }
         {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('jsonarr') &&< div className = "row p2px wraptxt" > <div className="col-md-4">JSON Array
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.jsonarr
                        ? this.props.selectedControl.jsonarr
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'jsonarr', 'value')}/>
                </div>
                </div>
                }
               {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('jsonkey') && <div className="row p2px wraptxt">
                         <div className="col-md-4">JSON field name</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.jsonkey
                                 ? this.props.selectedControl.jsonkey
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'jsonkey', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('jsonkeyText') && <div className="row p2px wraptxt">
                         <div className="col-md-4">JSON Text field</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.jsonkeyText
                                 ? this.props.selectedControl.jsonkeyText
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'jsonkeyText', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('jsonkeyValue') && <div className="row p2px wraptxt">
                         <div className="col-md-4">JSON Value field</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.jsonkeyValue
                                 ? this.props.selectedControl.jsonkeyValue
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'jsonkeyValue', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('drilldown0') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Level-0</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.drilldown0
                                 ? this.props.selectedControl.drilldown0
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'drilldown0', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('drilldown1') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Level-1</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.drilldown1
                                 ? this.props.selectedControl.drilldown1
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'drilldown1', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('drilldown2') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Level-2</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.drilldown2
                                 ? this.props.selectedControl.drilldown2
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'drilldown2', 'value')}/>
                         </div>
                     </div>
                     }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('drilldown3') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Level-3</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.drilldown3
                                 ? this.props.selectedControl.drilldown3
                                 : ''}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'drilldown3', 'value')}/>
                         </div>
                     </div>
                     }
                         {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('listtag') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">List type</div>
                                    <div className="col-md-8">
                                        <select   className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.listtag
                                ? this.props.selectedControl.listtag
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'listtag', 'value')}>
                                <option value='ul'>ul</option>
                                <option value='ol'>ol</option>
                            </select>
                        </div>
                    </div>
                            }
                     {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('long') &&< div className = "row p2px wraptxt" > <div className="col-md-4">Longitude
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.long
                        ? this.props.selectedControl.long
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'long', 'value')}/>
                </div>
                </div>
                }
   {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('lat') &&< div className = "row p2px wraptxt" > <div className="col-md-4">Latitude
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.lat
                        ? this.props.selectedControl.lat
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'lat', 'value')}/>
                </div>
                </div>
                }
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this.props.selectedControl.hasOwnProperty('menuoptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">menus
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" value="Click here to configure menus" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                      {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('name') &&< div className = "row p2px wraptxt" > <div className="col-md-4">Name
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.name
                        ? this.props.selectedControl.name
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'name', 'value')}/>
                </div>
                </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('pagetitle') &&< div className = "row p2px wraptxt" > <div className="col-md-4">Page Title
                </div> < div className = "col-md-8" > <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.pagetitle
                        ? this.props.selectedControl.pagetitle
                        : ' '}
                    onChange={this
                        .editControlProp
                        .bind(this, 'pagetitle', 'value')}/>
                </div>
                </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('listdata') && <div className="row p2px wraptxt">
                       <div className="col-md-4">Options
                       </div>
                       <div className="col-md-8">
                           <input type="text" className="form-control h22px" value="configure list Options" onClick={this.openModalWindow} readOnly/>
                       </div>
                   </div>
                }
                  
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('buttongroupoptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" value="Click here to configure buttons" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('taboptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" value="Click here to configure tab" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('options') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" title="options" value="Click here to configure dropdown options" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('checkboxoptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" title="options" value="Click here to configure checkbox options" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('radiooptions') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Options
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" title="options" value="Click here to configure radio options" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('src') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Src</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.src
                    ? this.props.selectedControl.src
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'src', 'value')}/>
            </div>
        </div>
                }
               {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('panelclass') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">panel class
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.panelclass
                                ? this.props.selectedControl.panelclass
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'panelclass', 'value')}/>
                        </div>
                    </div>
                            }
                             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('progressbar_active') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Progressbar Active</div>
                        <div className="col-md-8">
                           
                      <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.progressbar_active
                    ? this.props.selectedControl.progressbar_active
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'progressbar_active', 'value')}>
                    <option value=''>false</option>
                   <option value='active'>True</option>
                  
                  
               </select>
            </div>
        </div>
                }
                             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('progressbar_class') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Progressbar Class</div>
                        <div className="col-md-8">
                           
                      <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.progressbar_class
                    ? this.props.selectedControl.progressbar_class
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'progressbar_class', 'value')}>
                    <option value='progress-bar'>Default</option>
                   <option value='progress-bar progress-bar-success'>Success</option>
                    <option value='progress-bar progress-bar-info'>Info</option>
                    <option value='progress-bar progress-bar-warning'>Warning</option>
                    <option value='progress-bar progress-bar-danger'>Danger</option>
                    <option value='progress-bar progress-bar-striped'>Default with striped</option>
                    <option value='progress-bar progress-bar-success progress-bar-striped'>Success with striped</option>
                    <option value='progress-bar progress-bar-info progress-bar-striped'>Info with striped</option>
                    <option value='progress-bar progress-bar-warning progress-bar-striped'>Warning with striped</option>
                    <option value='progress-bar progress-bar-danger progress-bar-striped'>Danger with striped</option>
               </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('progressbar_complete') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Progressbar Complete</div>
                        <div className="col-md-8">
                           
                       <input
                                type="text" max="4"
                                className="form-control h22px"
                                value={this.props.selectedControl.progressbar_complete
                                ? this.props.selectedControl.progressbar_complete
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'progressbar_complete', 'value')}/>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('progressbar_text') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Progressbar Text</div>
                        <div className="col-md-8">
                           
                       <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.progressbar_text
                                ? this.props.selectedControl.progressbar_text
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'progressbar_text', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('panelheaderclass') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">panel header class
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.panelheaderclass
                                ? this.props.selectedControl.panelheaderclass
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'panelheaderclass', 'value')}/>
                        </div>
                    </div>
                            }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('panelfooterclass') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">panel footer class
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.panelfooterclass
                                ? this.props.selectedControl.panelfooterclass
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'panelfooterclass', 'value')}/>
                        </div>
                    </div>
                            }

                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('placeholder') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">placeholder
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.placeholder
                                ? this.props.selectedControl.placeholder
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'placeholder', 'value')}/>
                        </div>
                    </div>
                            }
                          {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('rows') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">rows
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.rows
                                ? this.props.selectedControl.rows
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'rows', 'value')}/>
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('showpanelheader') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Show Header</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this 
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.showpanelheader
                    ? this.props.selectedControl.showpanelheader
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'showpanelheader', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                  {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('target') && <div className="row p2px wraptxt">
                        <div className="col-md-4">target</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this 
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.target
                    ? this.props.selectedControl.target
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'target', 'value')}>
                    <option value="_blank">_blank</option>
                    <option value="_self">_self</option>
                     <option value="_parent">_parent</option>
                    <option value="_top">_top</option>
                     
                </select>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('href') && <div className="row p2px wraptxt">
                        <div className="col-md-4">href
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.href
                    ? this.props.selectedControl.href
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'href', 'value')}/>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('barCodeValue') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Barcode String
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.barCodeValue
                    ? this.props.selectedControl.barCodeValue
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'barCodeValue', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('qrCodeValue') && <div className="row p2px wraptxt">
                        <div className="col-md-4">QRcode String
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.qrCodeValue
                    ? this.props.selectedControl.qrCodeValue
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'qrCodeValue', 'value')}/>
            </div>
        </div>
                }
                                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('showpanelfooter') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Show Footer</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.showpanelfooter
                    ? this.props.selectedControl.showpanelfooter
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'showpanelfooter', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                
               {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('style') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Styles
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" value="Click here to configure styles" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('tabindex') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Tab index
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.tabindex
                    ? this.props.selectedControl.tabindex
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'tabindex', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('headertag') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Tag</div>
                                    <div className="col-md-8">
                                        <select className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.headertag
                                ? this.props.selectedControl.headertag
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'headertag', 'value')}>
                                <option value='1'>h1</option>
                                <option value='2'>h2</option>
                                <option value='3'>h3</option>
                                <option value='4'>h4</option>
                                <option value='5'>h5</option>
                                <option value='6'>h6</option>
                            </select>
                        </div>
                    </div>
                            }
                             {/*{this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('target') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">target
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.target
                                ? this.props.selectedControl.target
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'target', 'value')}/>
                        </div>
                    </div>
                            }*/}
              
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('content') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Text
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.content
                    ? this.props.selectedControl.content
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'content', 'value')}/>
            </div>
        </div>
                }
               
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this

                    .props
                    .selectedControl
                    .hasOwnProperty('align') && <div className="row p2px wraptxt">
                        <div className="col-md-4">align
                        </div>
                        <div className="col-md-8">
                           <select
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.spellcheck
                    ? this.props.selectedControl.spellcheck
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'align', 'value')}>
                    <option value='top'>top</option>
                    <option value='bottom'>bottom</option>
                     <option value='middle'>middle</option>
                     <option value='left'>left</option>
                     <option value='right'>right</option>
                </select>
                </div>
                </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('spellcheck') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Spell check</div>
                        <div className="col-md-8">
                            <select
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.spellcheck
                    ? this.props.selectedControl.spellcheck
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'spellcheck', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('submit_api') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Submit Api</div>
                        <div className="col-md-8">
                          <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.submit_api
                    ? this.props.selectedControl.submit_api
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'submit_api', 'value')}/>
            </div>
        </div>
                }
                    {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                              .props
                              .selectedControl
                              .hasOwnProperty('input_type') && <div className="row p2px wraptxt">
                                  <div className="col-md-4">Text Type</div>
                                  <div className="col-md-8">
                                      <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.input_type
                                ? this.props.selectedControl.input_type
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'input_type', 'value')}>
                                <option value="text">Text</option>
                                <option value="password">Password</option>
                                 <option value="number">Number</option>
                            </select>
                        </div>
                    </div>
                            }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('title') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Title
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.title
                    ? this.props.selectedControl.title
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'title', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('width') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Width</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.width
                    ? this.props.selectedControl.width
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'width', 'value')}/>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
        .props
        .selectedControl
        .hasOwnProperty('youtubeurl') && <div className="row p2px">
            <div className="col-md-4">Youtube Source
            </div>
            <div className="col-md-8">
                <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.youtubeurl
            ? this.props.selectedControl.youtubeurl
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'youtubeurl', 'value')}/>
    </div>
</div>
        }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('date_value') && <div className="row p2px wraptxt">
                       <div className="col-md-4">Value</div>
                       <div className="col-md-8">
                           <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.date_value
                    ? this.props.selectedControl.date_value
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'date_value', 'value')}/>
            </div>
        </div>
                }
                {/*{this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_format') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Date format</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.datepicker_format
                    ? this.props.selectedControl.datepicker_format
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_format', 'value')}>
                    <option value="MM/DD/yyyy">MM/DD/YYYY</option>
                    <option value="yyyy/MM/DD">YYYY/MM/DD</option>
                     <option value="MM-DD-yyyy">MM-DD-YYYY</option>
                      <option value="DD MM yyyy">DD MM YYYY</option>
                </select>
            </div>
        </div>
                }*/}
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_format') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Date format</div>
                        <div className="col-md-8">
                  <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.datepicker_format
            ? this.props.selectedControl.datepicker_format
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'datepicker_format', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_time') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Display Time</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.datepicker_time
                    ? this.props.selectedControl.datepicker_time
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_time', 'value')}>
                    <option value='0'>True</option>
                    <option value='2'>false</option>
                     
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_showclearbutton') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Show clear button</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.datepicker_showclearbutton
                    ? this.props.selectedControl.datepicker_showclearbutton
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_showclearbutton', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_previousbuttonelement') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Previous button text</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.datepicker_previousbuttonelement
                    ? this.props.selectedControl.datepicker_previousbuttonelement
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_previousbuttonelement', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_nextbuttonelement') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Next button text</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.datepicker_nextbuttonelement
                    ? this.props.selectedControl.datepicker_nextbuttonelement
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_nextbuttonelement', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_daylabels') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Day lable's</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.datepicker_daylabels
                    ? this.props.selectedControl.datepicker_daylabels
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_daylabels', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                   .props
                   .selectedControl
                   .hasOwnProperty('datepicker_monthlabels') && <div className="row p2px wraptxt">
                       <div className="col-md-4">month lable's</div>
                       <div className="col-md-8">
                           <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.datepicker_monthlabels
                    ? this.props.selectedControl.datepicker_monthlabels
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_monthlabels', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_weekstartsonmonday') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Week start on Monday?</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.datepicker_weekstartsonmonday
                    ? this.props.selectedControl.datepicker_weekstartsonmonday
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_weekstartsonmonday', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_showtodaybutton') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Show today's button</div>
                        <div className="col-md-8">
                            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.datepicker_showtodaybutton
                    ? this.props.selectedControl.datepicker_showtodaybutton
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_showtodaybutton', 'value')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_todaybuttonlabel') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Today's button lable</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.datepicker_todaybuttonlabel
                    ? this.props.selectedControl.datepicker_todaybuttonlabel
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_todaybuttonlabel', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datepicker_clearbuttonelement') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Clear button text</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.datepicker_clearbuttonelement
                    ? this.props.selectedControl.datepicker_clearbuttonelement
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'datepicker_clearbuttonelement', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('columncount') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Column count</div>
                        <div className="col-md-8">
                           
                      <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.columncount
                    ? this.props.selectedControl.columncount
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'columncount', 'value')}>
                   <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
               </select>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('loginAPI') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Login API URL</div>
                        <div className="col-md-8">
                            <input 
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.loginAPI
                    ? this.props.selectedControl.loginAPI
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'loginAPI', 'value')}/>
            </div>
        </div>
                }
                  {/*{this.state.showpropertyevent.indexOf('Properties')>-1&&this
                     .props
                     .selectedControl
                     .hasOwnProperty('key') && <div className="row p2px wraptxt">
                         <div className="col-md-4">Data Key</div>
                         <div className="col-md-8">
                             <input
                                 type="text"
                                 className="form-control h22px"
                                 value={this.props.selectedControl.key
                                 ? this.props.selectedControl.key
                                 : '1'}
                                 onBlur={this
                                 .updateControl
                                 .bind(this)}
                                 onChange={this
                                 .editControlProp
                                 .bind(this, 'key', 'value')}/>
                         </div>
                     </div>
                 } 
              */}
                
               
                            {/*{this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('formnovalidate') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Show Footer</div>
                                    <div className="col-md-8">
                                        <select
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.formnovalidate
                                ? this.props.selectedControl.formnovalidate
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'formnovalidate', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                            }*/}
                             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('email_placeholder') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Email Placeholder
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.email_placeholder
                                ? this.props.selectedControl.email_placeholder
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'email_placeholder', 'value')}/>
                        </div>
                    </div>
                            }
                             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('password_placeholder') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Password Placeholder
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.password_placeholder
                                ? this.props.selectedControl.password_placeholder
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'password_placeholder', 'value')}/>
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('usename') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">User Name
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.usename
                                ? this.props.selectedControl.usename
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'usename', 'value')}/>
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('password') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Password
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="password"
                                className="form-control h22px"
                                value={this.props.selectedControl.password
                                ? this.props.selectedControl.password
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'password', 'value')}/>
                        </div>
                    </div>
                            }
                             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('Email_Label') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Email Label
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.Email_Label
                    ? this.props.selectedControl.Email_Label
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'Email_Label', 'value')}/>
            </div>
        </div>
                }
                 {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('Password_Label') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Password Label
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.Password_Label
                    ? this.props.selectedControl.Password_Label
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'Password_Label', 'value')}/>
            </div>
        </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                              .props
                              .selectedControl
                              .hasOwnProperty('input_usertype') && <div className="row p2px wraptxt">
                                  <div className="col-md-4">User Text</div>
                                  <div className="col-md-8">
                                      <select
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.input_type
                                ? this.props.selectedControl.input_type
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'input_type', 'value')}>
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                    </div>
                            }
                             {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('button_form') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Button Text
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.button_form
                    ? this.props.selectedControl.button_form
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'button_form', 'value')}/>
            </div>
        </div>
                }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onblur') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onblur</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onblur"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onblur.methodname
                                ? this.props.selectedControl.events_onblur.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onblur.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onchange') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onchange</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onchange"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onchange.methodname
                                ? this.props.selectedControl.events_onchange.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onchange.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onclick') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onclick</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onclick"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onclick.methodname
                                ? this.props.selectedControl.events_onclick.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onclick.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_oncontextmenu') && <div className="row p2px wraptxt">
                                <div className="col-md-4">oncontextmenu</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_oncontextmenu"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_oncontextmenu.methodname
                                ? this.props.selectedControl.events_oncontextmenu.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_oncontextmenu.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_ondblclick') && <div className="row p2px wraptxt">
                                <div className="col-md-4">ondblclick</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_ondblclick"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_ondblclick.methodname
                                ? this.props.selectedControl.events_ondblclick.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_ondblclick.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onfocus') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onfocus</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onfocus"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onfocus.methodname
                                ? this.props.selectedControl.events_onfocus.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onfocus.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onkeydown') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onkeydown</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onkeydown"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onkeydown.methodname
                                ? this.props.selectedControl.events_onkeydown.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onkeydown.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onkeypress') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onkeypress</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onkeypress"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onkeypress.methodname
                                ? this.props.selectedControl.events_onkeypress.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onkeypress.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onkeyup') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onkeyup</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onkeyup"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onkeyup.methodname
                                ? this.props.selectedControl.events_onkeyup.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onkeyup.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onload') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onload</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onload"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onload.methodname
                                ? this.props.selectedControl.events_onload.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onload.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onmousedown') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onmousedown</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onmousedown"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onmousedown.methodname
                                ? this.props.selectedControl.events_onmousedown.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onmousedown.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                           .props
                           .selectedControl
                           .hasOwnProperty('events_onmouseover') && <div className="row p2px wraptxt">
                               <div className="col-md-4">onmouseover</div>
                               <div className="col-md-8">
                                   <input
                                type="text" title="events_onmouseover"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onmouseover.methodname
                                ? this.props.selectedControl.events_onmouseover.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onmouseover.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onmouseout') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onmouseout</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onmouseout"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onmouseout.methodname
                                ? this.props.selectedControl.events_onmouseout.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onmouseout.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onmouseup') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onmouseup</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onmouseup"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onmouseup.methodname
                                ? this.props.selectedControl.events_onmouseup.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onmouseup.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onselect') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onselect</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onselect"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onselect.methodname
                                ? this.props.selectedControl.events_onselect.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onselect.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onsubmit') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onsubmit</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onsubmit"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onsubmit.methodname
                                ? this.props.selectedControl.events_onsubmit.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onsubmit.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onunload') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onunload</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onunload"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onunload.methodname
                                ? this.props.selectedControl.events_onunload.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onunload.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onabort') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onabort</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onabort"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onabort.methodname
                                ? this.props.selectedControl.events_onabort.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onabort.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_oncanplay') && <div className="row p2px wraptxt">
                                <div className="col-md-4">oncanplay</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_oncanplay"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_oncanplay.methodname
                                ? this.props.selectedControl.events_oncanplay.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_oncanplay.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_oncanplaythrough') && <div className="row p2px wraptxt">
                                <div className="col-md-4">oncanplaythrough</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_oncanplaythrough"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_oncanplaythrough.methodname
                                ? this.props.selectedControl.events_oncanplaythrough.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_oncanplaythrough.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_ondurationchange') && <div className="row p2px wraptxt">
                                <div className="col-md-4">ondurationchange</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_ondurationchange"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_ondurationchange.methodname
                                ? this.props.selectedControl.events_ondurationchange.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_ondurationchange.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onemptied') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onemptied</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onemptied"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onemptied.methodname
                                ? this.props.selectedControl.events_onemptied.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onemptied.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onended') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onended</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onended"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onended.methodname
                                ? this.props.selectedControl.events_onended.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onended.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                           .props
                           .selectedControl
                           .hasOwnProperty('events_onerror') && <div className="row p2px wraptxt">
                               <div className="col-md-4">onerror</div>
                               <div className="col-md-8">
                                   <input
                                type="text" title="events_onerror"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onerror.methodname
                                ? this.props.selectedControl.events_onerror.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onerror.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onloadeddata') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onloadeddata</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onloadeddata"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onloadeddata.methodname
                                ? this.props.selectedControl.events_onloadeddata.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onloadeddata.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onloadedmetadata') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onloadedmetadata</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onloadedmetadata"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onloadedmetadata.methodname
                                ? this.props.selectedControl.events_onloadedmetadata.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onloadedmetadata.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onloadstart') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onloadstart</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onloadstart"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onloadstart.methodname
                                ? this.props.selectedControl.events_onloadstart.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onloadstart.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onpause') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onpause</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onpause"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onpause.methodname
                                ? this.props.selectedControl.events_onpause.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onpause.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onplay') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onplay</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onplay"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onplay.methodname
                                ? this.props.selectedControl.events_onplay.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onplay.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onplaying') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onplaying</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onplaying"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onplaying.methodname
                                ? this.props.selectedControl.events_onplaying.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onplaying.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onprogress') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onprogress</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onprogress"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onprogress.methodname
                                ? this.props.selectedControl.events_onprogress.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onprogress.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onratechange') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onratechange</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onratechange"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onratechange.methodname
                                ? this.props.selectedControl.events_onratechange.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onratechange.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onseeked') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onseeked</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onseeked"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onseeked.methodname
                                ? this.props.selectedControl.events_onseeked.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onseeked.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onseeking') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onseeking</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onseeking"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onseeking.methodname
                                ? this.props.selectedControl.events_onseeking.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onseeking.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onstalled') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onstalled</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onstalled"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onstalled.methodname
                                ? this.props.selectedControl.events_onstalled.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onstalled.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onsuspend') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onsuspend</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onsuspend"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onsuspend.methodname
                                ? this.props.selectedControl.events_onsuspend.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onsuspend.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_ontimeupdate') && <div className="row p2px wraptxt">
                                <div className="col-md-4">ontimeupdate</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_ontimeupdate"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_ontimeupdate.methodname
                                ? this.props.selectedControl.events_ontimeupdate.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_ontimeupdate.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onvolumechange') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onvolumechange</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onvolumechange"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onvolumechange.methodname
                                ? this.props.selectedControl.events_onvolumechange.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onvolumechange.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                            {this.state.showpropertyevent.indexOf('Events')>-1&&this
                            .props
                            .selectedControl
                            .hasOwnProperty('events_onwaiting') && <div className="row p2px wraptxt">
                                <div className="col-md-4">onwaiting</div>
                                <div className="col-md-8">
                                    <input
                                type="text" title="events_onwaiting"
                                className="form-control h22px"
                                value={this.props.selectedControl.events_onwaiting.methodname
                                ? this.props.selectedControl.events_onwaiting.methodname
                                : ''} onDoubleClick={this.openModalWindow}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'events_onwaiting.methodname', 'value')}
                                />
                        </div>
                    </div>
                            }
                        
  {this.state.showpropertyevent.indexOf('Events')>-1&&this
                .props
                .selectedControl
                .hasOwnProperty('events_loadtabledata') && <div className="row p2px wraptxt">
                    <div className="col-md-4">Load data</div>
                    <div className="col-md-8">
                        <input type="text" title="loaddata" className="form-control h22px"
                            value='loaddata' readOnly
                             onChange={this
                            .editControlProp
                            .bind(this, 'events_loadtabledata.methodname', 'value')}
                             onDoubleClick={this.openModalWindow}/>
                    </div>
                </div>
                }
               

                    {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('tableheaders') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Headers</div>
                        <div className="col-md-8">
                            <input type="text" title="tableheaders" className="form-control h22px"
                                value='tableheaders' readOnly
                                onChange={this
                                .editControlProp
                                .bind(this, 'tableheaders', 'value')}
                                onClick={this.openModalWindow}/>
                        </div>
                    </div>
                    }

                    {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('tableheadersclass') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Header class
                        </div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.tableheadersclass
                    ? this.props.selectedControl.tableheadersclass
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'tableheadersclass', 'value')}/>
            </div>
        </div>
                }

                    {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('datastriped') && <div className="row p2px">
                        <div className="col-md-4">Row striped
                        </div>
                        <div className="col-md-8">
                            <select  className="form-control h22px"
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                value={this.props.selectedControl.datastriped
                                ? this.props.selectedControl.datastriped
                                : false}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datastriped', 'value')}>
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </div>
                    </div>
                }
                {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('rowstyle') && <div className="row p2px wraptxt">
                        <div className="col-md-4">Row Styles
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" 
                            value={this.props.selectedControl.rowstyle}
                             title="Click here to configure row styles" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }
                
                   


                    {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('datapagesize') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Page Size
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.datapagesize
                                ? this.props.selectedControl.datapagesize
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'datapagesize', 'value')}/>
                        </div>
                    </div>
                            }
                    
                    {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                                .props
                                .selectedControl
                                .hasOwnProperty('dataheight') && <div className="row p2px wraptxt">
                                    <div className="col-md-4">Table height
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                type="text"
                                className="form-control h22px"
                                value={this.props.selectedControl.dataheight
                                ? this.props.selectedControl.dataheight
                                : ''}
                                onBlur={this
                                .updateControl
                                .bind(this)}
                                onChange={this
                                .editControlProp
                                .bind(this, 'dataheight', 'value')}/>
                        </div>
                    </div>
                            }
                  
          {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('tabledatabind') && <div className="row p2px">
                <div className="col-md-4">JSON field name
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.tabledatabind
            ? this.props.selectedControl.tabledatabind
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlPropOnly
            .bind(this, 'tabledatabind', 'value')}/>
                </div>
            </div>
        }
        {this.state.showpropertyevent.indexOf('Properties')>-1&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('jsondata') && <div className="row p2px wraptxt">
                        <div className="col-md-4">JSON Data
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control h22px" 
                            value={this.props.selectedControl.jsondata.length<25?
                            this.props.selectedControl.jsondata:
                             this.props.selectedControl.jsondata.substring(0,25)}
                             title="Click here to load JSON Data" onClick={this.openModalWindow} readOnly/>
                        </div>
                    </div>
                }

            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column1class') && <div className="row p2px">
                <div className="col-md-4">column-1 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column1class
            ? this.props.selectedControl.column1class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column1class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column2class') && <div className="row p2px">
                <div className="col-md-4">column-2 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column2class
            ? this.props.selectedControl.column2class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column2class', 'value')}/>
                </div>
            </div>
        }
        
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column3class') && <div className="row p2px">
                <div className="col-md-4">column-3 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column3class
            ? this.props.selectedControl.column3class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column3class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column4class') && <div className="row p2px">
                <div className="col-md-4">column-4 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column4class
            ? this.props.selectedControl.column4class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column4class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column5class') && <div className="row p2px">
                <div className="col-md-4">column-5 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column5class
            ? this.props.selectedControl.column5class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column5class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column6class') && <div className="row p2px">
                <div className="col-md-4">column-6 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column6class
            ? this.props.selectedControl.column6class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column6class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column7class') && <div className="row p2px">
                <div className="col-md-4">column-7 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column7class
            ? this.props.selectedControl.column7class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column7class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column8class') && <div className="row p2px">
                <div className="col-md-4">column-8 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column8class
            ? this.props.selectedControl.column8class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column8class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column9class') && <div className="row p2px">
                <div className="col-md-4">column-9 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column9class
            ? this.props.selectedControl.column9class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column9class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column10class') && <div className="row p2px">
                <div className="col-md-4">column-10 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column10class
            ? this.props.selectedControl.column10class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column10class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column11class') && <div className="row p2px">
                <div className="col-md-4">column-11 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column11class
            ? this.props.selectedControl.column11class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column11class', 'value')}/>
                </div>
            </div>
        }
            {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('column12class') && <div className="row p2px">
                <div className="col-md-4">column-12 class
                </div>
                <div className="col-md-8">
                    <input
            type="text"
            className="form-control h22px"
            value={this.props.selectedControl.column12class
            ? this.props.selectedControl.column12class
            : ''}
            onBlur={this
            .updateControl
            .bind(this)}
            onChange={this
            .editControlProp
            .bind(this, 'column12class', 'value')}/>
                </div>
            </div>
        }
         {this.state.showpropertyevent.indexOf('Properties')>-1&&this
            .props
            .selectedControl
            .hasOwnProperty('rowbgColor') && <div className="row p2px">
                <div className="col-md-4">Row background
                </div>
                <div className="col-md-8">
                    <ColorPicker color={this.props.selectedControl.rowbgColor ? 
                            this.props.selectedControl.rowbgColor: '#ffffff'}
                          
                        onChange={this.colorRowbgchangeHandler.bind(this)}
                         onClose={this.colorcloseHandler.bind(this)}>
                         <span className="rc-color-picker-trigger"/></ColorPicker>
                </div>
            </div>
        }
            <Modal isOpen={this.state.stylemodalIsOpen}
                            onRequestClose={this.closeModalWindow}
                            onAfterOpen={this.afterOpenModal}
                            contentLabel="Styles"
                            className="text-center">
                                <span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
                            <div className="row">
                            {/*styleDivSelected*/}
                            <div className="col-md-5 pull-left">
                                <div className="bold p5px align-right">Style Categories</div>
                                
                                <div id='lblFont'
                                    onClick={this
                                    .showHideStyleDiv
                                    .bind(this, "Font")}
                            className="p5px align-right">Font</div>
                        <div
                            onClick={this
                            .showHideStyleDiv
                            .bind(this, "Background")}
                            className="p5px align-right">Background</div>
                        <div
                            onClick={this
                            .showHideStyleDiv
                            .bind(this, "Position")}
                            className="p5px align-right">Position</div>
                    </div>
                    <div className="col-md-7">
                        <div id="FontDiv" className="pull-left w100percent">
                            <div className="row align-left p5px">
                                <div className="col-md-2">
                                    Font-size
                                </div>
                                <div className="col-md-7">
                                   <input
                                        type="text"
                                        className="form-control h30px"
                                        value={this.props.selectedControl.style_fontSize
                                        ? this.props.selectedControl.style_fontSize
                                        : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_fontSize', 'value')}/>
                                        </div>
                                    </div>

                                    <div className="row align-left p5px">
                                        <div className="col-md-2">Font-family</div>
                                        <div className="col-md-7">
                                            <input
                                                type="text"
                                                className="form-control h30px"
                                                value={this.props.selectedControl.style_fontFamily
                                                ? this.props.selectedControl.style_fontFamily
                                                : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_fontFamily', 'value')}/>
                            <span>(Arial,Courier,Courier New,Georgia,Helvetica,monospace,sans-serif,Times,Times New Roman,Verdana)</span></div>
                </div>

                <div className="row align-left p5px">
                    <div className="col-md-2">
                        Font-weight
                    </div>
                    <div className="col-md-7">
                        <select
                            className="form-control h30px"
                            value={this.props.selectedControl.style_fontWeight
                            ? this.props.selectedControl.style_fontWeight
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_fontWeight', 'value')}>
                            <option value="normal">normal</option>
                            <option value="bold">bold</option>
                            <option value="lighter">lighter</option>
                            <option value="bolder">bolder</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="700">700</option>
                            <option value="800">800</option>
                            <option value="900">900</option>
                            <option value="inherit">inherit</option>
                        </select>
                    </div>
                </div>

                <div className="row align-left p5px">
                    <div className="col-md-2">
                        Font-style
                    </div>
                    <div className="col-md-7">
                        <select
                            className="form-control h30px"
                            value={this.props.selectedControl.style_fontStyle
                            ? this.props.selectedControl.style_fontStyle
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_fontStyle', 'value')}>
                            <option value="normal">normal</option>
                            <option value="italic">italic</option>
                            <option value="oblique">oblique</option>
                            <option value="inherit">inherit</option>
                        </select>
                    </div>
                </div>

                <div className="row align-left p5px">
                    <div className="col-md-2">
                        Font-variant
                    </div>
                    <div className="col-md-7">
                        <select
                            className="form-control h30px"
                            value={this.props.selectedControl.style_fontVariant
                            ? this.props.selectedControl.style_fontVariant
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_fontVariant', 'value')}>
                            <option value="normal">normal</option>
                            <option value="small-caps">small-caps</option>
                            <option value="inherit">inherit</option>
                        </select>
                    </div>
                </div>

                <div className="row align-left p5px">
                    <div className="col-md-2">
                        Text-transform
                    </div>
                    <div className="col-md-7">
                        <select
                            className="form-control h30px"
                            value={this.props.selectedControl.style_textTransform
                            ? this.props.selectedControl.style_textTransform
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_textTransform', 'value')}>
                            <option value="capitalise">capitalise</option>
                            <option value="lowercase">lowercase</option>
                            <option value="none">none</option>
                            <option value="uppercase">uppercase</option>
                            <option value="inherit">inherit</option>
                        </select>
                    </div>
                </div>

                <div className="row align-left p5px">
                    <div className="col-md-2">Color</div>
                    <div className="col-md-7">
                        <ColorPicker color={this.props.selectedControl.style_color ? 
                            this.props.selectedControl.style_color: '#000000'}
                          
                        onChange={this.colorchangeHandler.bind(this)}
                         onClose={this.colorcloseHandler.bind(this)}>
                         <span className="rc-color-picker-trigger"/></ColorPicker>
                        </div>
                </div>
                <div className="row align-left p5px">
                    <div className="col-md-2">Fill</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            value={this.props.selectedControl.style_fill
                            ? this.props.selectedControl.style_fill
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_fill', 'value')}
                            className="form-control h30px"/></div>
                </div>
                
                <div className="row align-left p5px">
                    <div className="col-md-2">Text-decoration</div>
                    <div className="col-md-7">

                        <label className="font-normal pr5px">
                            <input checked={this.props.selectedControl.style_underline}
                            name="underline"
                            type="checkbox"
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_underline', 'checked')}/>underline</label>
                    <label className="font-normal pr5px">
                        <input name="overline" type="checkbox" checked={this.props.selectedControl.style_overline}
                            onChange={this
                               .editControlProp
                               .bind(this, 'style_overline', 'checked')}/>overline</label>
                       <label className="font-normal pr5px"><input name="line-through" type="checkbox" checked={this.props.selectedControl.style_linethrough}
                            onChange={this
                                   .editControlProp
                                   .bind(this, 'style_linethrough', 'checked')}/>line-through</label>
                       </div>
                   </div>
               </div>

               <div
                   id="BackgroundDiv"
                   className="pull-left w100percent"
                   style={{
                                       display: 'none'
                                   }}>
                                       <div className="row align-left p5px">
                                           <div className="col-md-2">Background-color</div>
                                            <div className="col-md-7">
                        <ColorPicker color={this.props.selectedControl.style_backgroundColor ? 
                            this.props.selectedControl.style_backgroundColor: '#ffffff'}
                          
                        onChange={this.colorBgchangeHandler.bind(this)}
                         onClose={this.colorcloseHandler.bind(this)}>
                         <span className="rc-color-picker-trigger"/></ColorPicker>
                        </div>
        </div>

        <div className="row align-left p5px">
            <div className="col-md-2">Background-image</div>
            <div className="col-md-7">
                <input
                    type="text"
                    className="form-control h30px"
                    value={this.props.selectedControl.style_backgroundImage
                    ? this.props.selectedControl.style_backgroundImage
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'style_backgroundImage', 'value')}/></div>
        </div>

        <div className="row align-left p5px">
            <div className="col-md-2">
                Background-repeat
            </div>
            <div className="col-md-7">
                <select
                    className="form-control h30px"
                    value={this.props.selectedControl.style_backgroundRepeat
                    ? this.props.selectedControl.style_backgroundRepeat
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'style_backgroundRepeat', 'value')}>
                    <option value="no-repeat">no-repeat</option>
                    <option value="repeat">repeat</option>
                    <option value="repeat-x">repeat-x</option>
                    <option value="repeat-y">repeat-y</option>
                    <option value="inherit">inherit</option>
                </select>
            </div>
        </div>

        <div className="row align-left p5px">
            <div className="col-md-2">
                Background-attachment
            </div>
            <div className="col-md-7">
                <select
                    className="form-control h30px"
                    value={this.props.selectedControl.style_backgroundattachment
                    ? this.props.selectedControl.style_backgroundattachment
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'style_backgroundattachment', 'value')}>
                    <option value="fixed">fixed</option>
                    <option value="scroll">scroll</option>
                    <option value="inherit">inherit</option>
                </select>
            </div>
        </div>

        <div className="row align-left p5px">
            <div className="col-md-2">
                Background-x-position
            </div>
            <div className="col-md-7">
                <select
                    className="form-control h30px"
                    value={this.props.selectedControl.style_backgroundxposition
                    ? this.props.selectedControl.style_backgroundxposition
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'style_backgroundxposition', 'value')}>
                    <option value="left">left</option>
                    <option value="right">right</option>
                    <option value="inherit">inherit</option>
                </select>
            </div>
        </div>
        <div className="row align-left p5px">
            <div className="col-md-2">
                Background-y-position
            </div>
            <div className="col-md-7">
                <select
                    className="form-control h30px"
                    value={this.props.selectedControl.style_backgroundyposition
                    ? this.props.selectedControl.style_backgroundyposition
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'style_backgroundyposition', 'value')}>
                    <option value="bottom">bottom</option>
                    <option value="center">center</option>
                    <option value="top">top</option>
                </select>
            </div>
        </div>
        <div className="row align-left p5px">
                    <div className="col-md-2">Border:</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            value={this.props.selectedControl.style_border
                            ? this.props.selectedControl.style_border
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_border', 'value')}
                            className="form-control h30px"/></div>
                </div>
                  <div className="row align-left p5px">
                    <div className="col-md-2">Border-radius:</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control h30px"
                            value={this.props.selectedControl.style_borderRadius
                            ? this.props.selectedControl.style_borderRadius
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_borderRadius', 'value')}/></div>
                </div>
                <div className="row align-left p5px">
                    <div className="col-md-2">Border-top:</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control h30px"
                            value={this.props.selectedControl.style_borderTop
                            ? this.props.selectedControl.style_borderTop
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_borderTop', 'value')}/></div>
                </div>
                <div className="row align-left p5px">
                    <div className="col-md-2">Border-bottom:</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control h30px"
                            value={this.props.selectedControl.style_borderBottom
                            ? this.props.selectedControl.style_borderBottom
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_borderBottom', 'value')}/></div>
                </div>
                <div className="row align-left p5px">
                    <div className="col-md-2">Border-right:</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control h30px"
                            value={this.props.selectedControl.style_borderRight
                            ? this.props.selectedControl.style_borderRight
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_borderRight', 'value')}/></div>
                </div>
                <div className="row align-left p5px">
                    <div className="col-md-2">Border-left:</div>
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control h30px"
                            value={this.props.selectedControl.style_borderLeft
                            ? this.props.selectedControl.style_borderLeft
                            : ''}
                            onBlur={this
                            .updateControl
                            .bind(this)}
                            onChange={this
                            .editControlProp
                            .bind(this, 'style_borderLeft', 'value')}/></div>
                </div>
    </div>

    <div
                    id="PositionDiv"
                    className="pull-left w100percent"
                    style={{
                        display: 'none'
                    }}>

                        <div className="row align-left p5px">
                            <div className="col-md-2">
                                Position
                            </div>
                            <div className="col-md-7">
                                <select
                                    className="form-control h30px"
                                    value={this.props.selectedControl.style_position
                                    ? this.props.selectedControl.style_position
                                    : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_position', 'value')}>
                <option value="absolute">absolute</option>
                <option value="fixed">fixed</option>
                <option value="relative">relative</option>
                <option value="static">static</option>
                <option value="inherit">inherit</option>
            </select>
        </div>
    </div>

    <div className="row align-left p5px">
        <div className="col-md-2">Z-index</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_zIndex
                ? this.props.selectedControl.style_zIndex
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_zIndex', 'value')}/></div>
    </div>
     <div className="row align-left p5px">
        <div className="col-md-2">display</div>
        <div className="col-md-7">
            <select className="form-control h22px"
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    value={this.props.selectedControl.style_display
                    ? this.props.selectedControl.style_display
                    : false}
                    onChange={this
                    .editControlProp
                    .bind(this, 'style_display', 'value')}>
                   <option value='block'>block</option>
                    <option value='none'>none</option>
                   <option value='fixed'>fixed</option>
                    <option value='inline-block'>inline-block</option>
                    <option value='inherit'>inherit</option>
               </select></div>
    </div>
                    
    <div className="row align-left p5px">
        <div className="col-md-2">Width</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_width
                ? this.props.selectedControl.style_width
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_width', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Height</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_height
                ? this.props.selectedControl.style_height
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_height', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Margin</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_margin
                ? this.props.selectedControl.style_margin
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_margin', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Padding</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_padding
                ? this.props.selectedControl.style_padding
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_padding', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Text-align</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_textAlign
                ? this.props.selectedControl.style_textAlign
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_textAlign', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Line-height</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_lineHeight
                ? this.props.selectedControl.style_lineHeight
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_lineHeight', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Top</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_top
                ? this.props.selectedControl.style_top
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_top', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Right</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_right
                ? this.props.selectedControl.style_right
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_right', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Bottom</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_bottom
                ? this.props.selectedControl.style_bottom
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_bottom', 'value')}/></div>
    </div>
    <div className="row align-left p5px">
        <div className="col-md-2">Left</div>
        <div className="col-md-7">
            <input
                type="text"
                className="form-control h30px"
                value={this.props.selectedControl.style_left
                ? this.props.selectedControl.style_left
                : ''}
                onBlur={this
                .updateControl
                .bind(this)}
                onChange={this
                .editControlProp
                .bind(this, 'style_left', 'value')}/></div>
    </div>

</div>
</div>
</div>
</Modal>


<Modal
isOpen={this.state.ddloptionModalIsOpen}
                onRequestClose={this.closeModalWindow}
                contentLabel="Drop Down Options"
                className="text-center">
<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
                 <div className="row">
                      <ul>
                          <li>
                             <div className="row">
                                <div className="col-sm-4"><b>Option</b></div>
                                <div className="col-sm-4"><b>Value</b></div>
                                <div className="col-sm-4 align-left"><b>Action</b></div>
                            </div>
                          </li>
                {
                              this
                            .props
                            .selectedControl
                            .hasOwnProperty('options')&&
                          this.props.selectedControl.options.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                              <div className="row">
                               <div className="col-sm-4">
                                   <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                    placeholder="Option text"
                    value={option.text} onBlur={this.editDropDownOption.bind(this)}
                    onChange={this.editDropDownOption.bind(this, index)} />
              </div>
              <div className="col-sm-4">
                 <input className="form-control" type="text" name={'value_'+index}
                    value={option.value} onChange={this.editDropDownValue.bind(this, index)} />
                  </div>
                  <div className="col-sm-4 align-left">
                    <button onClick={this.addDropDownOption.bind(this, index)} className="btn btn-success">
                        <i className="fa fa-plus-circle"></i></button>
                      { index > 0 &&
                      <button onClick={this.removeDropDownOption.bind(this, index)} className="btn btn-danger">
                          <i className="fa fa-minus-circle"></i></button>
                      }
                  </div>
                </div>
             </li>
                 )
                      })
                              }
                          </ul>
                     </div>
                   </Modal>
                   <Modal
isOpen={this.state.radiooptionModalIsOpen}
                onRequestClose={this.closeModalWindow}
                contentLabel="Radio Button Options"
                className="text-center">
<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
                 <div className="row">
                      <ul>
                          <li>
                             <div className="row">
                                <div className="col-sm-4"><b>Option</b></div>
                                <div className="col-sm-4"><b>Value</b></div>
                                <div className="col-sm-4 align-left"><b>Action</b></div>
                            </div>
                          </li>
                {
                              this
                            .props
                            .selectedControl
                            .hasOwnProperty('radiooptions')&&
                          this.props.selectedControl.radiooptions.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                              <div className="row">
                               <div className="col-sm-4">
                                   <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                    placeholder="Option text"
                    value={option.text} onBlur={this.editradioOption.bind(this)}
                    onChange={this.editradioOption.bind(this, index)} />
              </div>
              <div className="col-sm-4">
                 <input className="form-control" type="text" name={'value_'+index}
                    value={option.value} onChange={this.editRadiobuttonValue.bind(this, index)} />
                  </div>
                  <div className="col-sm-4 align-left">
                    <button onClick={this.addradioOption.bind(this, index)} className="btn btn-success">
                        <i className="fa fa-plus-circle"></i></button>
                      { index > 0 &&
                      <button onClick={this.removeradioOption.bind(this, index)} className="btn btn-danger">
                          <i className="fa fa-minus-circle"></i></button>
                      }
                  </div>
                </div>
             </li>
                 )
                      })
                              }
                          </ul>
                     </div>
                   </Modal>
                     <Modal
isOpen={this.state.checkboxoptionModalIsOpen}
                onRequestClose={this.closeModalWindow}
                contentLabel="Checkbox Options"
                className="text-center">
<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
                 <div className="row">
                      <ul>
                          <li>
                             <div className="row">
                                <div className="col-sm-4"><b>Option</b></div>
                                <div className="col-sm-4"><b>Value</b></div>
                                <div className="col-sm-4 align-left"><b>Action</b></div>
                            </div>
                          </li>
                {
                              this
                            .props
                            .selectedControl
                            .hasOwnProperty('checkboxoptions')&&
                          this.props.selectedControl.checkboxoptions.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                              <div className="row">
                               <div className="col-sm-4">
                                   <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                    placeholder="Option text"
                    value={option.text} onBlur={this.editcheckboxOption.bind(this)}
                    onChange={this.editcheckboxOption.bind(this, index)} />
              </div>
              <div className="col-sm-4">
                 <input className="form-control" type="text" name={'value_'+index}
                    value={option.value} onChange={this.editcheckboxValue.bind(this, index)} />
                  </div>
                  <div className="col-sm-4 align-left">
                    <button onClick={this.addcheckboxOption.bind(this, index)} className="btn btn-success">
                        <i className="fa fa-plus-circle"></i></button>
                      { index > 0 &&
                      <button onClick={this.removecheckboxOption.bind(this, index)} className="btn btn-danger">
                          <i className="fa fa-minus-circle"></i></button>
                      }
                  </div>
                </div>
             </li>
                 )
                      })
                              }
                          </ul>
                     </div>
                   </Modal>
                   <Modal
                    isOpen={this.state.tabmodalIsOpen}
                onRequestClose={this.closeModalWindow}
                contentLabel="Events"
                className="text-center">
                <span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
          <div className="row">
             <ul>
                 <li>
                    <div className="row">                      
                      <div className="col-sm-3"><b>Tab</b></div>
                      <div className="col-sm-2"><b>Tab class</b></div>  
                      <div className="col-sm-2"><b>Href</b></div>
                      <div className="col-sm-2"><b>Href class</b></div>          
                                {/*<div className="col-sm-2"><b>Row Number as Content</b></div>*/}
                      <div className="col-sm-3 align-left"><b>Action</b></div>
                     </div>
                 </li>
                {
                              this
                            .props
                            .selectedControl
                            .hasOwnProperty('taboptions')&&
                          this.props.selectedControl.taboptions.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                              <div className="row">
                                <div className="col-sm-3">
                                    <input className="form-control" type="text" name={'value_'+index} onBlur={this.updateControl.bind(this)}
                                    value={option.TabName}  onChange={this.editTabOptions.bind(this, index,'TabName')} />
                                </div>
                                <div className="col-sm-2">
                                    <input className="form-control" type="text" name={'text_'+index}  onBlur={this.updateControl.bind(this)}
                                     value={option.liclass}  onChange={this.editTabOptions.bind(this, index,'liclass')} />
                                </div>
                                <div className="col-sm-2">
                                    <input className="form-control" type="text" name={'href_'+index}  onBlur={this.updateControl.bind(this)}
                                     value={option.href}  onChange={this.editTabOptions.bind(this, index,'href')} />
                                </div>
                                <div className="col-sm-2">
                                    <input className="form-control" type="text" name={'text_'+index}  onBlur={this.updateControl.bind(this)}
                                     value={option.hrefclass}  onChange={this.editTabOptions.bind(this, index,'hrefclass')} />
                                </div>                                
                                 {/*<div className="col-sm-2">
                                    <input className="form-control" type="text" name={'value_'+index}
                                    value={option.rownumbers}  onChange={this.editTabOptions.bind(this, index,'rownumbers')} />
                                </div>*/}
                                <div className="col-sm-3 align-left">
                                    <button onClick={this.addTabOption.bind(this, index)} className="btn btn-success">
                                         <i className="fa fa-plus-circle"></i></button>
                                    { index > 0 &&
                                        <button onClick={this.removeTabOption.bind(this, index)} className="btn btn-danger">
                                            <i className="fa fa-minus-circle"></i></button>
                                    }
                                </div>
                            </div>
                        </li>
                            )
                          })
                              }
                 </ul>
              </div>
            </Modal>

                   <Modal
                    isOpen={this.state.buttongroupmodalIsOpen}
                onRequestClose={this.closeModalWindow}
                contentLabel="Drop Down Options"
                className="text-center">
<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
                <div className="row p5px">
                     <button value="Primary Button" onClick={this.showHideButtonGroupOptions.bind(this, "PrimaryButton")} className="p2px">Primary Button</button>
                      <button value="Nesting Button" onClick={this.showHideButtonGroupOptions.bind(this, "GroupButton")}  className="p2px">Nesting Button</button>
                </div>

                <div className="row" id="PrimaryButtonDiv">
                    <ul>
                        <li>
                             <div className="row">
                                <div className="col-sm-4"><b>Value</b></div>
                                <div className="col-sm-4 align-left"><b>Action</b></div>
                            </div>
                        </li>
                      {
                              this
                            .props
                            .selectedControl
                            .hasOwnProperty('buttongroupoptions')&&
                          this.props.selectedControl.buttongroupoptions.map((option, index) => {

                              return (
                               <li className="clearfix" key={index}>
                              <div className="row">

                                <div className="col-sm-8">
                                   <input className="form-control" type="text" name={'value_'+index}
                          onBlur={this.updateButtonGroupPrimaryOption.bind(this)}
                          value={option.value} onChange={this.editButtonGroupPrimaryOption.bind(this, index)} />
                        </div>
                        <div className="col-sm-4 align-left">
                          <button onClick={this.addButtonGroupPrimaryOption.bind(this, index)} className="btn btn-success">
                              <i className="fa fa-plus-circle"></i></button>
                            { index > 0 &&
                            <button onClick={this.removeButtonGroupPrimaryOption.bind(this, index)} className="btn btn-danger">
                                <i className="fa fa-minus-circle"></i></button>
                            }
                        </div>
                      </div>
                   </li>
                       )
                            })
                            }
                        </ul>
                    </div>
                    <div className="row" id="GroupButtonDiv" style={{display: 'none'}}>
                {
                    this
                           .props
                           .selectedControl
                           .hasOwnProperty('buttongroupoptions')&& <div>
                           <select id="primaryButtonSelected" onChange={this.setSelectedNestedbuttons.bind(this)}>
                               {this
                                   .props
                                   .selectedControl
                                   .buttongroupoptions
                                   .map(function (option) {
                                       return <option value={option.key} key={option.key}>{option.value}</option>;
                                   })}
                           </select>

                            <button onClick={this.addButtonGroupNestedOption.bind(this)} className="btn btn-success">
                                      <i className="fa fa-plus-circle"></i></button>
                                      <ul>
                           {
                               this.props.selectedControl.hasOwnProperty('selectednestedbuttons')&&
                               this.props.selectedControl.selectednestedbuttons.map((option, index) => {
                                   return(
                                       
                                       <li  className="clearfix" key={index}>
                                           <div className="row">
                                               <div className="col-sm-4">
                                               <input className="form-control" type="text" name={'value_'+index}   placeholder="href"
        value={option.href} onChange={this.editNestedbuttons.bind(this, index)}  />
    </div>
    <div className="col-sm-4">
    <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
        placeholder="text" onChange={this.editNestedbuttonsText.bind(this, index)}
        value={option.text} onBlur={this.updateNestedbuttons.bind(this)}  />
  </div>

  <div className="col-sm-4 align-left">
      <button onClick={this.removeNestedbuttons.bind(this, index)} className="btn btn-danger">
          <i className="fa fa-minus-circle"></i></button>
  </div>
</div>
</li>
                                        )
                                    })
                                }
</ul>
</div>
}
                    </div>
</Modal>
<Modal
isOpen={this.state.eventsmodalIsOpen}
onRequestClose={this.closeModalWindow}
contentLabel="Events"
className="text-center">
<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
<div className="row">
    <div className="col-sm-4 align-right">
       Event calling signature
    </div>
    <div className="col-sm-8">
   <input type="text" className="form-control"
value={selectedeventformodification.methodname
          ?selectedeventformodification.methodname
          : ''}
onBlur={this
.updateControl
.bind(this)}
onChange={this
.editControlEvents
.bind(this,"methodname", 'value')}/>

</div>
</div>

<div className="row">
    <div className="col-sm-4 align-right">
       Method
    </div>
    <div className="col-sm-8">
   <textarea type="text" className="form-control" rows="25"
value={selectedeventformodification.method
          ?selectedeventformodification.method
          : ''}
onBlur={this
.updateControl
.bind(this)}
onChange={this
.editControlEvents
.bind(this,"method", 'value')}/>

</div>
</div>
</Modal>

<Modal
isOpen={this.state.listOptionmodalIsOpen}
onRequestClose={this.closeModalWindow}
contentLabel="Events"
className="text-center">
<span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
<div className="row">
   <ul>
       <li>
          <div className="row">
             <div className="col-sm-6"><b>Option</b></div>
             <div className="col-sm-6 align-left"><b>Action</b></div>
           </div>
       </li>
{
    this
  .props
  .selectedControl
  .hasOwnProperty('listdata')&&
this.props.selectedControl.listdata.map((option, index) => {
    return (
     <li className="clearfix" key={index}>
    <div className="row">
     <div className="col-sm-6">
         <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
    placeholder="Option text"
    value={option} onBlur={this.editListOption.bind(this)}
    onChange={this.editListOption.bind(this, index)} />
</div>

<div className="col-sm-4 align-left">
  <button onClick={this.addListOption.bind(this, index)} className="btn btn-success">
      <i className="fa fa-plus-circle"></i></button>
    { index > 0 &&
    <button onClick={this.removeListOption.bind(this, index)} className="btn btn-danger">
        <i className="fa fa-minus-circle"></i></button>
        }
</div>
</div>
</li>
                                    )
})
}
</ul>
</div>
</Modal>
            <Modal
                    isOpen={this.state.listOptionmodalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="Events"
                    className="text-center">
                    <span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
              <div className="row">
                 <ul>
                     <li>
                        <div className="row">
                           <div className="col-sm-6"><b>Option</b></div>
                           <div className="col-sm-6 align-left"><b>Action</b></div>
                         </div>   
                     </li>
                     { 
                                this
                                .props
                                .selectedControl
                                .hasOwnProperty('listdata')&&              
                              this.props.selectedControl.listdata.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                                  <div className="row">
                                   <div className="col-sm-6">
                                       <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                        placeholder="Option text" 
                                          value={option} onBlur={this.editListOption.bind(this)} 
                                          onChange={this.editListOption.bind(this, index)} />
                                    </div>
                                  
                                     <div className="col-sm-4 align-left">
                                       <button onClick={this.addListOption.bind(this, index)} className="btn btn-success">
                                           <i className="fa fa-plus-circle"></i></button>
                                         { index > 0 &&
                                         <button onClick={this.removeListOption.bind(this, index)} className="btn btn-danger">
                                             <i className="fa fa-minus-circle"></i></button>
                                         }
                                     </div>
                                   </div>  
                                </li>
                                    )
                                  })
                              }
                 </ul>
              </div>
            </Modal>
             <Modal
                    isOpen={this.state.ImageOptionmodalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="Events"
                    className="text-center">
                    <span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
              <div className="row">
                 <ul>
                     <li>
                        <div className="row">
                           <div className="col-sm-4"><b>Src</b></div>
                           <div className="col-sm-4"><b>Click Function</b></div>
                           <div className="col-sm-4 align-left"><b>Action</b></div>
                         </div>   
                     </li>
                     { 
                                this
                                .props
                                .selectedControl
                                .hasOwnProperty('Carousaloptions')&&              
                              this.props.selectedControl.Carousaloptions.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                                  <div className="row">
                                   <div className="col-sm-4">
                                       <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                        placeholder="src text" 
                                          value={option.Src} onBlur={this.editImageOption.bind(this)} 
                                          onChange={this.editImageOption.bind(this, index)} />
                                    </div>
                                  <div className="col-sm-4">
                                           <input className="form-control" type="text"  placeholder="Click function"  name={'href_'+index}  onBlur={this.editClickImageOption.bind(this)} 
                                     value={option.Clickfunction} onChange={this.editClickImageOption.bind(this, index)} />
                                    </div>
                                    
                                     <div className="col-sm-4 align-left">
                                       <button onClick={this.addImageOption.bind(this, index)} className="btn btn-success">
                                           <i className="fa fa-plus-circle"></i></button>
                                         { index > 0 &&
                                         <button onClick={this.removeImageOption.bind(this, index)} className="btn btn-danger">
                                             <i className="fa fa-minus-circle"></i></button>
                                         }
                                     </div>
                                   </div>  
                                </li>
                                    )
                                  })
                              }
                 </ul>
              </div>
            </Modal>
  <Modal
                    isOpen={this.state.ColorOptionmodalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="Events"
                    className="text-center">
                    <span onClick={this.closeModalWindow} style={{"float":"right","marginRight":"160px"}} className="glyphicon glyphicon-remove delete-icon"></span>
              <div className="row">
                 <ul>
                     <li>
                        <div className="row">
                           <div className="col-sm-3"><b>Color</b></div>
                           <div className="col-sm-3"><b>Value</b></div>
                           <div className="col-sm-3"><b>Legend value</b></div>
                           <div className="col-sm-3 align-left"><b>Action</b></div>
                         </div>   
                     </li>
                     { 
                                this
                                .props
                                .selectedControl
                                .hasOwnProperty('colorOptions')&&              
                              this.props.selectedControl.colorOptions.map((option, index) => {
                              return (
                               <li className="clearfix" key={index}>
                                  <div className="row">
                                   <div className="col-sm-3">
                                       <ColorPicker color={this.props.selectedControl.colorOptions.Color ? 
                                            this.props.selectedControl.colorOptions.Color: option.Color}
                                         
                                        onChange={this.colorchartchangeHandler.bind(this,index)}
                                        onClose={this.colorcloseHandler.bind(this)}>
                                        <span className="rc-color-picker-trigger"/></ColorPicker>
                                    </div>
                                    <div className="col-sm-3">
                                       <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                        placeholder="For Value" 
                                          value={option.value} onBlur={this.editColorOption.bind(this)} 
                                          onChange={this.editColorOption.bind(this, index)} />
                                    </div>
                                    <div className="col-sm-3">
                                       <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                        placeholder="For Value" 
                                          value={option.legendvalue} onBlur={this.editLegendOption.bind(this)} 
                                          onChange={this.editLegendOption.bind(this, index)} />
                                    </div>
                                     <div className="col-sm-3 align-left">
                                       <button onClick={this.addColorOption.bind(this, index)} className="btn btn-success">
                                           <i className="fa fa-plus-circle"></i></button>
                                         { index > 0 &&
                                         <button onClick={this.removeColorOption.bind(this, index)} className="btn btn-danger">
                                             <i className="fa fa-minus-circle"></i></button>
                                         }
                                     </div>
                                   </div>  
                                </li>
                                    )
                                  })
                              }
                 </ul>
              </div>
            </Modal>
            <Modal isOpen={this.state.loaddatamodalIsOpen}
                    onRequestClose={this.closeModalWindow}
                    contentLabel="Data bind"
                    className="text-center">
              <div className="row">
                  <div className="col-sm-4 align-right">
                     Event
                  </div>
                  <div className="col-sm-8">
                 <input type="text" className="form-control" readOnly
                  value="onload"  onChange={this.editControlEvents.bind(this,"methodname", 'value')}/>
                  </div>
              </div>
               <div className="row">
                  <div className="col-sm-4 align-right">
                     Consider data as
                  </div>
                  <div className="col-sm-8">
                      <div style={{"float":"left"}}>
                       <input type="radio" name="dataloadchoice" value="json" 
                       onChange={this.editControlPropOnly.bind(this, 'dataloadchoice', 'value')}
                       checked={this.props.selectedControl.dataloadchoice=="json"?true:false}/>
                         <label>Json</label>
                      </div>
                      <div  style={{"float":"left","paddingLeft":"10px"}}>
                       <input type="radio" name="dataloadchoice" value="object"
                        onChange={this.editControlPropOnly.bind(this, 'dataloadchoice', 'value')}
                       checked={this.props.selectedControl.dataloadchoice=="object"?true:false}/>
                         <label>Variable/Object</label>
                      </div>
                  </div>
               </div>
              <div className="row">
                  <div className="col-sm-4 align-right">
                     Data/Variable assign as data
                  </div>
                  <div className="col-sm-8">
                 <textarea type="text" className="form-control" rows="25"
                  value={selectedeventformodification.method
                            ?selectedeventformodification.method
                            : ''}  onChange={this.editControlEvents.bind(this,"method", 'value')}/>
                  </div>
              </div>
              <div className="row">
                  <input type="button" value="Bind Data" onClick={this.updateloaddata.bind(this)}/>
              </div>
            </Modal>
            <Modal isOpen={this.state.tableheadermodalIsOpen} onRequestClose={this.closeModalWindow}
                    contentLabel="Table Header's configuration" className="text-center">
               <div className="row">
                 <ul>
                   <li>
                    <div className="row">
                       <div className="col-sm-1"><b>Data Field</b></div>
                       <div className="col-sm-1"><b>Header Text</b></div>
                        <div className="col-sm-1"><b>Col-span</b></div>
                        <div className="col-sm-1"><b>Col-span Header text</b></div>
                       <div className="col-sm-1"><b>Column class</b></div>
                       <div className="col-sm-1"><b>Data align</b></div>
                       <div className="col-sm-1"><b>Data v-align</b></div>
                       <div className="col-sm-1 align-left"><b>Is Sortable</b></div>
                       <div className="col-sm-1 align-left"><b>Is Groupby</b></div>
                       <div className="col-sm-1 align-left"><b>Is Visible</b></div>
                       <div className="col-sm-1 align-left"><b>Is RadioButton</b></div>
                       <div className="col-sm-1 align-left"><b>Is CheckBox</b></div>
                    </div></li>
                    {
                     this.props.selectedControl.hasOwnProperty('tableheaders')&&              
                     this.props.selectedControl.tableheaders.map((option, index) => {
                        return(
                        <li className="clearfix" key={index}>
                         <div className="row">
                            <div className="col-sm-1">{option.datafield}</div>
                            <div className="col-sm-1">
                                <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                 value={option.headertext} onChange={this.edittableHeaders.bind(this,"headertext", 'value',index)} />
                            </div>
                             <div className="col-sm-1">
                                <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                 value={option.colspan} onChange={this.edittableHeaders.bind(this,"colspan", 'value',index)} />
                            </div>
                             <div className="col-sm-1">
                                <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                 value={option.groupheading} onChange={this.edittableHeaders.bind(this,"groupheading", 'value',index)} />
                            </div>
                            <div className="col-sm-1">
                                <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                 value={option.dataclass} onChange={this.edittableHeaders.bind(this,"dataclass", 'value',index)} />
                            </div>
                            <div className="col-sm-1">
                                <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                 value={option.dataalign} onChange={this.edittableHeaders.bind(this,"dataalign", 'value',index)} />
                                 <br/>(left/right/center)
                            </div>
                            
                            <div className="col-sm-1">
                                <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                 value={option.datavalign} onChange={this.edittableHeaders.bind(this,"datavalign", 'value',index)} />
                                <br/>(top/middle/bottom)
                            </div>
                            <div className="col-sm-1 align-left">
                                 <input tabIndex={index+1} className="form-control" type="checkbox" name={'text_'+index}
                                 checked={option.sortable} onChange={this.edittableHeaders.bind(this,"sortable", 'checked',index)}/>
                            </div>
                            <div className="col-sm-1 align-left">
                                 <input tabIndex={index+1} className="form-control" type="checkbox" name={'text_'+index}
                                 checked={option.isgroupby} onChange={this.edittableHeaders.bind(this,"isgroupby", 'checked',index)}/>
                            </div>
                            <div className="col-sm-1 align-left">
                                 <input tabIndex={index+1} className="form-control" type="checkbox" name={'text_'+index}
                                 checked={option.datavisible} onChange={this.edittableHeaders.bind(this,"datavisible", 'checked',index)}/>
                            </div>
                             <div className="col-sm-1 align-left">
                                 <input tabIndex={index+1} className="form-control" type="checkbox" name={'text_'+index}
                                 checked={option.dataradio} onChange={this.edittableHeaders.bind(this,"dataradio", 'checked',index)}/>
                            </div>
                             <div className="col-sm-1 align-left">
                                 <input tabIndex={index+1} className="form-control" type="checkbox" name={'text_'+index}
                                 checked={option.datacheckbox} onChange={this.edittableHeaders.bind(this,"datacheckbox", 'checked',index)}/>
                            </div>
                         </div>
                        </li> 
                        )
                     })
                    }                                    
                 </ul>
               </div>
            </Modal>
            <Modal isOpen={this.state.navigationmenumodalIsOpen} onRequestClose={this.closeModalWindow}
                contentLabel="Navigation Menus" className="text-center">
               <div className="row p5px">
                 <button value="Menus" onClick={this.showHideNavigationMenuOptions.bind(this, "menus")} className="p2px">Menus</button>
                 <button value="Sub menus" onClick={this.showHideNavigationMenuOptions.bind(this, "submenus")}  className="p2px">Sub menus</button>
                </div>
               <div className="row" id="MenuDiv">
                   <ul>
                       <li>
                             <div className="row">
                                <div className="col-sm-4"><b>Menu</b></div>
                                <div className="col-sm-4 align-left"><b>Link</b></div>
                            </div>
                       </li>
                       {this.props.selectedControl.hasOwnProperty('menuoptions')&&
                          this.props.selectedControl.menuoptions.map((option, index) => {
                         return (
                         <li className="clearfix" key={index}>
                         <div className="row">
                         <div className="col-sm-4">
                            <input className="form-control" type="text" name={'value_'+index}
                            onBlur={this.updateNavigationMenuOption.bind(this)}
                            value={option.menu} onChange={this.editNavigationMenuOption.bind(this, index,'menu')} />
                        </div>
                        <div className="col-sm-4">
                             <input className="form-control" type="text" name={'value_'+index}
                          onBlur={this.updateNavigationMenuOption.bind(this)}
                          value={option.link} onChange={this.editNavigationMenuOption.bind(this, index,'link')} />

                       </div>
                        <div className="col-sm-4 align-left">
                          <button onClick={this.addNavigationMenuOption.bind(this, index)} className="btn btn-success">
                              <i className="fa fa-plus-circle"></i></button>
                            { index > 0 &&
                            <button onClick={this.removeNavigationMenuOption.bind(this, index)} className="btn btn-danger">
                                <i className="fa fa-minus-circle"></i></button>
                            }
                        </div>
                      </div>
                   </li>
                       )
                     })
                    }
                   </ul>
               </div>
               <div className="row" id="SubMenuDiv" style={{display: 'none'}}>
               {
               this.props.selectedControl.hasOwnProperty('menuoptions')&& <div>
               <select id="menuSelected" onChange={this.setSelectedSubMenus.bind(this)}>
                               {this
                                   .props
                                   .selectedControl
                                   .menuoptions
                                   .map(function (option) {
                                       return <option value={option.key} key={option.key}>{option.menu}</option>;
                                   })}
                           </select>

                           <button onClick={this.addSubMenuOption.bind(this)} className="btn btn-success">
                           <i className="fa fa-plus-circle"></i></button>
                           <ul>
                           {
                               this.props.selectedControl.hasOwnProperty('selectednestedmenus')&&
                               this.props.selectedControl.selectednestedmenus.map((option, index) => {
                                   return(
                               <li  className="clearfix" key={index}>
                               <div className="row">
                               <div className="col-sm-4">
                               <input className="form-control" type="text" name={'value_'+index}   placeholder="menu"
                                value={option.menu} onChange={this.editSubMenu.bind(this, index)} />
                            </div>
                            <div className="col-sm-4">
                            <input tabIndex={index+1} className="form-control" type="text" name={'text_'+index}
                                placeholder="link" onChange={this.editSubmenuLink.bind(this, index)}
                                value={option.link} onBlur={this.updateSubMenuOption.bind(this)}  />
                        </div>

                        <div className="col-sm-4 align-left">
                            <button onClick={this.removeSubMenus.bind(this, index)} className="btn btn-danger">
                                <i className="fa fa-minus-circle"></i></button>
                        </div>
                        </div>
                        </li>
                                        )
                                    })
                                }
                                </ul>
                </div>
               }
               </div>
            </Modal>
            <Modal isOpen={this.state.rowstylemodalIsOpen} onRequestClose={this.closeModalWindow} contentLabel="Row Style" className="text-center">
             <div className="row">
                <div className="col-sm-2 align-right">
                Function name
                </div>
                <div className="col-sm-5">
                    <input type="text" className="form-control"
                    value={this.props.selectedControl.rowstyle
                            ?this.props.selectedControl.rowstyle
                            : ''}
                    onBlur={this.updateControl.bind(this)}
                    onChange={this.editControlProp.bind(this,"rowstyle", 'value')}/>
                </div>
                <div className="col-sm-5" style={{'textAlign':'left'}}>
                  Example - rowStyle<br/>
                  ========================
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2 align-right">
                Function
                </div>
                <div className="col-sm-5">
                    <textarea type="text" className="form-control" rows="25"
                    value={this.props.selectedControl.rowstylefunction
                            ?this.props.selectedControl.rowstylefunction
                            : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this,"rowstylefunction", 'value')}/>
                </div>
                 <div className="col-sm-5" style={{'textAlign':'left'}}>
                  Example -<br/>
                  =============
                  <span dangerouslySetInnerHTML={{__html:this.props.selectedControl.rowstylefunctionexample}} />
                   
                </div>
            </div>
            </Modal>
            <Modal isOpen={this.state.tblDataFormattermodalIsOpen} onRequestClose={this.closeModalWindow} contentLabel="Data Formatter" className="text-center">
              <div className="row">
               <div className="col-sm-2 align-right">
                    Data Field
                </div>
                <div className="col-sm-5 align-left">
                <select id="dataformatterfunctionField"
            value={this.props.selectedControl.dataformatterfunctionFieldTemp
            ? this.props.selectedControl.dataformatterfunctionFieldTemp
            : ''}
            onChange={this
            .editTableDataFormatter
            .bind(this, 'dataformatterfunctionFieldTemp', 'value')}>
              { this.props.selectedControl.hasOwnProperty('tableheaders')&&
                   this.props.selectedControl.tableheaders.map(function (option) {
                return <option value={option.datafield} key={option.datafield}>{option.datafield}</option>;
                 })
               }
                 </select>
                </div>
              </div>
              <div className="row">
               <div className="col-sm-2 align-right">
                    Function name
                </div>
                <div className="col-sm-5 align-left">
                <input type="text" id="dataformatterfunctionNameInput"
            value={this.props.selectedControl.dataformatterfunctionNameTemp
            ? this.props.selectedControl.dataformatterfunctionNameTemp
            : ''}
            onChange={this
            .editTableDataFormatter
            .bind(this, 'dataformatterfunctionNameTemp', 'value')}/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 align-right">
                Function
                </div>
                <div className="col-sm-5">
                 <textarea type="text" className="form-control" rows="25"
                  id="dataformatterfunctionFieldFunction"
                  value={this.props.selectedControl.dataformatterfunctionTemp
            ? this.props.selectedControl.dataformatterfunctionTemp
            : ''}
            onChange={this
            .editTableDataFormatter
            .bind(this, 'dataformatterfunctionTemp', 'value')}
                 />
                </div>
                 <div className="col-sm-5" style={{'textAlign':'left'}}>
                  Example -<br/>
                  <span>
                  {
                       this.props.selectedControl.dataformatterfunctionExample
                  }
                  </span>
                  </div>
              </div>
               <div className="row">
                <div className="col-sm-2 align-right">
                
                </div>
                <div className="col-sm-5 align-right">
                <input type='button' value='Save' onClick={this
            .updateTableDataFormatter
            .bind(this)}/>
                </div>
            </div>
            </Modal>
            <Modal isOpen={this.state.jsondatamodalIsOpen} 
            onRequestClose={this.closeModalWindow} contentLabel="JSON Data" className="text-center">
            <div className="row">
            <div className="col-sm-2 align-right">
                JSON Data
            </div>
             <div className="col-sm-10 align-left">
              <textarea type="text" className="form-control" rows="25"
                    value={this.props.selectedControl.jsondata
                            ?this.props.selectedControl.jsondata
                            : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this,"jsondata", 'value')}/>
             </div>
            </div>
            </Modal>
            </div>
        )
}
}