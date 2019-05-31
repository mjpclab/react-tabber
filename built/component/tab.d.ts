import { Component } from 'react';
import { TabProps, NormalizedTabItemPosition, SwitchOptions, TabItemPosition, TabPropTypes } from '../type/tab';
interface TabState {
    manageTargetPosition: boolean;
    targetPosition: TabItemPosition;
}
declare class Tab extends Component<TabProps, TabState> {
    static propTypes: TabPropTypes;
    static defaultProps: import("../type/tab").PublicProps;
    private tabContext;
    private prevPosition;
    private currentPosition;
    constructor(props: TabProps);
    componentWillReceiveProps(props: TabProps): void;
    componentWillUnmount(): void;
    switchTo(position: NormalizedTabItemPosition): NormalizedTabItemPosition;
    private _switchNeighbor;
    switchPrevious(options?: SwitchOptions): NormalizedTabItemPosition | undefined;
    switchNext(options?: SwitchOptions): NormalizedTabItemPosition | undefined;
    switchFirst(options?: SwitchOptions): NormalizedTabItemPosition | undefined;
    switchLast(options?: SwitchOptions): NormalizedTabItemPosition | undefined;
    render(): JSX.Element;
    private handleIndexChange;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default Tab;
