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
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import Button from './buttoncontrol.jsx';
//create the header class
let LoginForm = React.createClass({

    stopPropagation: function (e) {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        },
    //render the html
    render() {

        let classNames = 'designer_draggable tblstyle'; //class to activate drag on designer
        let inlinestyle = InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle_button = InlineStyleHelper.generateInlineStyle(this.props.data);
        let divStyle={"float":this.props.data.div_style_float};

        return (
            <div  style={divStyle}
            id='loginform'
                draggable='true'
                onDragStart={this
                .props
                .dragStart
                .bind(this, this.props.data)}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)} style={inlinestyle}>
                <img
                    alt={this.props.data.alt}
                    src={this.props.data.src}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                     height={this.props.data.height}
                    width={this.props.data.width}
                    />   
               <div className="form-group">
                    <label>{this.props.data.Email_Label}</label>
                    <input id="loginformusernamefield" type={this.props.data.input_usertype} className="form-control" placeholder={this.props.data.email_placeholder} />
                </div>
                <div className="form-group">
                    <label >{this.props.data.Password_Label}</label>
                    <input id="loginformpasswordfield" type={this.props.data.input_type} className="form-control" placeholder={this.props.data.password_placeholder} />
                </div>
                <button type="submit" style={inlinestyle_button}  onClick="aurionprologin()" className="btn btn-default">{this.props.data.button_form}</button>
                {/*<Button
            dragStart={this.dragStart}
            setSelectedControl={this.setSelectedControl}
            isDraggable={true}
           
            />*/}
                <span className="glyphicon glyphicon-remove delete-icon" onClick={this
                .props
                .removecontrol
                .bind(this, this.props.data)}></span>
            </div>
        )
    }
});

