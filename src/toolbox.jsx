/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Hiren.Nariya, Zymr
*******************************************************/

/*
Component for toolbox
*/
import React from 'react';
import ToolboxItem from './toolboxitem.jsx';
import ID from './common/UUID.js';
import ControlActions from './common/controlactions.jsx';

import Header from './formbuildercontrols/headercontrol.jsx'
import Button from './formbuildercontrols/buttoncontrol.jsx';
import Label from './formbuildercontrols/labelcontrol.jsx';
import Paragraph from './formbuildercontrols/paragraphcontrol.jsx';
import LineBreak from './formbuildercontrols/linebreakcontrol.jsx';
import Dropdown from './formbuildercontrols/dropdowncontrol.jsx';
import Tags from './formbuildercontrols/tagscontrol.jsx';
import Checkboxes from './formbuildercontrols/checkboxescontrol.jsx';
import RadioButtons from './formbuildercontrols/radiobuttonscontrol.jsx';
import TextInput from './formbuildercontrols/textinputcontrol.jsx';
import NumberInput from './formbuildercontrols/numberinputcontrol.jsx';
import TextArea from './formbuildercontrols/textareacontrol.jsx';
import Image from './formbuildercontrols/imagecontrol.jsx';
import Rating from './formbuildercontrols/ratingcontrol.jsx';
import DatePicker from './formbuildercontrols/datepickercontrol.jsx';
import HyperLink from './formbuildercontrols/hyperlinkcontrol.jsx';
import Download from './formbuildercontrols/downloadcontrol.jsx';
import RangeControl from './formbuildercontrols/rangecontrol.jsx';
import ButtonGroup from './formbuildercontrols/buttongroupcontrol.jsx';
import GoogleMap from './formbuildercontrols/googlemapcontrol.jsx';
import Graph from './formbuildercontrols/graphcontrol.jsx';
import Forms from './formbuildercontrols/formscontrol.jsx';
import Canvas from './formbuildercontrols/canvascontrol.jsx';
import Tab from './formbuildercontrols/tabcontrol.jsx';
import Panel from './formbuildercontrols/panelcontrol.jsx';
import Table from './formbuildercontrols/tablecontrol.jsx';
import ListGroup from './formbuildercontrols/listgroupcontrol.jsx';

import FBIcon from './formbuildercontrols/facebookcontrol.jsx';
import TWIcon from './formbuildercontrols/twittercontrol.jsx';
import YouTubeIcon from './formbuildercontrols/youtubecontrol.jsx';
import ImageCarousal from './formbuildercontrols/carousalcontrol.jsx';
import YouTubeEmbed from './formbuildercontrols/youtubeembedcontrol.jsx';
import Section from './formbuildercontrols/sectioncontrol.jsx';
import SectionColumnDiv from './formbuildercontrols/sectioncontrol.jsx';
import LoginForm from './formbuildercontrols/loginformcontrol.jsx';
import Calendar from './formbuildercontrols/calendarcontrol.jsx';
import QRcode from './formbuildercontrols/QRcodecontrol.jsx';
import Barcode from './formbuildercontrols/barcodecontrol.jsx';
import Navbar from './formbuildercontrols/navigationcontrol.jsx';
import Collapsible from './formbuildercontrols/collapsiblecontrol.jsx';
import Progressbar from './formbuildercontrols/progressbarcontrol.jsx';
import InnerSection from './formbuildercontrols/innersectioncontrol.jsx';
import CheckboxGroup from './formbuildercontrols/checkboxgroupcontrol.jsx';
import RadiobuttonGroup from './formbuildercontrols/radiobuttongroupcontrol.jsx';
var selectedRow=[];
class Toolbox extends React.Component
{
    //constructor
    constructor(props)
    {
        super(props);
        var controls = this.defaultcontrols();
        this.state = {
            controls: controls
        };
    }

    defaultItemOptions(element) {
        switch (element) {
            case "Dropdown":
                return [
                    {
                        value: '',
                        text: '',
                        key: 'dropdown_option_' + ID.uuid()
                    }
                ];
            case "Checkboxes":
                return [
                    {
                        value: 'place_holder_option_1',
                        text: 'Place holder option 1',
                        key: 'checkboxes_option_' + ID.uuid()
                    }
                ];
            case "RadioButtons":
                return [
                    {
                        value: 'place_holder_option_1',
                        text: 'Place holder option 1',
                        key: 'radiobuttons_option_' + ID.uuid()
                    }

                ];
            default:
                return [];
        }
    }

