//import the modules
import React from 'react';
import Select from 'react-select';
import xss from 'xss';
import moment from 'moment';

//create the header class
let NumberInput = React.createClass({

    //render the html
    render() {

        let classNames = 'designer_draggable'; //class to activate drag on designer
        let divStyle={"float":this.props.data.div_style_float};
        return (
            <div style={divStyle} draggable='true' onDragStart={this
        .props
        .dragStart
        .bind(this, this.props.data)}
                className={classNames + " " + this.props.data.borderClass+" "+this.props.data.div_class}>
                <input type="number" name="quantity" min="1" max="500"/>
            </div>
        )
    }
})

NumberInput.properties = function (cntrlDefaultProperties) {

    cntrlDefaultProperties['tabindex'] = '';
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
    cntrlDefaultProperties['div_class'] = '';
    return cntrlDefaultProperties;
}

//export the modules
module.exports = NumberInput;