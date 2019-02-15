import {LabelProps, LabelPropTypes} from '../type/label';
import {Component} from 'react';
import PropTypes from 'prop-types';

class Label extends Component<LabelProps> {
	static propTypes: LabelPropTypes = {
		disabled: PropTypes.bool,
		hidden: PropTypes.bool
	}
}

export default Label;
