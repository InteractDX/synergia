/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Hiren.Nariya, Zymr
*******************************************************/

var Util = {};
Util.defaultProperties = function () {
    var cntrlDefaultProperties = [];
    cntrlDefaultProperties['accesskey'] = '';
    cntrlDefaultProperties['jsonkey'] = '';
    cntrlDefaultProperties['contenteditable'] = false;
    cntrlDefaultProperties['draggable'] = false;
    cntrlDefaultProperties['hidden'] = false;
    cntrlDefaultProperties['name'] = '';
    cntrlDefaultProperties['tabindex'] = '';
    cntrlDefaultProperties['title'] = '';
    cntrlDefaultProperties['controlid'] = '';
    cntrlDefaultProperties['class'] = ' ';
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
    cntrlDefaultProperties['borderClass'] = "";
    cntrlDefaultProperties['div_stylefloat'] = 'none';
    cntrlDefaultProperties['div_stylewidth'] = '';
    cntrlDefaultProperties['div_class'] = '';
    cntrlDefaultProperties['div_styletextAlign'] = '';
    cntrlDefaultProperties['style_display'] = '';
    cntrlDefaultProperties['style_borderTop'] = '';
    cntrlDefaultProperties['style_borderBottom'] = '';
    cntrlDefaultProperties['style_borderRight'] = '';
    cntrlDefaultProperties['style_borderLeft'] = '';
    return cntrlDefaultProperties;
}
module.exports = Util;