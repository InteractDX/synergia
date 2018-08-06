//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';
import InlineStyleHelper from '../common/inlinestylehelper.jsx'
import Util from '../common/util.js';
import CopyPaste from './copypastecontrol.jsx';
//create the header class
let Canvas = React.createClass({

    //function will reset the containment for newly added control on designer
    componentDidMount: function () {
       // $('.draggable').draggable({containment: "parent"});
    },
    deleteControl: function(e){
        e.currentTarget.closest("div").remove();
    },
    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let styleDictionary=InlineStyleHelper.generateInlineStyle(this.props.data);
        let inlinestyle = styleDictionary.inlinestyle;
        let divStyle=styleDictionary.divinlinestyle;
        return (
          
            <div style={divStyle} className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class} draggable='true' onDragStart={this
                .props
                .dragStart
                .bind(this, this.props.data)}
                onClick={this
                .props
                .setSelectedControl
                .bind(this, this.props.data)}>
                <canvas accessKey={this.props.data.accesskey}
                    contentEditable={this.props.data.contenteditable}
                    draggable={this.props.data.draggable}
                    className={this.props.data.class}
                    spellCheck={this.props.data.spellcheck}
                    id={this.props.data.controlid}
                    tabIndex={this.props.data.tabindex}
                    title={this.props.data.title}
                    style={inlinestyle}>
                '<canvas id="myCanvas" width="200" height="100" >Canvas</canvas>'
                </canvas>
                <span className="glyphicon glyphicon-remove delete-icon" onClick={this
                .props
                .removecontrol
                .bind(this, this.props.data)}></span>
                <span className="glyphicon glyphicon-copy" onClick={this
                .props
                .clonecontrol
                .bind(this, this.props.data)}></span>
        </div>
        )
}
});

Canvas.properties = function (cntrlDefaultProperties) {
   
   cntrlDefaultProperties['tabindex'] = '';
   cntrlDefaultProperties['title'] = '';
   cntrlDefaultProperties['controlid'] = '';
   cntrlDefaultProperties['style'] = {}
   cntrlDefaultProperties['style_fontSize'] = '';
   cntrlDefaultProperties['style_fontFamily'] = '';
   cntrlDefaultProperties['style_fontWeight'] = '';
   cntrlDefaultProperties['style_fontStyle'] = '';
   cntrlDefaultProperties['style_fontVariant'] = '';
   cntrlDefaultProperties['style_textTransform'] = '';
   cntrlDefaultProperties['style_color'] = '';
   cntrlDefaultProperties['style_backgroundColor'] = 'red';
   cntrlDefaultProperties['style_backgroundImage'] = '';
   cntrlDefaultProperties['style_backgroundRepeat'] = '';
   cntrlDefaultProperties['style_backgroundattachment'] = '';
   cntrlDefaultProperties['style_backgroundxposition'] = '';
   cntrlDefaultProperties['style_backgroundyposition'] = '';
   cntrlDefaultProperties['style_position'] = '';
   cntrlDefaultProperties['style_zIndex'] = '';
   cntrlDefaultProperties['style_width'] = '';
   cntrlDefaultProperties['style_height'] = '';
   cntrlDefaultProperties['style_top'] = '';
   cntrlDefaultProperties['style_right'] = '';
   cntrlDefaultProperties['style_bottom'] = '';
   cntrlDefaultProperties['style_left'] = '';

   cntrlDefaultProperties['style_underline'] = '';
   cntrlDefaultProperties['style_overline'] = '';
   cntrlDefaultProperties['style_linethrough'] = '';
   cntrlDefaultProperties["rownumber"]="0";
   cntrlDefaultProperties["columnnumber"]="0";
   cntrlDefaultProperties["parentcontrolid"]="0";
   cntrlDefaultProperties['borderClass'] = '';
   cntrlDefaultProperties['style_borderTop'] = '';
   cntrlDefaultProperties['style_borderBottom']='';
   cntrlDefaultProperties['style_borderRight'] = '';
   cntrlDefaultProperties['style_borderLeft']='';
   cntrlDefaultProperties['div_stylefloat'] = 'none';
   cntrlDefaultProperties['div_stylewidth'] = '';
   cntrlDefaultProperties['div_class'] = '';
   return cntrlDefaultProperties;
}
//export the modules
module.exports = Canvas;