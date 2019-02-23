import { Component } from 'react';
import { PublicProps, PublicPropTypes } from './type/tab';
import Label from './component/label';
import Panel from './component/panel';
declare class ReactTabber extends Component<PublicProps> {
    static Label: typeof Label;
    static Panel: typeof Panel;
    static propTypes: PublicPropTypes;
    static defaultProps: PublicProps;
    render(): JSX.Element;
}
export default ReactTabber;
