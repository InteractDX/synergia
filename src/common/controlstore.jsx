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
var Reflux = require('reflux');
var ControlActions = require('./controlactions.jsx');
import ID from '../common/UUID.js';
import Mousetrap from 'mousetrap';

var _data=[];
var undoStack = [];
var redoStack = [];
var undoIndex = 0;
var currentPosition;
var selectedView='';
var _datamodalpopup=[];
var _datamodalpopupMapping={};
var _modalpopupnames=[];
var _selectedModelDialog='';

//add the data store functions
var ControlStore = Reflux.createStore({

  init: function() {
    this.listenTo(ControlActions.createElement, this._create);
    this.listenTo(ControlActions.deleteElement, this._delete);
    this.listenTo(ControlActions.copyElement, this._copy);
    this.listenTo(ControlActions.editElement, this._edit);
    this.listenTo(ControlActions.moveElement, this._move);
    this.listenTo(ControlActions.refreshData, this._refresh);
    this.listenTo(ControlActions.replaceData, this._replaceData);
    this.listenTo(ControlActions.undo, this.undo);
    this.listenTo(ControlActions.redo, this.redo);
    this.listenTo(ControlActions.setselectedView, this.setselectedView);
    this.listenTo(ControlActions.loadModalPopUpData, this.loadModalPopUpData);
  },
  setselectedView:function(view){
    this.selectedView=view;
  },
  undo:function(){
    undoIndex = (undoStack.length - 1);
    if(undoIndex != 0 || undoIndex != undefined){
        undoStack.pop();
        var temparr = [];
        
          var obj = undoStack[undoIndex - 1];
          var keys = Object.keys(obj);

          for (var j = keys.length; j > 0 ; j--) {
            var index = keys[j - 1];
            var innerobj = obj[index];
            temparr.push(innerobj);
          }
          
        this.load(temparr);
    }
  },
  redo:function(){
    undoIndex = (undoStack.length);
    if(undoIndex != undefined){
      currentPosition = redoStack[undoIndex];
      undoStack.push(currentPosition);
      var temparr = [];
      var keys = Object.keys(currentPosition);

          for (var j = keys.length; j > 0 ; j--) {
            var index = keys[j - 1];
            var innerobj = currentPosition[index];
            temparr.push(innerobj);
          }
      this.load(temparr);
    }
  },
  loadDefaultData: function()
  {
    this._data = [];
    this._datamodalpopup = [];
    this._datamodalpopup=[];
    this._datamodalpopupMapping={};
    this._modalpopupnames=[];

    let updateData={};
    updateData.key='loaddefault';
    updateData.data=[];
    this.trigger(updateData);
  },
  setSelectedModalName:function(name){
    this._selectedModelDialog=name;
  },
  loadModalPopUpData:function(modalpopupnames,datamodalpopupMapping,
  datamodalpopup){
    if(datamodalpopup)
    this._datamodalpopup=datamodalpopup;
    else 
    this._datamodalpopup=[];
    if(datamodalpopupMapping)
    this._datamodalpopupMapping=datamodalpopupMapping;
     if(modalpopupnames)
    this._modalpopupnames=modalpopupnames;
    let updateData={};

    updateData.key='modalpopup';
    updateData.datamodalpopup= this._datamodalpopup;
    updateData.datamodalpopupMapping= this._datamodalpopupMapping;
    updateData.modalpopupnames= this._modalpopupnames;
    if(!this._selectedModelDialog&&this._modalpopupnames){
        if(this._modalpopupnames.length>0){
          this._selectedModelDialog=this._modalpopupnames[0];
        }
    }
    this.trigger(updateData);
  },
 //load the data
  load: function(Data) {
    let updateData={};
    
    if(this.selectedView=='designer'){
      updateData={
        data:Data,
        key:this.selectedView
      }
      this._data = Data;
    }else if(this.selectedView=='modalpopup'){
      this._datamodalpopup=Data;
      this._datamodalpopupMapping[this._selectedModelDialog]=Data;
      updateData={
        key:this.selectedView,
        datamodalpopup:this._datamodalpopup,
        datamodalpopupMapping:this._datamodalpopupMapping,
        modalpopupnames:this._modalpopupnames
      }
    }
    this.trigger(updateData);
  },
  processElement: function (id, rownumber, columnnumber, parentcontrolid, processFn) {
    var controls = this.findControls(rownumber, columnnumber);
    this.processControls(id, controls, parentcontrolid, processFn);
  },
  findControls: function (rownumber, columnnumber) {
  var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
    for (var rowCounter = 0; rowCounter < dataToRefer.length; rowCounter++) {
      if (dataToRefer[rowCounter].rownumber == rownumber) {
        var columns = dataToRefer[rowCounter].columnDiv;
        for (var colCounter = 0; colCounter < columns.length; colCounter++) {
          if (columns[colCounter].columnnumber == columnnumber) {
            return columns[colCounter].htmlControls;
          }
        }
      }
    }
  },
_resetRowNumber:function(updatefor)
{
  var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
  for (var rowCounter = 0; rowCounter < dataToRefer.length; rowCounter++) {
    if(updatefor.indexOf(rowCounter)>=0)
    {
      var rowIndex=rowCounter+1;
      dataToRefer[rowCounter].rownumber=rowIndex
      var columns = dataToRefer[rowCounter].columnDiv;
      for (var colCounter = 0; colCounter < columns.length; colCounter++) {
       var htmlControls= dataToRefer[rowCounter].columnDiv[colCounter].htmlControls;
       for (var htmlcounter = 0; htmlcounter < htmlControls.length; htmlcounter++) {
         dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].rownumber=rowIndex;
         if(dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].childdata)
         {
          var childdata=dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].childdata;
          for(var childDataCounter=0;childDataCounter<childdata.length;childDataCounter++)
          {
           dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].childdata[childDataCounter].rownumber=rowIndex;
          }          
         }
         else if(dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter].element=='InnerSection') {
          var innerSectionElement = dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter];
          dataToRefer[rowCounter].columnDiv[colCounter].htmlControls[htmlcounter]=
          this.updateRowNumberForInnerSectionControls(innerSectionElement,rowIndex);
         }
       }
      }
    }
  }
},
  processControls: function (id, controls, parentcontrolid, processFn) {
    for (var htmlcounter = 0; htmlcounter < controls.length; htmlcounter++) {
      if ((parentcontrolid == "0" || parentcontrolid === undefined) &&
          (controls[htmlcounter].id == id)) {
        processFn(htmlcounter, controls);
        break;
      } else if (controls[htmlcounter].id == parentcontrolid && controls[htmlcounter].childdata) {
        this.processControls(id, controls[htmlcounter].childdata, undefined, processFn);
        break;
      }
    }
  },

  _move: function(element, direction) {
      if(element.parentelement!='InnerSection') {
      this.moveElement(element,direction);
    }
    else {
      this.moveElementElementUnderInnerSection(element,direction);
    }
  },
  moveElementElementUnderInnerSection:function(element,direction){
   var controls = this.findControls(element.parentrownumber, element.parentcolumnnumber);
for (var htmlcounter = 0; htmlcounter < controls.length; htmlcounter++) {
  if(controls[htmlcounter].id==element.parentcontrolid) {
    var innerSection=controls[htmlcounter];
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
      if(innerSection.columnDiv[colCounter].columnnumber==element.columnnumber)
      {
       for(var cntrlhtmlcounter=0;cntrlhtmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;cntrlhtmlcounter++)
       {
        
        if(innerSection.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].id==element.id)
        { 
           var newIndex = -1;
        if ((direction == 1 && cntrlhtmlcounter > 0) || (direction == 0 && cntrlhtmlcounter < innerSection.columnDiv[colCounter].htmlControls.length)) {
          newIndex = (direction == 1) ? (cntrlhtmlcounter-1) : (cntrlhtmlcounter+1);
        }
        if (newIndex != -1) {
          var updatedElement = innerSection.columnDiv[colCounter].htmlControls.splice(cntrlhtmlcounter, 1)[0];
         innerSection.columnDiv[colCounter].htmlControls.splice(newIndex, 0, updatedElement);
        }
        break;
      }
      
       }
      }
    }
  }
}
var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
 this.load(dataToRefer);
  },
