import {Component} from "react";
import PropTypes from 'prop-types';

class Label extends Component<ReactTabber.LabelProps> {
	static propTypes: ReactTabber.LabelPropTypes = {
		disabled: PropTypes.bool,
		hidden: PropTypes.bool
	}
}

export default Label;
