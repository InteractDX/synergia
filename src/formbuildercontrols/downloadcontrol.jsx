//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';

//create the header class
let Download = React.createClass({

    //function will reset the containment for newly added control on designer
    componentDidMount: function () {
        $('.designer_draggable').draggable({containment: "parent"});
    },
    deleteControl: function(e){
        e.currentTarget.closest("div").remove();
    },

    //render the html
    render() {


        let classNames = 'designer_draggable'; //class to activate drag on designer
        let divStyle={"float":this.props.data.div_style_float};

        return (
            <div draggable='true' onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
                style={divStyle}
                className={classNames + " " + this.props.data.borderClass}>
                <select>
                    <option value="option1">option1</option>
                </select><span className="glyphicon glyphicon-remove"  onClick={this.deleteControl}></span>
                <span className="glyphicon glyphicon-copy" onClick={this
                .props
                .clonecontrol
                .bind(this, this.props.data)}></span>
            </div>
        )
    }
})

Download.properties = function (cntrlDefaultProperties) {

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
	cntrlDefaultProperties["rownumber"]="0";
    cntrlDefaultProperties["columnnumber"]="0";
    cntrlDefaultProperties["parentcontrolid"]="0";
    cntrlDefaultProperties['borderClass'] = '';
    cntrlDefaultProperties['div_style_float'] = 'none';
    return cntrlDefaultProperties;
}
//export the modules
module.exports = Download;