    defaultcontrols()
    {
        return [
            {
                key: 'Section',
                name: 'Section',
                static: true,
                icon: 'fa fa-table',
                isdragable: true,
                content: 'Section'
            },
	    {
                key: 'InnerSection',
                name: 'Inner Section',
                static: true,
                icon: 'fa fa-table',
                isdragable: true,
                content: 'Inner Section'
            },
             {
                 key: 'textControl',
                 name:'Text Control',
                static: true,
                 isdragable: false,
             },
               {
                   key: 'Header',
                   name: 'Header Text',
                   icon: 'fa fa-header',
                   static: true,
                   isdragable: true,
                   content: 'Header Text'
               }, {
                   key: 'Label',
                   name: 'Label',
                   static: true,
                   icon: 'fa fa-font',
                   isdragable: true,
                   content: 'Label'
               },
            
          {
              key: 'imageControl',
              name:'Image Control',
           static: true,
              isdragable: false,
          },
           {
              key: 'ImageCarousal',
              name: 'Carousal',
              static: true,
              icon: 'fa fa-photo',
              isdragable:true,
              content: 'gallery'
          },
          {
              key: 'Image',
              name: 'Image',
              label: '',
              icon: 'fa fa-photo',
              field_name: 'image_',
              isdragable: true,
              src: ''
          }, 
           {
               key: 'inputControl',
               name:'Input Control',
      static: true,
               isdragable: false,
           },{
               key: 'TextInput',
               name: 'Text Input',
               icon: 'fa fa-font',
               isdragable: true,
               content: 'TextInput'
           }, {
               key: 'TextArea',
               name: 'Multi-line Input',
               icon: 'fa fa-text-height',
               isdragable: true,
               content: 'TextArea'
           },
             {
                 key: 'Paragraph',
                 name: 'Paragraph',
                 icon: 'fa fa-font',
                 isdragable: true,
                 content: 'Paragraph'
             },
             {
                key: 'Dropdown',
                canHaveAnswer: true,
                name: 'Dropdown',
                icon: 'fa fa-caret-square-o-down',
                field_name: 'dropdown_',
                isdragable: true,
                options: []
            }, 
            // {
            //    key: 'DatePicker',
            //    canDefaultToday: true,
            //    canReadOnly: true,
            //    name: 'Date',
            //    icon: 'fa fa-calendar',
            //    isdragable: true,
            //    field_name: 'date_picker_'
            // },
            {
               key: 'Calendar',
               canDefaultToday: true,
               canReadOnly: true,
               name: 'Calendar',
               icon: 'fa fa-calendar',
               isdragable: true,
               field_name: 'Calendar'
            },
            {
               key: 'Barcode',
               canDefaultToday: true,
               canReadOnly: true,
               name: 'Barcode',
               icon: 'fa fa-barcode',
               isdragable: true,
               field_name: 'Barcode'
            },
            {
               key: 'QRcode',
               canDefaultToday: true,
               canReadOnly: true,
               name: 'QRcode',
               icon: 'fa fa-qrcode',
               isdragable: true,
               field_name: 'QRcode'
            },
             {
                key: 'LineBreak',
                name: 'LineBreak',
                icon: 'fa fa-arrows-v',
                static: true,
                isdragable: true,
                content: 'LineBreak',
            },
            {
                key: 'Checkboxes',
                name: 'Checkboxes',
                icon: 'fa fa-check-square-o',
                static: true,
                isdragable: true,
                content: 'Checkboxes',
            },
             {
                 key: 'RadioButtons',
                 name: 'RadioButtons',
                 icon: 'fa fa-dot-circle-o',
                 static: true,
                 isdragable: true,
                 content: 'RadioButtons',
             },
             {
                key: 'CheckboxGroup',
                name: 'CheckboxGroup',
                icon: 'fa fa-check-square-o',
                static: true,
                isdragable: true,
                content: 'CheckboxGroup',
            },
             {
                 key: 'RadiobuttonGroup',
                 name: 'RadiobuttonGroup',
                 icon: 'fa fa-dot-circle-o',
                 static: true,
                 isdragable: true,
                 content: 'RadiobuttonGroup',
             },
            {
                key: 'HyperLink',
                name: 'Hyper link',
                icon: 'fa fa-link',
                static: true,
                isdragable: true,
                content: 'Hyperlink ...',
                href: ''
            }, {
                key: 'Button',
                name: 'Button',
                static: true,
                icon: 'fa fa-font',
                isdragable: true,
                content: 'Button'

            },
             {
                 key: 'ButtonGroup',
                 name: 'Button Group',
                 static: true,
                 icon: 'fa fa-group',
                 isdragable:true,
                 content: 'Button Group'
             },
              {
                  key: 'socialControl',
                  name:'Social Control',
         static: true,
                  isdragable: false,
              },
             {
                 key: 'FBIcon',
                 name: 'Facebook',
                 static: true,
                 icon: 'fa fa-facebook-official',
                 isdragable:true,
                 content: 'facebook'
             },
             {
                 key: 'TWIcon',
                 name: 'Twitter',
                 static: true,
                 icon: 'fa fa-twitter',
                 isdragable:true,
                 content: 'twitter'
             },
             {
                 key: 'YouTubeIcon',
                 name: 'Youtube',
                 static: true,
                 icon: 'fa fa-youtube-square',
                 isdragable:true,
                 content: 'youtube'
             },
            
             {
                 key: 'YouTubeEmbed',
                 name: 'Youtube Embed',
                 static: true,
                 icon: 'fa fa-youtube-play',
                 isdragable:true,
                 content: 'gallery'
             },
             {
                 key: 'infoControl',
                 name:'Information Control',
         static: true,
                 isdragable: false,
             },
             {
                  key: 'Collapsible',
                  name: 'Collapsible',
                  static: true,
                  icon: 'fa fa-retweet',
                  isdragable: true,
                  content: 'Collapsible'
              },
                {
                 key: 'Forms',
                 name: 'Forms',
                 static: true,
                 icon: 'fa fa-paragraph',
                 isdragable: true,
                 content: 'Forms'
             },
             
              {
                  key: 'GoogleMap',
                  name: 'GoogleMap',
                  static: true,
                  icon: 'fa fa-map',
                  isdragable: true,
                  content: 'Google Map'
              },
             {
                 key: 'Graph',
                 name: 'Graph',
                 static: true,
                 icon: 'fa fa-pie-chart',
                 isdragable: true,
                 content: 'Graph'
             },
              {
                 key: 'ListGroup',
                 name: 'List Group',
                 static: true,
                 icon: 'fa fa-list-ol',
                 isdragable: true,
                 content: 'List Group'
             },
             {
                 key: 'Tab',
                 name: 'Navigation - Tab',
                 static: true,
                 icon: 'fa fa-paragraph',
                 isdragable: true,
                 content: 'Navigation - Tab'
             },
              {
                 key: 'Panel',
                 name: 'Panel',
                 static: true,
                 icon: 'fa fa-object-group',
                 isdragable: true,
                 content: 'Panel'
             },
            {
                  key: 'Progressbar',
                  name: 'Progressbar',
                  static: true,
                  icon: 'fa fa-tasks',
                  isdragable: true,
                  content: 'Progressbar'
              },
             
             {
                 key: 'Table',
                 name: 'Table',
                 static: true,
                 icon: 'fa fa-table',
                 isdragable: true,
                 content: 'Table'
             },
            
            
        ]
    }
    onDoubleClick(item)
    {
        var options = Toolbox.elementOptionsForCreateControl(item);
        var elementOptions=options.elementOptions;
        var sectionColumnDivOptions=options.sectionColumnDivOptions;
        ControlActions.createElement(elementOptions, selectedRow, sectionColumnDivOptions);
    }
    onClick(item) {}

