/// <reference path="../ts/type/public.d.ts" />
import React from 'react';
import Label from './component/label';
import Panel from './component/panel';
declare class ReactTabber extends React.Component<ReactTabber.Props> {
    static Label: typeof Label;
    static Panel: typeof Panel;
    static propTypes: ReactTabber.PropTypes;
    static defaultProps: ReactTabber.Props;
    render(): JSX.Element;
}
export default ReactTabber;
