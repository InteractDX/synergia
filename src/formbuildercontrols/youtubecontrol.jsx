/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Kuldeep.Bhatt, Zymr
*******************************************************/

//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'

//create the header class
let YouTubeIcon = React.createClass({

    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        return (
            <div style={divStyle} draggable='true' onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
                className={classNames+ " " + this.props.data.borderClass+" "+this.props.data.div_class}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                  <a href={"{{" + this.props.data.jsonkey + "}}"}> <img src={this.props.data.iconurl}
                  alt={this.props.data.alt}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    height={this.props.data.height}
                    width={this.props.data.width}
                    style={inlinestyle}/></a>
                 <CopyPaste moveUpcontrol={this.props.moveUpcontrol}
        moveDowncontrol={this.props.moveDowncontrol}
        removecontrol={this.props.removecontrol}
        clonecontrol={this.props.clonecontrol}
        data={this.props.data}/>
            </div>
        )
    }

})

YouTubeIcon.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['socialurl'] = 'https://www.youtube.com';
    cntrlDefaultProperties['iconurl'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs' +
            '4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAABA9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG' +
            '1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPH' +
            'JkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbn' +
            'MjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG' +
            '1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0Um' +
            'VmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgIC' +
            'AgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG' +
            '5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcE1NOkRlcm' +
            'l2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3Rhbm' +
            'NlSUQ+eG1wLmlpZDo2NzBDRTQyNDk4MEUxMUU1QkY4QzkxRTQxMjQzOEI5Qzwvc3RSZWY6aW5zdGFuY2' +
            'VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo2NzBDRTQyNTk4MEUxMUU1Qk' +
            'Y4QzkxRTQxMjQzOEI5Qzwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRn' +
            'JvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo2NzBDRTQyNzk4MEUxMUU1QkY4Qz' +
            'kxRTQxMjQzOEI5QzwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG' +
            '1wLmlpZDo2NzBDRTQyNjk4MEUxMUU1QkY4QzkxRTQxMjQzOEI5QzwveG1wTU06SW5zdGFuY2VJRD4KIC' +
            'AgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3M8L3htcDpDcm' +
            'VhdG9yVG9vbD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KIC' +
            'AgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cr/4jeIAAAfFSU' +
            'RBVFgJzVlNbBVVFD73zvS1r/QH0CAKgoQi9FUQaYwFF67dGBaGEBYaZUmiG6OQGDEB1I2w0IUmrly6MO' +
            'rCxJVijTaRmJRSKFIiBo1NRVr6Y3/ezL1+352Z17Ez80oTlN5k3r1z5tx7vvN778xTEjcropWI4e2VSu' +
            'WxwJj91tonQduCZ20gYygaVwMukO5YmxOlxpW1V7Hod6L1Z5VLly5w9TQmCq8R+rduXdfg+2+BeKhZ63' +
            'JgrQR8jj7mc/2d/CEApZTT3kM/bcwUSB8HpdLruwYGxhKw6hMR74BIOFipdKkw/LRV64fBLMba0K0QWZ' +
            'LKYBlgjnqHNYIfMaTHfJi+T48XP0uxWlrE09prhqQpY85brZ+Fda9gPr0tMtjVtRYge1uVqkwaUwXJx+' +
            'We8fn/3Bh+IQzWACw/Wd9/qmtwcIoxJyoITqZAMgbvFkjCcXlAgwHsHmB7g0Q1uG3bbqX193hahir00t' +
            '0ESUxJM4hZjRC8pa3tQUR4+1chcVxMrhyQBKtDY0IkdXuo1DM+APYws+PE4WjlNJQDBixc/LiPn4fCCN' +
            'rSLmfesy3uI+oCPbmPy1py62oGbxJ60tcYMgNVBQ/isYPZ3QqrZjhqBD5rakKZR47NzyMfoRYuG/fJvR' +
            'NOGkqba54H5yHykwv3ijRePsQm1+ysSBWFJlG+JjgaxMjaCbRx0bOFW4Isl8X099eyjDZV994javVqUa' +
            '0tohqhBBRBQkbKEABXr85HyhBEUBU7Oyd2clLkxp9ix285FrLpTZtEtbXDCHOFYCnSB7PihEyLLUmQpU' +
            'OHpO3gQfHXrxfdvEp0Y6NVtLDvKdGxpWgRgOUuw2ZpWa6B3lqMae0q9joAN7MzykxOydzVqzJx5rSYCw' +
            'OidnSKzBWDZYxaLp0B2wRLnu+XxhcPy/q335KGdesgM+aymEIQvOLmRql7RwboCHbMpKMNhm6mPi379k' +
            'pzd7eMPP+cmJERUe2wbOBSO1m21tP1+S1ec/XhFx3IABZwFku4Y8slt0X9girgiBVJ08qVTmk9ckTGXn' +
            'hBvPvuE5niVp9t+UAR8HZ8XLydO6Vxa4eE1SBKhDrg6Grn9jo8zozAkFiZcyy81LRzV0RLkmqxZzCH21' +
            'W2Ie7sb9fFq1QQj6WaJbKMCxSvjISigozN22xUjPwMK2/tGrEzM4UJlQ/UAzkIxdu4UVzS5GgYYYETKQ' +
            'xxNX5hEJavir+q2T2KAKedXIAeaysa48HNUfkr8Eg+UJYaNI0S5OpdEVDigB8tFh89cUKuHTsmN/vPO8' +
            'v6zQQcWYxr1Wv0BEueLNuisVYKwhTCIEmCXGEOrJJGuE/ef09Gdj8qV95+R25euiReqSQR4NyZjshDOW' +
            'Vouh71NYnjxTPyLVrjSsIehNSw9jg1CFEnoZIrN+rNN+TXrooMnj4jYxcvprgKhjCMKmHfqVP0lwCaWr' +
            'gg3NL4yWKwEZR6egQVUYJXX5Gb3/ZGOxS9VBRCKTGZYTRH55enDPdtENyuBKB9fe49q3zqlGzHbta0eb' +
            'NLMncGiEMquxpULFAitk9DfaBpc2VXr1GcJbGPc+NqOnpM1hw4IKse6UJS+RLg0LFkfQVIO4vSxAQsAJ' +
            'wPNGa2U9PRHl3PbYwv1ELd2Slrv/5GVu/dKxpJZADQzFejw0pNpbxBVBns9N/C5F0e0DAq2uGfo8JDhE' +
            'BwbgNI1kuenDa//JJ4OLAYHCzCvyGUCsRlLnduTHQ2gDw7OlrXovnJZHDSaWkRc/06innxWTEBQEB0Mw' +
            'EyFh1AIliq0XOY66yPcubOvQWud0DjgF1YFqVG3X+/BGfPSjA97QQnHyEWmBaNlgMwnhrVUC3V339zYB' +
            'XOvi7pFi3NWwc0ozuFtrZKODYmM+fOifaxcyjt3ExX516wRC69iJ8yeKaF8One3ggadqiilp9M5Eas6Q' +
            '0bZPzESSk9sEHKe/bgjEy9sHJas4w7CkRl5kAxnCcmvvpKpl97TTQOQG4LLZheDBRJxNcNA7eM9Dwh5a' +
            'NHpbRli9v/NbdWvIIoJJnCq4eiAojR2gkf9zyouAYwHDMpLXYei/cug1g2OEbODV2WmdPviuroiLIdVi' +
            '5q6uL27Tcg5h6w0DZpvaPJdA9i1gwNZd4C/s1cJGKBvtj4nK9x5nWner6qZBPQAhtfmf8otijX50RaBp' +
            'mpdz+GHvfprEzGtZ6TEjjgJRK2BEDSJzRakG+hnJ9+5iYt/FAqgeKNaonGBWdQeuq1IkGJEvXm1nnGeo' +
            'zX+Sqz45YuElJngcwjAsq7MozLIxAgVh6jM4dj/yc+W95K/yE3sBkfRkT/M7+W/cAvvbDGigNKQEDGhq' +
            '+NxnyOL8yT/NILAoJxxTRa05sxhlXpC901PHwRGfcRP0ejoUasjAZrGmJC/8GOy5d/YawKPpQexzfzH9' +
            's8D0VTcAq5q5blsTZo9zx/wpizDWF4MsIInEA8OavUgYkg6OO3c5icSRbyAhND5T+9IMck8hogu01rfy' +
            'IMz+L7/cFtw8NzEE48DgUH5lx3d3Pz1NRxkA6Xtcb7K1RDjiWBeyfyzQmMwozLu2QhDQCdNWaNGQWwD2' +
            'HJUymQVCRqMWqHaaCjY6vv+0/jNLQP8fswmNbgQQl98fEmWej2enxodbhYbALsfH/hD7GfcdOHs+yXnU' +
            'ND17hMGtM/5aF6NqBPzisAAAAASUVORK5CYII=';
   
    cntrlDefaultProperties['title'] = '';
    cntrlDefaultProperties['height'] = '50px';
    cntrlDefaultProperties['width'] = '50px';
    cntrlDefaultProperties['alt'] = '';
    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','onmouseover','onmouseout']);
    return cntrlDefaultProperties;
}
YouTubeIcon.HtmlControl_YouTubeIcon=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlYouTubeIcon=[];
    if(htmlControlobj.iconurl!='')
    {
        var a={};
        a.type="a";
        a.html=[];
        let val = htmlControlobj["socialurl"];
        if (htmlControlobj["jsonkey"]) {
            if (htmlControlobj["jsonkey"].length > 0) {
                val = "{{" + htmlControlobj["jsonkey"] + "}}";
            }
        }
        a.href = val;
        var image={};
        image.type="img";
        image.src=htmlControlobj['iconurl'];
        a.html.push(image);

        a["id"]=htmlControlobj["controlid"];
         var result=InlineStyleHelper.AllocateEvents(htmlControlobj,a,inlineJsfunctions);
        a=result.htmlControl;
        a.style=InlineStyleHelper.getInlineStyle(htmlControlobj);
        inlineJsfunctions=result.inlineJsfunctions;

        htmlControlYouTubeIcon.push(a);
    }

    var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','target','autofocus','disabled','target'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlYouTubeIcon[key]=htmlControlobj[key];
            }
        }
    })
    htmlControldiv.html=htmlControlYouTubeIcon;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
    if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = YouTubeIcon;