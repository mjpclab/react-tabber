import React, { Component } from 'react';
import { NormalizedTabItemPosition, LabelContainerProps, LabelContainerPropTypes } from '../type/tab';
declare class LabelContainer extends Component<LabelContainerProps> {
    static propTypes: LabelContainerPropTypes;
    onKeyDown(e: React.KeyboardEvent, pos: NormalizedTabItemPosition): void;
    render(): JSX.Element;
}
export default LabelContainer;
