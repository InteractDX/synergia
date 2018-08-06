{this.state.showpropertyevent.includes('Properties')&&this
                    .props
                    .selectedControl
                    .hasOwnProperty('source') && <div className="row p2px wraptxt">
                        <div className="col-md-4">API URL</div>
                        <div className="col-md-8">
                            <input
                    type="text"
                    className="form-control h22px"
                    value={this.props.selectedControl.source
                    ? this.props.selectedControl.source
                    : ''}
                    onBlur={this
                    .updateControl
                    .bind(this)}
                    onChange={this
                    .editControlProp
                    .bind(this, 'source', 'value')}/>
            </div>
        </div>
                }