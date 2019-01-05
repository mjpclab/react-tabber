import React from 'react';
declare class Tab extends React.Component<ReactTabber.TabProps, ReactTabber.TabState> {
    static propTypes: ReactTabber.TabPropTypes;
    static defaultProps: ReactTabber.Props;
    private tabContext;
    constructor(props: ReactTabber.TabProps);
    static getDerivedStateFromProps(props: ReactTabber.TabProps): {
        manageActiveIndex: boolean;
        targetPosition?: undefined;
    } | {
        manageActiveIndex: boolean;
        targetPosition: string | number;
    };
    componentWillUnmount(): void;
    switchTo(position: ReactTabber.NormalizedTabItemPosition): ReactTabber.NormalizedTabItemPosition;
    private _switchNeighbor;
    switchPrevious(options?: ReactTabber.SwitchOptions): ReactTabber.NormalizedTabItemPosition | undefined;
    switchNext(options?: ReactTabber.SwitchOptions): ReactTabber.NormalizedTabItemPosition | undefined;
    switchFirst(options?: ReactTabber.SwitchOptions): ReactTabber.NormalizedTabItemPosition | undefined;
    switchLast(options?: ReactTabber.SwitchOptions): ReactTabber.NormalizedTabItemPosition | undefined;
    render(): JSX.Element;
    private handleIndexChange;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default Tab;