    render()
    {
        return (
            <div className='form-builder-toolbox pull-left' id='toolboxcontrol'>
                <h4>Toolbox</h4>
                <ul>
                    {this
                        .state
                        .controls
                        .map(item => {
                            return <ToolboxItem
                                data={item}
                                key={item.key}
                                onClick={this
                                .onClick
                                .bind(this, item)}
                                onDoubleClick={this
                                .onDoubleClick
                                .bind(this, item)}/>;
                        })
}
                </ul>
            </div>
        )
    }

}
Toolbox.setSelectedRow=function(rowVal)
{
    selectedRow=rowVal;
}
Toolbox.elementOptionsForCreateControl=function(item){
    var elementOptions = {};
    var sectionColumnDivOptions = {};
    var options = {};
    switch (item.key) {
        case "Header":
            elementOptions = Header.properties(elementOptions);
            break;
        case "Label":
            elementOptions = Label.properties(elementOptions);
            break;
        case "Paragraph":
            elementOptions = Paragraph.properties(elementOptions);
            break;
        case "LineBreak":
            elementOptions = LineBreak.properties(elementOptions);
            break;
        case "Dropdown":
            elementOptions = Dropdown.properties(elementOptions);
            break;
        case "Tags":
            elementOptions = Tags.properties(elementOptions);
            break;
        case "Checkboxes":
            elementOptions = Checkboxes.properties(elementOptions);
            break;
        case "RadioButtons":
            elementOptions = RadioButtons.properties(elementOptions);
            break;
        case "TextInput":
            elementOptions = TextInput.properties(elementOptions);
            break;
        case "NumberInput":
            elementOptions = NumberInput.properties(elementOptions);
            break;
        case "TextArea":
            elementOptions = TextArea.properties(elementOptions);
            break;
        case "Image":
            elementOptions = Image.properties(elementOptions);

        case "Rating":
            elementOptions = Rating.properties(elementOptions);
            break;
        case "DatePicker":
            elementOptions = DatePicker.properties(elementOptions);
            break;
        case "HyperLink":
            elementOptions = HyperLink.properties(elementOptions);
            break;
        case "Download":
            elementOptions = Download.properties(elementOptions);
            break;
        case "Range":
            elementOptions = RangeControl.properties(elementOptions);
            break;
        case "Button":
            elementOptions = Button.properties(elementOptions);
            break;
        case "ButtonGroup":
            elementOptions = ButtonGroup.properties(elementOptions);
            break;
        case "GoogleMap":
            elementOptions = GoogleMap.properties(elementOptions);
            break;
        case "Graph":
            elementOptions = Graph.properties(elementOptions);
            break;
        case "Forms":
            elementOptions = Forms.properties(elementOptions);
            break;
        case "Canvas":
            elementOptions = Canvas.properties(elementOptions);
            break;
        case "Tab":
            elementOptions = Tab.properties(elementOptions);
            break;
       case "Navbar":
            elementOptions = Navbar.properties(elementOptions);
            break;
        case "Panel":
            elementOptions = Panel.properties(elementOptions);
            break;

        case "Table":
            elementOptions = Table.properties(elementOptions);
            break;
        case "ListGroup":
            elementOptions = ListGroup.properties(elementOptions);
            break;

        case "FBIcon":
            elementOptions = FBIcon.properties(elementOptions);
            break;
        case "TWIcon":
            elementOptions = TWIcon.properties(elementOptions);
            break;
        case "YouTubeIcon":
            elementOptions = YouTubeIcon.properties(elementOptions);
            break;
        case "ImageCarousal":
            elementOptions = ImageCarousal.properties(elementOptions);
            break;
        case "YouTubeEmbed":
            elementOptions = YouTubeEmbed.properties(elementOptions);
            break;
        case "Calendar":
            elementOptions = Calendar.properties(elementOptions);
            break;
        case "QRcode":
            elementOptions = QRcode.properties(elementOptions);
            break;
        case "Barcode":
            elementOptions = Barcode.properties(elementOptions);
            break;
        case "Collapsible":
            elementOptions = Collapsible.properties(elementOptions);
            break;
        case "Progressbar":
            elementOptions = Progressbar.properties(elementOptions);
            break;
        case "CheckboxGroup":
            elementOptions = CheckboxGroup.properties(elementOptions);
            break;
        case "RadiobuttonGroup":
            elementOptions = RadiobuttonGroup.properties(elementOptions);
            break;
        case "Section":
            elementOptions = Section.properties(elementOptions);
            sectionColumnDivOptions = SectionColumnDiv.properties(sectionColumnDivOptions);
            sectionColumnDivOptions['id'] = ID.uuid();
            sectionColumnDivOptions['element'] = "SectionColumn";
            sectionColumnDivOptions.htmlControls = [];
            sectionColumnDivOptions.columnnumber = 0;
            break;
     case "InnerSection":
            elementOptions = InnerSection.properties(elementOptions);
            sectionColumnDivOptions = SectionColumnDiv.properties(sectionColumnDivOptions);
            sectionColumnDivOptions['id'] = ID.uuid();
            sectionColumnDivOptions['element'] = "InnerSectionColumn";
            sectionColumnDivOptions.htmlControls = [];
            sectionColumnDivOptions.columnnumber = 0;
            break;
        case "LoginForm":
            elementOptions = LoginForm.properties(elementOptions);
            break;
    }

    elementOptions['id'] = ID.uuid();
    elementOptions['element'] = item.key;
    elementOptions['parentelement'] = '';
    elementOptions['parentrownumber'] = '';
      elementOptions['parentcolumnnumber'] = '';
    elementOptions['static'] = item.static;
    elementOptions['required'] = false;
    elementOptions['rownumber'] = 0;
    elementOptions['columnnumber'] = 0;
    if (item.field_name) 
        elementOptions['field_name'] = item.field_name + ID.uuid();  

    options.elementOptions=elementOptions;
    options.sectionColumnDivOptions =sectionColumnDivOptions ;
    return options;
}
selectedRow
//Export the module
module.exports = Toolbox;