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
let TWIcon = React.createClass({
   
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

TWIcon.properties = function (cntrlDefaultProperties) {
    var properties = Util.defaultProperties();
    var keys = Object.keys(properties);
    for (var i = 0; i<keys.length; i++) {
      cntrlDefaultProperties[keys[i]] = properties[keys[i]];
    }
    cntrlDefaultProperties['socialurl'] = 'https://www.twitter.com';
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
            'NlSUQ+eG1wLmlpZDo2MEIyMjMzQTk4MEUxMUU1QjUzN0JBMzYzQkVEREYwNTwvc3RSZWY6aW5zdGFuY2' +
            'VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo2MEIyMjMzQjk4MEUxMUU1Qj' +
            'UzN0JBMzYzQkVEREYwNTwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRn' +
            'JvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo2MEIyMjMzRDk4MEUxMUU1QjUzN0' +
            'JBMzYzQkVEREYwNTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG' +
            '1wLmlpZDo2MEIyMjMzQzk4MEUxMUU1QjUzN0JBMzYzQkVEREYwNTwveG1wTU06SW5zdGFuY2VJRD4KIC' +
            'AgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3M8L3htcDpDcm' +
            'VhdG9yVG9vbD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KIC' +
            'AgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Ckc5K3gAAAlhSU' +
            'RBVFgJxVlbbFxXFd3nzozn6Ulc27FJG8cuTe3ECaFJSBMoEKuWKqQ+Piq5ValQ1SIQEuoPqB/8NEIIEI' +
            '+CSEuBP36QcFWXpiAVaNNKUQkyuEnaOLIdpzjGdZLG78m8597LWufeOzOMZyZOasiW7/Ocs/c6e6+9z7' +
            'ljJZ7YtiFKWXzsHfz3HaayviSWfdBW6pNK7A14jYvbWamACPqL8t64Ddd7UQXoyUHvHLSP2bYct83M6x' +
            'OPdc9pTYdh47CDSekXLshPv7K4MZtfOQzrXzFCkSa22QXq0vh1V+eEHuUQqcV7djT+93PNNrez4RPl92' +
            'tbdi47he4/G39k6y+0LResksFBnwwMmL2DF3aYon5vRBp32tmU2KZpim0reJkoPPMOzvU/cyo4FGLVYC' +
            'h/g9jpxEuRcOCJkQc2pwRgNYCeoZlmVTCPq0h8u5VayWOQDwdC+/8W4jVMG5j9sSafeXXpd2MDHV8mCg' +
            'eMaf7AAblMkODfzQBJODp6PpwNgDRBv8e6B6ee0i3bX545gDAfh9dBEtDZ6c22my2magj5wNmJTNK827' +
            'CtwoARjvmB0QSy/zUX1z55JYady9hIsjuDUaPfQJU5aOdzQKizZu2K1tiT3Apg+g04/Gsco7vZuvZZKh' +
            'AkD/fjsDvhVbStb2YzNBGcmJVTBVvey9uStGyJ4h2Bk2MUtgfZuYrgtbJNYFNqJycZAzfZrWp3KiK7Ya' +
            'eonJ1rCTX50d+Pm3czqL94eCjmlygUjactGUmZshHvuoGW1fkKJsGJdDdgvVmtFJ1QJcVuJ1CNcnUfJ/' +
            'UvQds8PLEbylkS6hGZiuitDArMKI4jPY1yaGtU2hsDguooixlTzs1l5MWxFRm6ktOu2YkZfL8zKn+cTc' +
            'tszpIw+lUCQv4g0z1hO3jhPYZwdwoeeQ7G4gD51VPLsi/mkwy0EHCxozcAV3o/j4lNos+xz7VI39ZYWa' +
            'tIHF7bGg/I7vaw3De2LC0Rv3yxq9F+ZzqhvjOWkD0AnapE6WrwFy2WgSQIr1D1d0Rk16aw9tI3R1ekN2' +
            'RIDFxIMm4VQq6dzFry6v5bHJAwaunZl6ZFb7QC4Nf2NOvRf59NqRfHrspTm0PyxmJec7ikWu8l9GBkfY' +
            'U1PLIlA6RReKA57Dj9G3ub5bWDzTIKLSPgGpPCSxZqYMhHQeRHWxqk//ZGvtKqDRQT1hPv4DOYpGUFoQ' +
            '5i0j+/p1WaYOuCaWl+O608lxLcWZlKLcU7NiQB1nS1GlB+/7a4nO1vk6cx+xHQgslScDM5Bm7lcN/XHp' +
            'IIqEKUBFdNuHAzYqTCrk0hOTq2JD+ZTsmegCFZdxKV46qmGl0foracLeeXQXoIQ8iFa3tLSH58qE1O9G' +
            '2SZzsjsgCP0MMn0kgzHPQMhSGuJWzhJJLI9mfevizPTCTlMxEfHONEszSutI3EsslRpSbvzns1dC4hn+' +
            '+IoUQh29CXYJnBB26NyH4cT2IPM72UlbMLOXl/PifhAFOKKj0Nnsayq2szkTNlGLzsAu/Tq0Cyfyn0pa' +
            'wv08PbBNx6ALP89UJe7npvUR7f1eQWaqd8EDSd3oEs5nFPB70Iz6NB46iD0zNF2jAArCJ1AqC7Vw09g2' +
            'fCYALXM/e2SVdTg3yU1Oq0QmLQPMNVAyMyHHxPz18Lo0eLZXD8LSRUHGNIt3pS1aMcFAf3TmEVSWRNOb' +
            'QlqnVUeoqAsNWtp79u22IKk0ceRFC0yc/Vco3yxAFOSoi8Mnm1GBXycz2EJYpydg6J6lKluuYSRz08q+' +
            'yT3LuDhnwPZeOv50kChvvGvecZ8OaaQMj/dCktLSxJXmOda1WOsj9nSFZy83DfPxbkt6cXZDaR13WT7T' +
            'cqHj/PfJSWo0jULai52BbUkFJ5qroyeaPIVSbHdvB1Cnx962JauJpQaurWrdVPHMOocCf2Msoes44xqq' +
            '2rFPrSWl9FN5V46/ddLUF5ECtTMctvgAXkOJNv+MOk/PTDjOxB/ay1CamEU5Oj7MiZcklj+B96d1FG4F' +
            'F6BH/XLEGVhjhBjl1EFfnRqSWJIErcrq9V6oaeSrj/5ErUDsB9x6/Ia+dWJIG9XB7FmsbXIh5IhvzIP+' +
            'fl6FJeejD5Wut6SWc5R2uEkBC4t4jhaMB9J7KzE/cP/m1eNvxhRn5zelGv1VRaD64HkhN+YWRenv0gJf' +
            'sQ8tXrOjVVSjlHK9vwTMNcsc/QBQV3zeBLePYLGwPyBPao/bfHpBHgKZVz1cD1yUke7vh/CZDfGk/Ivr' +
            'BPrqKtcoxWVOdUdVNC80kcT24Kyqewq2cAwiGfbMNS2tsa0htf6iQWz6DHApYfXW/dhomFrBw5uSDPX8' +
            'zKXhckx65NSitTaQkt+xTRfoLlLLZhO9rCcvC2qMTIgzIhMCaVJ949V3rGYAa7qtexUHx9AmUIeva64f' +
            'b6r+1aCr3qGbywAovcksMZTgM9xRmMwgCN3H9LQB6+LSI7WoNya7wBHvXpBPOMsX8SCXYpWZBZ7F9PoD' +
            'o8P5OWGexPe4I+fLCJLkNl8/KGXuuKr7oAPpnzJwk0AaDeJ3NxII3zRwNydRpgF8hXPNwb9cudALoBy6' +
            'sfnKVns+DgZYAaBtBx7Igo3RjciHbWyXpfrrpz7ZMDtFA4DcfZaVAen4uaZcVJ84bYuIxuRti7cKAiyS' +
            'g+ed9MwrTuXmYBoLZhIsxoAmPpYdJQikqdx+s5Y4UA45U9B6DGlPL5Wm0vu6uo0QxwDbYAUBsAVe466U' +
            'eu2Sw7Lr4qmq7vFVUZ/oBYuewoNyXD/H0HL906VFsZAXA1obf4fV9+YFupPck+6yJgFSKh7EIewbOHDd' +
            'u2hqx0kuEhHdfNzscGi69J/vps5zPTphH8izE+0HkMSofwkzh5dz3L78fGUlMBSyVSQgVCyHP1wuTAJ6' +
            '44JVOsb1upxEX8Tsr/djB/bqZn+WVu+mIb/PiZ/s9tox88xwkZ/GcDvPovYHvYyiRnjAg+KZlnDuXIW4' +
            'J2gDszxb3ziFlz5lXa8KrYVnGvu5e/c19wjwObyuc3fNG4Hz+NH7MKgcffPtxXKP6zASFHUimrd/B8h6' +
            'kCPwR5B3zhmI9EFvw+6XwrQc26C9MFfwrmkd1iGIJ8WYDBXxUu5787+fS2rIcN3Vxx/43Dp56Xpj4LKj' +
            '+A27vRsQua4lAYcH2nletRHnZqKb9nY/nz6nv4G/+8Uoo0Q17Yi1A6gWX4HcM2hkYHtkxSBT3p/UPsP+' +
            'TS8rjNEgSaAAAAAElFTkSuQmCC';

    cntrlDefaultProperties['style_display'] = 'block';
    cntrlDefaultProperties['height'] = '50px';
    cntrlDefaultProperties['width'] = '50px';
    cntrlDefaultProperties['alt'] = '';
    cntrlDefaultProperties=InlineStyleHelper.SetControlEvents(cntrlDefaultProperties,
    ['onclick','onmouseover','onmouseout']);
        return cntrlDefaultProperties;
}
TWIcon.HtmlControl_TWIcon=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';
    var htmlControlTWIcon=[];
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
        htmlControlTWIcon.push(a);
    }

   var htmlPropertiesForBind=['name','accesskey','hidden','tabindex','title',
    'class','target','autofocus','disabled','target'];

    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControlTWIcon[key]=htmlControlobj[key];
            }
        }
    })

    htmlControldiv.html=htmlControlTWIcon;
    var inlineStyle=InlineStyleHelper.getInlineStyleForDiv(htmlControlobj);
    if(inlineStyle!="")
        htmlControldiv.style=inlineStyle;
    if(htmlControlobj["div_class"]!="")
        htmlControldiv.class=htmlControlobj["div_class"];
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = TWIcon;