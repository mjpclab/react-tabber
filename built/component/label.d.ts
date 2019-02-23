import { Component } from 'react';
interface LabelProps {
    disabled?: boolean;
    hidden?: boolean;
}
declare type LabelPropTypes = {
    [P in keyof LabelProps]: any;
};
declare class Label extends Component<LabelProps> {
    static propTypes: LabelPropTypes;
}
export default Label;
