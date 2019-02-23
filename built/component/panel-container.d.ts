import { Component } from 'react';
import { PanelContainerProps, PanelContainerPropTypes } from '../type/tab';
declare class PanelContainer extends Component<PanelContainerProps> {
    static propTypes: PanelContainerPropTypes;
    render(): JSX.Element;
}
export default PanelContainer;
