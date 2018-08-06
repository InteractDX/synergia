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

var InlineStyleHelper = {};

//generate single style object with different proerties
InlineStyleHelper.generateInlineStyle = function (data) {

    var styleDictionary={}
    var inlinestyle = {};
    var divinlinestyle={};
    if (data) {
        var keys = Object.keys(data);
        var textdecoration="";     
        keys.forEach(function (key) {
            if (key.indexOf("style_")>-1) {                        
                inlinestyle[key.substring(6, key.length)] = data[key] // substring to remove 'style_' part
                if(key=="style_underline"&&data[key]==true)
                {
                    textdecoration=textdecoration+" underline ";
                }
                if(key=="style_overline"&&data[key]==true)
                {
                   textdecoration=textdecoration+" overline ";
                }
                if(key=="style_linethrough"&&data[key]==true)
                {
                   textdecoration=textdecoration+" line-through ";
                }                
            }
            if (key.indexOf("div_style")>-1) { 
             if(key=='div_styleoverflowx')
             {
                 divinlinestyle['overflowX'] = data[key];
             }
             else if(key=='div_styleoverflowy')
             {
                divinlinestyle['overflowY'] = data[key];
             }
             else
             {
                divinlinestyle[key.substring(9, key.length)] = data[key]
             }              
            }
        });
        if(textdecoration!="")
        {
          inlinestyle["textDecoration"]=textdecoration;
        }
    }   
    styleDictionary.inlinestyle=inlinestyle;
    styleDictionary.divinlinestyle=divinlinestyle;   
    return styleDictionary;
}

InlineStyleHelper.SetControlEvents=function(cntrlDefaultProperties,eventslist)
{
    for(var evntcounter=0;evntcounter<eventslist.length;evntcounter++)
   {
     var eventkey="events_"+eventslist[evntcounter];
     cntrlDefaultProperties[eventkey]={event:eventslist[evntcounter],methodname:'',method:''}
   }  
   return cntrlDefaultProperties;
}

