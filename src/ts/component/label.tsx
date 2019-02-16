import {Component} from 'react';
import PropTypes from 'prop-types';

interface LabelProps {
	disabled?: boolean;
	hidden?: boolean;
}

type LabelPropTypes = {
	[P in keyof LabelProps]: any
};

class Label extends Component<LabelProps> {
	static propTypes: LabelPropTypes = {
		disabled: PropTypes.bool,
		hidden: PropTypes.bool
	};
}

export default Label;
