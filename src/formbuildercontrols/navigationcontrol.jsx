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
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'
import ID from '../common/UUID.js';
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
import ReactDOM from 'react-dom';
var selectedPageLink = '';
let Navbar = React.createClass({

    componentDidMount() {
        var el = ReactDOM.findDOMNode(this.refs.pageOptions);
        el.value = selectedPageLink;
    },

    saveDisign: function (e) {
       if(!e) e=window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        
        //pageOptions
        var el = ReactDOM.findDOMNode(this.refs.pageOptions);

        this.props.saveNavigationData(el.value, this.props.parent)
    },
    pageLinkChange: function (e) {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        
        var el = ReactDOM.findDOMNode(this.refs.pageOptions);
        selectedPageLink = el.value;
        this.props.loadDataAsPerNavigation(el.value, this.props.parent)

    },

    stopPropagation: function (e) {
        if(!e) e=window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) 
            e.stopPropagation();
        }
    ,
    loadPageOptions() {
        var pageOptions = [];
        this.props.data.menuoptions.map(function (option) {

                pageOptions.push(option.link);
                option.submenuoptions.map(function (option_inner) {
                        pageOptions.push(option_inner.link);
                    })
            })
        var obj = (

            <select
                ref="pageOptions"
                onChange={this.pageLinkChange}
                onClick={this.stopPropagation}>
                {pageOptions.map(function (option) {
                        return <option value={option} key={ID.uuid()}>{option}</option>;
                    })}
            </select>
        )
        return obj;
    },
    render() {
     return (
      <div onClick={this.props.setSelectedControl.bind(this, this.props.data)}>
       <nav className="navbar navbar-inverse">
        
        <ul className="nav navbar-nav">
        {this.props.data.menuoptions.map(function (option) {
        if (option.submenuoptions.length <= 0) {
            return (
                  <li className={option.class} key={ID.uuid()}>
                       <a href='#/'>{option.menu}</a>
                  </li>
                 )
        } else {
          return (
             <li className={option.class + ' dropdown'} key={ID.uuid()}>
               <a className="dropdown-toggle" data-toggle="dropdown" href={option.link}>{option.menu}
               <span className="caret"></span>
               </a>
              <ul className="dropdown-menu">
                 {option.submenuoptions.map(function (option_inner) {
                 return (<li key={option_inner.key}>
                           <a href='#/'>{option_inner.menu}</a>
                         </li>)
                      })}
               </ul>
             </li>)
        }
        }, this)
        }</ul>
         <div style={{"float":"right"}}>
           {this.loadPageOptions()}
           <input type="button" onClick={this.saveDisign.bind(this)}
                                value="Save Design"/>
          </div>
      </nav>
     
    </div>
        )
    }

});

Navbar.properties = function (cntrlDefaultProperties) {
    cntrlDefaultProperties['menuoptions'] = [
        {
            menu: 'Home',
            link: '#Home',
            class: '',
            key: ID.uuid(),
            submenuoptions: []
        }
    ];
    cntrlDefaultProperties['selectednestedmenus'] = [];
    cntrlDefaultProperties['controlid'] = '';  
    cntrlDefaultProperties['disabled'] = false;
    cntrlDefaultProperties['class'] = '';
    
    return cntrlDefaultProperties;
}
Navbar.HtmlControl_Navbar=function(htmlControlobj)
{
    var htmlControldiv={};
    htmlControldiv.type="div";
    var inlineJsfunctions='';

    var htmlPropertiesForBind=['name','class','disabled'];
    var keys = Object.keys(htmlControlobj);
    keys.forEach(function (key) {
        if(htmlPropertiesForBind.indexOf(key)>=0)
        {
            if(htmlControlobj[key]&&htmlControlobj[key]!="")
            {
                htmlControldiv[key]=htmlControlobj[key];
            }
        }
    })
    htmlControldiv["id"]=htmlControlobj["controlid"];

    var navControl={};
    navControl.type='nav';
    navControl.class="navbar navbar-inverse";

    var ulControl={};
    ulControl.type='ul';
    ulControl.class='nav navbar-nav';
    var menuoptionControls=[];
    for(var counter=0;counter<htmlControlobj.menuoptions.length;counter++)
    {
        var subOptions=htmlControlobj.menuoptions[counter].submenuoptions;
        if(subOptions.length<= 0)
        {
            var liControl={};
            liControl.type="li";
            liControl.class=htmlControlobj.menuoptions[counter].class;
            var linkControl={};
            linkControl.href=htmlControlobj.menuoptions[counter].link;
            linkControl.type="a";
            linkControl.html=htmlControlobj.menuoptions[counter].menu;
            liControl.html=linkControl;
            menuoptionControls.push(liControl);
        }
        else
        {
            var liControl={};
            liControl.type="li";
            liControl.class=htmlControlobj.menuoptions[counter].class+' dropdown';

            var linkControl={};
            var linkControlHtml=[];
            linkControl.href=htmlControlobj.menuoptions[counter].link;
            linkControl.type="a";
            linkControl.class='dropdown-toggle';
            linkControl["data-toggle"]='dropdown';
           // linkControl.html=htmlControlobj.menuoptions[counter].menu;
           var spanControl={};
           spanControl.type='span';
           spanControl.class='caret';          

           var spanControl1={};
           spanControl1.type='span';
           spanControl1.html=htmlControlobj.menuoptions[counter].menu;
           var spanControlObject=[];
           spanControlObject.push(spanControl);spanControlObject.push(spanControl1);

           linkControl.html=spanControlObject;
           linkControlHtml.push(linkControl);

           var innerUlControl={};
           innerUlControl.type='ul';
           innerUlControl.class='dropdown-menu';
           var innerUlHtmlControls=[];

           for(var submenuCounter=0;submenuCounter<subOptions.length;submenuCounter++)
           {
            var innerliControl={};
            innerliControl.type='li';
            var innerlinkControls={};
            innerlinkControls.type='a';
            innerlinkControls.html=subOptions[submenuCounter].menu;
            innerlinkControls.href=subOptions[submenuCounter].link;
            innerliControl.html=innerlinkControls;

            innerUlHtmlControls.push(innerliControl);
           }
           
           innerUlControl.html=innerUlHtmlControls;
           linkControlHtml.push(innerUlControl);
           liControl.html=linkControlHtml;
           menuoptionControls.push(liControl);
        }
    }
    ulControl.html=menuoptionControls;
    navControl.html=ulControl;
    htmlControldiv.html=navControl;
    return {'htmlControl':htmlControldiv,'inlineJsfunctions':inlineJsfunctions};
}
//export the modules
module.exports = Navbar;