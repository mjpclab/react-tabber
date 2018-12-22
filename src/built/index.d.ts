/// <reference path="../ts/type/public.d.ts" />
import React from 'react';
import Label from './component/label';
import Panel from './component/panel';
declare class ReactTabber extends React.Component<ReactTabber.Props, ReactTabber.State> {
    static Label: typeof Label;
    static Panel: typeof Panel;
    static propTypes: {
        tabs: import("prop-types").Requireable<(import("prop-types").InferProps<{
            label: import("prop-types").Validator<string | number | boolean | {} | import("prop-types").ReactElementLike | import("prop-types").ReactNodeArray>;
            panel: import("prop-types").Validator<string | number | boolean | {} | import("prop-types").ReactElementLike | import("prop-types").ReactNodeArray>;
            key: import("prop-types").Requireable<string | number>;
        }> | null)[]>;
        triggerEvents: import("prop-types").Requireable<string | (string | null)[]>;
        delayTriggerEvents: import("prop-types").Requireable<string | (string | null)[]>;
        delayTriggerCancelEvents: import("prop-types").Requireable<string | (string | null)[]>;
        delayTriggerLatency: import("prop-types").Requireable<number>;
        activeIndex: import("prop-types").Requireable<number>;
        onSwitching: import("prop-types").Requireable<(...args: any[]) => any>;
        onSwitched: import("prop-types").Requireable<(...args: any[]) => any>;
        tabContainerClassName: import("prop-types").Requireable<string>;
        labelContainerClassName: import("prop-types").Requireable<string>;
        showHeaderLabelContainer: import("prop-types").Requireable<boolean>;
        showFooterLabelContainer: import("prop-types").Requireable<boolean>;
        headerLabelContainerClassName: import("prop-types").Requireable<string>;
        footerLabelContainerClassName: import("prop-types").Requireable<string>;
        labelItemClassName: import("prop-types").Requireable<string>;
        labelItemActiveClassName: import("prop-types").Requireable<string>;
        labelItemInactiveClassName: import("prop-types").Requireable<string>;
        panelContainerClassName: import("prop-types").Requireable<string>;
        panelItemClassName: import("prop-types").Requireable<string>;
        panelItemActiveClassName: import("prop-types").Requireable<string>;
        panelItemInactiveClassName: import("prop-types").Requireable<string>;
    };
    static defaultProps: ReactTabber.Props;
    private currentIndex;
    private prevIndex;
    private delayTimeout?;
    private triggerEvents?;
    private delayTriggerEvents?;
    private delayTriggerCancelEvents?;
    constructor(props: any);
    static getDerivedStateFromProps(props: ReactTabber.Props, state: ReactTabber.State): {
        prevActiveIndex: number;
        targetIndex: number;
    } | null;
    componentWillUnmount(): void;
    private _createLabelContainer;
    private createHeaderLabelContainer;
    private createFooterLabelContainer;
    private createPanelContainer;
    private createTabContainer;
    private switchTo;
    render(): JSX.Element;
    private handleIndexChange;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default ReactTabber;
