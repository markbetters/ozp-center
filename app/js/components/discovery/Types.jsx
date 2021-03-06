'use strict';

var React = require('react');
var SelectBox = require('../shared/SelectBox.jsx');
var SystemStateMixin = require('../../mixins/SystemStateMixin');

var Types = React.createClass({
    mixins: [SystemStateMixin],

    propTypes: {
        value: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    onChange(types) {
        this.props.onChange(types);
    },

    render() {
        return (
            <SelectBox className="SelectBox__Types col-sm-3 col-xs-4" tabIndex="0" label="Listing Type" aria-haspopup="true" onChange={this.onChange} value={this.props.value} multiple>
                {
                    this.state.system.types.map((x, i) =>
                        <option tabIndex={0} key={`${x.id}.${i}`} value={x.title}>{x.title}</option>
                    )
                }
            </SelectBox>
        );
    }
});

module.exports = Types;
