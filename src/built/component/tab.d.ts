import React from 'react';
declare class Tab extends React.Component<ReactTabber.TabProps, ReactTabber.TabState> {
    static propTypes: ReactTabber.TabPropTypes;
    static defaultProps: ReactTabber.Props;
    private tabContext;
    constructor(props: ReactTabber.TabProps);
    static getDerivedStateFromProps(props: ReactTabber.TabProps, state: ReactTabber.TabState): {
        prevActivePosition: string | number | undefined;
        targetPosition: string | number | undefined;
    } | null;
    componentWillUnmount(): void;
    private switchTo;
    render(): JSX.Element;
    private handleIndexChange;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default Tab;
