interface LabelProps {
	disabled?: boolean;
	hidden?: boolean;
}

type LabelPropTypes = {
	[P in keyof LabelProps]: any
};

export {
	LabelProps,
	LabelPropTypes
}