moveElement:function(element,direction)
{
  var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
  if(element.element=="Section")
  {
      //find the row
      var newIndex = 0;
      var oldIndex=0;
      for (var rowCounter = 0; rowCounter < dataToRefer.length; rowCounter++) {
       if (dataToRefer[rowCounter].id == element.id) 
        {
            oldIndex=rowCounter;
            newIndex = (direction == 1) ? (rowCounter-1) : (rowCounter+1);
            break;
        }      
      }
      if(oldIndex!=newIndex)
      {
        dataToRefer.splice(oldIndex, 1);        
        dataToRefer.splice(newIndex, 0, element);
        var updatedRow=[oldIndex,newIndex];
        this._resetRowNumber(updatedRow)
      } 
    }
    else
    {
        this.processElement(element.id, element.rownumber, element.columnnumber, element.parentcontrolid, function(htmlcounter, controls) {
        var newIndex = -1;
        if ((direction == 1 && htmlcounter > 0) || (direction == 0 && htmlcounter < controls.length)) {
          newIndex = (direction == 1) ? (htmlcounter-1) : (htmlcounter+1);
        }
        if (newIndex != -1) {
          var updatedElement = controls.splice(htmlcounter, 1)[0];
          controls.splice(newIndex, 0, updatedElement);
        }
      });
    }
    this.load(dataToRefer);
},
 //update the data when element is created
  _create: function(element,selectedelement,sectionColumnDivOptions, notRemovable) {
    var isValidElement=false;
    var dataToRefer=[];
    if(this.selectedView!='modalpopup'){
      dataToRefer= this._data;
    }
    else
    {
     if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
    }
    if(element)
    {
      if(element.element)
      {
        if(element.element.length > 0)
        {
          isValidElement=true;
        }
      }
    }
    if(isValidElement){
        if(element.element=="Section") {
     var maxRowNumber=0;
     for(var rowCounter=0;rowCounter<dataToRefer.length;rowCounter++)
     {     
      if(dataToRefer[rowCounter].rownumber>maxRowNumber)
      {      
        maxRowNumber=dataToRefer[rowCounter].rownumber;
      }
     }    
     maxRowNumber++;
      element.columnDiv=[];
      element.rownumber=maxRowNumber;
      sectionColumnDivOptions.rownumber=element.rownumber;
      element.columnDiv.push(sectionColumnDivOptions);
      dataToRefer.push(element);
    }
     else {
       if(element.element=="InnerSection") {
          element.columnDiv=[];
          element.columnDiv.push(sectionColumnDivOptions);
      }
      if(selectedelement.element=='Section') {
        this.createElementInSection(element,selectedelement,sectionColumnDivOptions, notRemovable);
      }
      else if (selectedelement.element=='InnerSection'){
        this.createElementInInnerSection(element,selectedelement,sectionColumnDivOptions, notRemovable);
      }
   }
      this.load(dataToRefer);
    }
    else {
      //do nothing for now
    }
    this.stackForUndoRedo();
  },
  createElementInInnerSection:function(element,selectedelement,sectionColumnDivOptions, notRemovable) {
    //find the selected section and append the element
    if(element.element=='InnerSection'){
      return;
    }
    element.parentelement='InnerSection';
    element.parentrownumber = selectedelement.rownumber;
    element.parentcolumnnumber = selectedelement.columnnumber;
    element.parentcontrolid=selectedelement.id;
    var controls = this.findControls(selectedelement.rownumber, selectedelement.columnnumber);
    for (var htmlcounter = 0; htmlcounter < controls.length; htmlcounter++) {
     if(controls[htmlcounter].id==selectedelement.id) {
      var colnumberToAdd=0;
      if(element.columnnumber) {
            colnumberToAdd=element.columnnumber;
      }
      var colDiv=controls[htmlcounter].columnDiv;
      var htmlControls=colDiv[colnumberToAdd].htmlControls;
    
      if(htmlControls){
        htmlControls.push(element);
        if(colnumberToAdd>controls[htmlcounter].columnDiv.length){
            colnumberToAdd=0;
          }
        colDiv[colnumberToAdd].htmlControls=htmlControls;
        controls[htmlcounter].columnDiv=colDiv;
        var dataToRefer=[];
        if(this.selectedView!='modalpopup'){
          dataToRefer= this._data;
        }
        else
        {
          if(this._datamodalpopupMapping[this._selectedModelDialog]){
            dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
          }
        }
        this.load(dataToRefer);
      }
     }
    }
  },
  createElementInSection:function(element,selectedelement,sectionColumnDivOptions, notRemovable) {
    var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
    
    //find the selected section and append the element to init
      for (var dataCount = 0; dataCount < dataToRefer.length; dataCount++) {
        if(dataToRefer[dataCount].id==selectedelement.id) {
          element.rownumber=selectedelement.rownumber;     
          element.notRemovable = notRemovable || false;
          var colnumberToAdd=0;
          if(element.columnnumber) {
            colnumberToAdd=element.columnnumber;
          }
          if(colnumberToAdd>dataToRefer[dataCount].columnDiv.length){
            colnumberToAdd=0;
          }
          if(dataToRefer[dataCount].columnDiv[colnumberToAdd].htmlControls) {
            dataToRefer[dataCount].columnDiv[colnumberToAdd].htmlControls.push(element);
          } else {
            dataToRefer[dataCount].columnDiv[colnumberToAdd].htmlControls=[];
            dataToRefer[dataCount].columnDiv[colnumberToAdd].htmlControls.push(element);
          }
        }
      }         
   this.stackForUndoRedo();
  },
