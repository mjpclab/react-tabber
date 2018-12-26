import React from 'react';
declare class Tab extends React.Component<ReactTabber.TabProps, ReactTabber.TabState> {
    static propTypes: ReactTabber.TabPropTypes;
    static defaultProps: ReactTabber.Props;
    private tabContext;
    constructor(props: ReactTabber.TabProps);
    static getDerivedStateFromProps(props: ReactTabber.TabProps, state: ReactTabber.TabState): {
        prevActiveIndex: number;
        targetIndex: number;
    } | null;
    componentWillUnmount(): void;
    private createLabelContainer;
    private createPanelContainer;
    private createTabContainer;
    private switchTo;
    render(): JSX.Element;
    private handleIndexChange;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default Tab;
