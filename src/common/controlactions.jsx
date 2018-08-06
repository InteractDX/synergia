/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/

//import the components
var Reflux = require('reflux');

//create set of actions
var ControlActions = Reflux.createActions([
    'createElement',
    'editElement',
    'deleteElement',
    'copyElement',
    'moveElement',
    'saveData',
    'save',
    "statusUpdate",
    "statusEdited",
    "statusAdded",
    "refreshData",
    "replaceData",
    "undo",
    "redo",
    "setselectedView",
    "loadModalPopUpData"
]);

//export the module
module.exports = ControlActions;