LoginForm.properties = function (cntrlDefaultProperties) {
    cntrlDefaultProperties['accesskey'] = '';
    cntrlDefaultProperties['loginAPI'] = '';
    cntrlDefaultProperties['password_placeholder'] = 'Enter password';
    cntrlDefaultProperties['email_placeholder']='Enter email';
    cntrlDefaultProperties['style'] = {}
    cntrlDefaultProperties['style_fontSize'] = '';
    cntrlDefaultProperties['style_fontFamily'] = '';
    cntrlDefaultProperties['style_fontWeight'] = '';
    cntrlDefaultProperties['style_fontStyle'] = '';
    cntrlDefaultProperties['style_fontVariant'] = '';
    cntrlDefaultProperties['style_textTransform'] = '';
    cntrlDefaultProperties['style_color'] = '';
    cntrlDefaultProperties['style_backgroundColor'] = '';
    cntrlDefaultProperties['style_backgroundImage'] = '';
    cntrlDefaultProperties['style_backgroundRepeat'] = '';
    cntrlDefaultProperties['style_backgroundattachment'] = '';
    cntrlDefaultProperties['style_backgroundxposition'] = '';
    cntrlDefaultProperties['style_backgroundyposition'] = '';
    cntrlDefaultProperties['style_position'] = '';
    cntrlDefaultProperties['style_zIndex'] = '';
    cntrlDefaultProperties['style_width'] = '';
    cntrlDefaultProperties['style_height'] = '';
    cntrlDefaultProperties['style_top'] = '0px';
    cntrlDefaultProperties['style_right'] = '';
    cntrlDefaultProperties['style_bottom'] = '';
    cntrlDefaultProperties['style_left'] = '0px';
    cntrlDefaultProperties['style_underline'] = '';
    cntrlDefaultProperties['style_overline'] = '';
    cntrlDefaultProperties['style_linethrough'] = '';
    cntrlDefaultProperties["rownumber"] = "0";
    cntrlDefaultProperties["columnnumber"] = "0";
    cntrlDefaultProperties["parentcontrolid"] = "0";
    cntrlDefaultProperties['style_margin'] = '';
    cntrlDefaultProperties['style_padding'] = '';
    cntrlDefaultProperties['style_textAlign'] = '';
    cntrlDefaultProperties['style_lineHeight'] = '';
    cntrlDefaultProperties['form_type'] = '';
    cntrlDefaultProperties['borderClass'] = '';
    cntrlDefaultProperties['usename']='';
    cntrlDefaultProperties['password']='';
    cntrlDefaultProperties['Email_Label']='Email:';
    cntrlDefaultProperties['Password_Label']='Password:';
    cntrlDefaultProperties['input_usertype']='text';
    cntrlDefaultProperties['input_type'] = 'text';
    cntrlDefaultProperties['button_form'] = 'Submit';
	cntrlDefaultProperties['div_stylefloat'] = 'none';
    cntrlDefaultProperties['div_stylewidth'] = '';
	cntrlDefaultProperties['div_class'] = '';
    cntrlDefaultProperties['height'] = '50';
    cntrlDefaultProperties['width'] = '50';
    cntrlDefaultProperties['src'] = './images/default-placeholder.png';
    cntrlDefaultProperties['submit_api']='';
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom']='';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft']='';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onblur','onchange','onclick','oncontextmenu','ondblclick','onfocus','onkeydown','onkeypress',
    'onkeyup','onmousedown','onmouseover','onmouseup','onselect']);
    return cntrlDefaultProperties;
}
LoginForm.HtmlControl_LoginForm=function(htmlControlobj)
{   
    var htmlControldiv={};
    htmlControldiv.type="div";
    htmlControldiv.id="loginform";
    var inlineJsfunctions='';
    var htmlControlLoginForm=[];
    var htmlControls={};
    htmlControls.type="div";
    htmlControls.class="form-group";
    htmlControls.html=[];
    if(htmlControlobj.src!=undefined)
    {
        var htmlControlsImage={};
        htmlControlsImage.type="img";
        htmlControlsImage.src=htmlControlobj['src'];
        htmlControlsImage.height=htmlControlobj['height'];
        htmlControlsImage.width=htmlControlobj['width'];
        htmlControlLoginForm.push(htmlControlsImage);
    }
    if(htmlControlobj.Email_Label!=undefined)
    {
        var htmlControlsLabel={};
        htmlControlsLabel.type="Label";
        htmlControlsLabel.html=htmlControlobj['Email_Label'];
        htmlControls.html.push(htmlControlsLabel);
        var htmlControlsTextbox={};
        htmlControlsTextbox.type=htmlControlobj['input_usertype'];
        htmlControlsTextbox.class="form-control";
        htmlControls.html.push(htmlControlsTextbox);
    }
    htmlControlLoginForm.push(htmlControls);

    var htmlControlsPassword={};
    htmlControlsPassword.type="div";
    htmlControlsPassword.class="form-group";
    htmlControlsPassword.html=[];
    if(htmlControlobj.Password_Label!=undefined)
    {
        var htmlControlsLabel={};
        htmlControlsLabel.type="Label";
        htmlControlsLabel.html=htmlControlobj['Password_Label'];
        htmlControlsPassword.html.push(htmlControlsLabel);
        var htmlControlsTextbox={};
        htmlControlsTextbox.type=htmlControlobj['input_type'];
        htmlControlsTextbox.class="form-control";
        htmlControlsPassword.html.push(htmlControlsTextbox);
    }
    htmlControlLoginForm.push(htmlControlsPassword);

    if(htmlControlobj.button_form!=undefined)
    {
        var htmlControlsButton={};
        htmlControlsButton.type="button";
        htmlControlsButton.class="btn btn-default"
        htmlControlsButton.value=htmlControlobj['button_form'];
        //htmlControlobj['submit_api'];
        htmlControlLoginForm.push(htmlControlsButton);
    }
    
    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','disabled','loginAPI'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlLoginForm[key]=htmlControlobj[key];
            }
        }
    })

   var result=InlineStyleHelper.AllocateEvents(htmlControlobj,htmlControlLoginForm,inlineJsfunctions);
   htmlControlLoginForm=result.htmlControl;
   inlineJsfunctions=result.inlineJsfunctions;
   htmlControldiv.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
   var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);;
   if(inlineStyle!="")
    htmlControldiv.style=htmlControldiv.style+";"+inlineStyle;
   if(htmlControlobj["div_class"]!="")
    htmlControldiv.class=htmlControlobj["div_class"];
   htmlControldiv.html=htmlControlLoginForm;
   return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = LoginForm;