deleteElement: function(element) {
  var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
  if(element.element == "Section") {
      for(var rowCounter=0;rowCounter<dataToRefer.length;rowCounter++) {
        if(dataToRefer[rowCounter].rownumber==element.rownumber) {
          for(var NewRownumber=element.rownumber;NewRownumber<dataToRefer.length;NewRownumber++) {
            dataToRefer[NewRownumber].rownumber=dataToRefer[NewRownumber].rownumber-1;
          }
          dataToRefer.splice(rowCounter, 1);
          break;
        }
      }
    } else {
      this.processElement(element.id, element.rownumber, element.columnnumber, element.parentcontrolid, function(htmlcounter, controls) {
        controls.splice(htmlcounter, 1);
      });      
    }
},
updateRowNumberForInnerSectionControls: 
function(innerSection,newrowIndex){
  for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
  {
    for(var cntrlhtmlcounter=0;cntrlhtmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;cntrlhtmlcounter++)
    {
      innerSection.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentrownumber=newrowIndex;
    }
  }
  return innerSection;
},
deleteElementUnderInnerSection: function(element) {
var controls = this.findControls(element.parentrownumber, element.parentcolumnnumber);
for (var htmlcounter = 0; htmlcounter < controls.length; htmlcounter++) {
  if(controls[htmlcounter].id==element.parentcontrolid) {
    var innerSection=controls[htmlcounter];
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
      if(innerSection.columnDiv[colCounter].columnnumber==element.columnnumber)
      {
       for(var cntrlhtmlcounter=0;cntrlhtmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;cntrlhtmlcounter++)
       {
        if(innerSection.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].id==element.id)
        {
          controls[htmlcounter].columnDiv[colCounter].htmlControls.splice(cntrlhtmlcounter, 1);
        }
       }
      }
    }
  }
}

},
  //update the data when element is deleted
  _delete: function(element) {
    if(element.parentelement!='InnerSection') {
      this.deleteElement(element);
    }
    else {
      this.deleteElementUnderInnerSection(element);
    }
    var dataToRefer=[];
    if(this.selectedView!='modalpopup'){
      dataToRefer= this._data;
    }
    else
    {
      if(this._datamodalpopupMapping[this._selectedModelDialog]){
        dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
      }
    }
    this.load(dataToRefer);
    this.stackForUndoRedo();
  },
  copyElementElementUnderInnerSection:function(element){
  var isDone=false;
  var controls = this.findControls(element.parentrownumber, element.parentcolumnnumber);
  for (var htmlcounter = 0; htmlcounter < controls.length; htmlcounter++) {
  if(controls[htmlcounter].id==element.parentcontrolid) {
    var innerSection=controls[htmlcounter];
    for(var colCounter=0;colCounter<innerSection.columnDiv.length;colCounter++)
    {
      if(innerSection.columnDiv[colCounter].columnnumber==element.columnnumber)
      {
       for(var cntrlhtmlcounter=0;cntrlhtmlcounter<innerSection.columnDiv[colCounter].htmlControls.length;cntrlhtmlcounter++)
       {
        if(innerSection.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].id==element.id)
        {
        isDone=true;
        var totalcontrols=innerSection.columnDiv[colCounter].htmlControls.length;
        var copiedelement = $.extend(true,copiedelement,element);
        copiedelement.id =ID.uuid();
        copiedelement.key=copiedelement.id;
        copiedelement.controlid = (totalcontrols+1) + '' + '_copy';
        copiedelement.trackid = (new Date()).getTime();
        copiedelement.chartTrackid = "chart_" + (new Date()).getTime();
        if(copiedelement&&copiedelement.borderClass)
         copiedelement.borderClass=copiedelement.borderClass.replace('borderred', " ");
        controls[htmlcounter].columnDiv[colCounter].htmlControls.push(copiedelement);

        }
        if(isDone)break;
       }
      }
      if(isDone)break;
    }
    if(isDone)break;
  }
  }
  var dataToRefer=[];
  if(this.selectedView!='modalpopup'){
    dataToRefer= this._data;
  }
  else
  {
    if(this._datamodalpopupMapping[this._selectedModelDialog]){
      dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
     }
  }
  this.load(dataToRefer);
  },
  
  copyIndividualControl(element) {
    var dataToRefer=[];
    if(this.selectedView!='modalpopup'){
      dataToRefer= this._data;
    }
    else
    {
      if(this._datamodalpopupMapping[this._selectedModelDialog]){
        dataToRefer=this._datamodalpopupMapping[this._selectedModelDialog];
       }
    }
    this.processElement(element.id, element.rownumber, element.columnnumber, element.parentcontrolid, function(htmlcounter, controls) {
      
      var totalcontrols = controls.length;
      var copiedelement = JSON.parse(JSON.stringify(element));
      copiedelement.id =  copiedelement.element+totalcontrols;
      copiedelement.controlid = copiedelement.element+totalcontrols;
      copiedelement.trackid = (new Date()).getTime();
      copiedelement.chartTrackid = "chart_" + (new Date()).getTime();
      if(copiedelement&&copiedelement.borderClass)
      copiedelement.borderClass=copiedelement.borderClass.replace('borderred', " ");
      copiedelement.key=ID.uuid();
      controls[totalcontrols] = copiedelement;
    });
    this.load(dataToRefer);
  },
  copyInnerSection(element) {
    var dataToRefer = [];
    if (this.selectedView != 'modalpopup') {
      dataToRefer = this._data;
    }
    else {
      if (this._datamodalpopupMapping[this._selectedModelDialog]) {
        dataToRefer = this._datamodalpopupMapping[this._selectedModelDialog];
      }
    }
    var allData = dataToRefer;
    this.processElement(element.id, element.rownumber, element.columnnumber, element.parentcontrolid, function(htmlcounter, controls) {
      var innerSectionControl = controls;
      var totalcontrols = controls.length;
      var copiedelement = JSON.parse(JSON.stringify(element));
      copiedelement.id =  ID.uuid();
      copiedelement.key=copiedelement.id;
      copiedelement.controlid = (totalcontrols+1) + '' + '_copy';

      if(copiedelement&&copiedelement.borderClass)
         copiedelement.borderClass=copiedelement.borderClass.replace('borderred', " ");
       // controls[htmlcounter].columnDiv[element.columnnumber].htmlControls.push(copiedelement);
       for(var colCounter=0;colCounter<copiedelement.columnDiv.length;colCounter++){
        for(var cntrlhtmlcounter=0;cntrlhtmlcounter<copiedelement.columnDiv[colCounter].htmlControls.length;cntrlhtmlcounter++) {
          copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentcontrolid= copiedelement.id;
          copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentelement='InnerSection';
          copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentrownumber= copiedelement.rownumber;
          copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentcolumnnumber= copiedelement.columnnumber;
        }
      }

      controls[totalcontrols] = copiedelement;
    },this);
    this.load(dataToRefer);
  },
  copySection(element) {
    var dataToRefer = [];
    if (this.selectedView != 'modalpopup') {
      dataToRefer = this._data;
    }
    else {
      if (this._datamodalpopupMapping[this._selectedModelDialog]) {
        dataToRefer = this._datamodalpopupMapping[this._selectedModelDialog];
      }
    }
    var allData = dataToRefer;
    var result = {};
    result = $.extend(true, result, allData.find(x => x.rownumber == element.rownumber));//allData.find(x => x.rownumber ==  element.rownumber)
    result = this.updateRownumberId(result);
    result.key = ID.uuid();
    dataToRefer.push(result);
    this.load(dataToRefer);
  },
  _copy:function(element){

    if(element.parentelement=='InnerSection') {
      this.copyElementElementUnderInnerSection(element);
    }
    else {
      if(element.element=='Section') {
        this.copySection(element);
      }
      else if(element.element=='InnerSection') {
        this.copyInnerSection(element);
      }
      else {
        this.copyIndividualControl(element);
      }
    }
    this.stackForUndoRedo();
  },
  stackForUndoRedo(){
    //Undo/Redo
    var undoObj={};
    var redoObj={};
    undoObj= $.extend(true,undoObj,this._data);
    redoObj= $.extend(true,redoObj,this._data);

    undoStack.push(undoObj);
    redoStack.push(redoObj);
  },
  updateRownumberId(result) {
    var dataToRefer = [];
    if (this.selectedView != 'modalpopup') {
      dataToRefer = this._data;
    }
    else {
      if (this._datamodalpopupMapping[this._selectedModelDialog]) {
        dataToRefer = this._datamodalpopupMapping[this._selectedModelDialog];
      }
    }
    result.rownumber = dataToRefer.length + 1;
    result.id = ID.uuid();
    for (var i = 0; i < result.columnDiv.length; i++) {
      result.columnDiv[i].id = ID.uuid();
      for (var j = 0; j < result.columnDiv[i].htmlControls.length; j++) {
        result.columnDiv[i].htmlControls[j].id = ID.uuid();
        result.columnDiv[i].htmlControls[j].controlid = ID.uuid();
        result.columnDiv[i].htmlControls[j].rownumber = result.rownumber;
        if(result.columnDiv[i].htmlControls[j].element=='InnerSection') {
          let copiedelement = result.columnDiv[i].htmlControls[j];
          for(var colCounter=0;colCounter<copiedelement.columnDiv.length;colCounter++){
            for(var cntrlhtmlcounter=0;cntrlhtmlcounter<copiedelement.columnDiv[colCounter].htmlControls.length;cntrlhtmlcounter++) {
              copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentcontrolid= copiedelement.id;
              copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentelement='InnerSection';
              copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentrownumber= copiedelement.rownumber;
              copiedelement.columnDiv[colCounter].htmlControls[cntrlhtmlcounter].parentcolumnnumber= copiedelement.columnnumber;
            }
          }
          result.columnDiv[i].htmlControls[j] = copiedelement;
        }
      }
    }
    return result;
  },
  _edit:function(element) {
     if(this.selectedView!='modalpopup'){
        this.load(this._data);
        this.stackForUndoRedo();
     }
     else {
      this.load(this._datamodalpopupMapping[this._selectedModelDialog]);
      this.stackForUndoRedo();
     }
  },

  _refresh:function() {
    if(this.selectedView!='modalpopup'){
      this.load(this._data);
     }
     else {
      this.load(this._datamodalpopupMapping[this._selectedModelDialog]);
     }
  },
  
  _replaceData:function(data) {
    if(this.selectedView!='modalpopup'){
      this._data = data;
      this.load(this._data);
     }
    else {
      this._datamodalpopupMapping[this._selectedModelDialog] = data;
      this.load(this._datamodalpopupMapping[this._selectedModelDialog]);
    }
  },

  //update the data
  _updateOrder: function(elements) {
    if(this.selectedView!='modalpopup'){
      this._data = elements;
      this.load(this._data);
     }
    else {
      this._datamodalpopupMapping[this._selectedModelDialog] = data;
      this.load(this._datamodalpopupMapping[this._selectedModelDialog]);
    }
  }
});

//export the modules
module.exports = ControlStore;