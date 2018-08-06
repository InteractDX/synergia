/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Deepak.Somase, Zymr
*******************************************************/

import React from 'react';
import moment from 'moment';
import InlineStyleHelper from '../common/inlinestylehelper.jsx';
import Util from '../common/util.js';
let Page = React.createClass({
    render() {
        let styleDictionary = InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        return (
            <div style={inlinestyle}></div>
        )
    }
})
Page.getPageInlineStyle=function(properties)
{
   let styleDictionary = InlineStyleHelper.generateInlineStyle(properties);
   let inlinestyle = styleDictionary.inlinestyle;
   inlinestyle.width="75%";
   inlinestyle.height="100%";
   return inlinestyle;
}
Page.getPageInlineStyleForOutput=function(htmlControlobj)
{
    var inlineStyle=InlineStyleHelper.getInlineStyle(htmlControlobj);
    return inlineStyle;
}
Page.properties = function (cntrlDefaultProperties) {
    cntrlDefaultProperties['name'] = '';
    cntrlDefaultProperties['element'] = 'Page'; 
    cntrlDefaultProperties['controlid'] = '';
    cntrlDefaultProperties['class'] = ' ';
    cntrlDefaultProperties['pagetitle'] = ' ';
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
    cntrlDefaultProperties['style_margin'] = '';
    cntrlDefaultProperties['style_padding'] = '';
    cntrlDefaultProperties['style_textAlign'] = '';
    cntrlDefaultProperties['style_lineHeight'] = '';
    return cntrlDefaultProperties;
}
module.exports = Page;