InlineStyleHelper.AllocateEvents=function(htmlControlData,htmlControl,inlineJsfunctions)
{  
    var keys = Object.keys(htmlControlData);
    keys.forEach(function (key) {
         if (key.indexOf("events_")>-1) {
             var eventDetails=htmlControlData[key];
             if(eventDetails.methodname!="")
             {
                htmlControl[eventDetails.event]=eventDetails.methodname;
             }
             if(eventDetails.method!="")
             {
                inlineJsfunctions=inlineJsfunctions+"\n"+eventDetails.method;
             }
         }
    })
    return {'htmlControl':htmlControl,'inlineJsfunctions':inlineJsfunctions} ;
}
InlineStyleHelper.getInlineStyleForDiv=function(htmlControlobj)
{
   var inLineStyle="";
   var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if (key.indexOf("div_style")>-1) {

            var stylekey=key.substring(9, key.length)+':';
            if(key=='div_stylefloat')
            {
                if(htmlControlobj[key]!='none')
                {
                  inLineStyle=inLineStyle+stylekey+htmlControlobj[key]+';';
                }
            }
            else if(key=='div_styleoverflowx')
            {
                inLineStyle=inLineStyle+'overflow-x:'+htmlControlobj[key]+';';
            }
            else if(key=='div_styleoverflowy')
            {
                inLineStyle=inLineStyle+'overflow-y:'+htmlControlobj[key]+';';
            }
            else if(key=='div_styletextAlign')
            {
              inLineStyle=inLineStyle+'text-align:'+htmlControlobj[key]+';';
            }
            else
            {
                inLineStyle=inLineStyle+stylekey+htmlControlobj[key]+';';
            }
        }
    })
   return inLineStyle;
}
InlineStyleHelper.getInlineStyle=function(htmlControlobj)
{
   if(!htmlControlobj) return;
   var inLineStyle="";
   if(!htmlControlobj)
   {
      return;
   }
   if(htmlControlobj.style_fontSize&&htmlControlobj.style_fontSize!="")
   {
    inLineStyle=inLineStyle+";font-size:"+htmlControlobj.style_fontSize;
   }
   if(htmlControlobj.style_fontFamily&&htmlControlobj.style_fontFamily!="")
   {
    inLineStyle=inLineStyle+";font-family:"+htmlControlobj.style_fontFamily;
   }
   if(htmlControlobj.style_fontWeight&&htmlControlobj.style_fontWeight!="")
   {
    inLineStyle=inLineStyle+";font-weight:"+htmlControlobj.style_fontWeight;
   }
   if(htmlControlobj.style_fontStyle&&htmlControlobj.style_fontStyle!="")
   {
    inLineStyle=inLineStyle+";font-style:"+htmlControlobj.style_fontStyle;
   }
   if(htmlControlobj.style_fontVariant&&htmlControlobj.style_fontVariant!="")
   {
    inLineStyle=inLineStyle+";font-variant:"+htmlControlobj.style_fontVariant;
   }
   if(htmlControlobj.style_textTransform&&htmlControlobj.style_textTransform!="")
   {
    inLineStyle=inLineStyle+";text-transform:"+htmlControlobj.style_textTransform;
   }
   if(htmlControlobj.style_color&&htmlControlobj.style_color!="")
   {
    inLineStyle=inLineStyle+";color:"+htmlControlobj.style_color;
   }
   if(htmlControlobj.style_backgroundColor&&htmlControlobj.style_backgroundColor!="")
   {
    inLineStyle=inLineStyle+";background-color:"+htmlControlobj.style_backgroundColor;
   }
   if(htmlControlobj.style_backgroundImage&&htmlControlobj.style_backgroundImage!="")
   {
    inLineStyle=inLineStyle+";background-image:"+htmlControlobj.style_backgroundImage;
   }
   if(htmlControlobj.style_backgroundRepeat&&htmlControlobj.style_backgroundRepeat!="")
   {
    inLineStyle=inLineStyle+";background-repeat:"+htmlControlobj.style_backgroundRepeat;
   }
   if(htmlControlobj.style_backgroundattachment&&htmlControlobj.style_backgroundattachment!="")
   {
    inLineStyle=inLineStyle+"; background-attachment:"+htmlControlobj.style_backgroundattachment;
   }
   if((htmlControlobj.style_backgroundxposition&&htmlControlobj.style_backgroundxposition!="")
   ||(htmlControlobj.style_backgroundyposition&&htmlControlobj.style_backgroundyposition!=""))
   {
    inLineStyle=inLineStyle+"; background-position:"+htmlControlobj.style_backgroundxposition+
    htmlControlobj.style_backgroundyposition;
   }
   if(htmlControlobj.style_position&&htmlControlobj.style_position!="")
   {
    inLineStyle=inLineStyle+";position:"+htmlControlobj.style_position;
   }
   if(htmlControlobj.style_zIndex&&htmlControlobj.style_zIndex!="")
   {
    inLineStyle=inLineStyle+";z-index:"+htmlControlobj.style_zIndex;
   }
   if(htmlControlobj.style_width&&htmlControlobj.style_width!="")
   {
    inLineStyle=inLineStyle+";width:"+htmlControlobj.style_width;
   }
   if(htmlControlobj.style_height&&htmlControlobj.style_height!="")
   {
    inLineStyle=inLineStyle+";height:"+htmlControlobj.style_height;
   }
   if(htmlControlobj.style_top&&htmlControlobj.style_top!="0px")
   {
    inLineStyle=inLineStyle+";top:"+htmlControlobj.style_top;
   }
   if(htmlControlobj.style_right&&htmlControlobj.style_right!="")
   {
    inLineStyle=inLineStyle+";right:"+htmlControlobj.style_right;
   }
   if(htmlControlobj.style_bottom&&htmlControlobj.style_bottom!="")
   {
    inLineStyle=inLineStyle+";bottom:"+htmlControlobj.style_bottom;
   }
   if(htmlControlobj.style_left&&htmlControlobj.style_left!="0px")
   {
    inLineStyle=inLineStyle+";left:"+htmlControlobj.style_left;
   }
   if(htmlControlobj.style_border&&htmlControlobj.style_border!="")
   {
    inLineStyle=inLineStyle+";border:"+htmlControlobj.style_border;
   }
   if(htmlControlobj.style_borderRadius&&htmlControlobj.style_borderRadius!="")
   {
    inLineStyle=inLineStyle+";border-radius:"+htmlControlobj.style_borderRadius;
   }
   if(htmlControlobj.style_margin&&htmlControlobj.style_margin!="")
   {
    inLineStyle=inLineStyle+";margin:"+htmlControlobj.style_margin;
   }
   if(htmlControlobj.style_padding&&htmlControlobj.style_padding!="")
   {
    inLineStyle=inLineStyle+";padding:"+htmlControlobj.style_padding;
   }
   if(htmlControlobj.style_textAlign&&htmlControlobj.style_textAlign!="")
   {
    inLineStyle=inLineStyle+";text-align:"+htmlControlobj.style_textAlign;
   }
   if(htmlControlobj.style_lineHeight&&htmlControlobj.style_lineHeight!="")
   {
    inLineStyle=inLineStyle+";line-height:"+htmlControlobj.style_lineHeight;
   }
    if(htmlControlobj.style_borderTop&&htmlControlobj.style_borderTop!="")
   {
    inLineStyle=inLineStyle+";border-top:"+htmlControlobj.style_borderTop;
   }
    if(htmlControlobj.style_borderBottom&&htmlControlobj.style_borderBottom!="")
   {
    inLineStyle=inLineStyle+";border-bottom:"+htmlControlobj.style_borderBottom;
   }
    if(htmlControlobj.style_borderRight&&htmlControlobj.style_borderRight!="")
   {
    inLineStyle=inLineStyle+";border-right:"+htmlControlobj.style_borderRight;
   }
    if(htmlControlobj.style_borderLeft&&htmlControlobj.style_borderLeft!="")
   {
    inLineStyle=inLineStyle+";border-left:"+htmlControlobj.style_borderLeft;
   }
    if(htmlControlobj.style_display&&htmlControlobj.style_display!="")
   {
    inLineStyle=inLineStyle+";display:"+htmlControlobj.style_display;
   }
   return inLineStyle;
}
//export the modules
module.exports = InlineStyleHelper;