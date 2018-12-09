/// <reference path="../ts/type/public.d.ts" />
/// <reference path="../ts/type/private.d.ts" />
import React from 'react';
import PropTypes from 'prop-types';
import Label from './component/label';
import Panel from './component/panel';
declare class ReactTabber extends React.Component<ReactTabberProps, ReactTabberState> {
    static Label: typeof Label;
    static Page: typeof Panel;
    static propTypes: {
        tabs: PropTypes.Validator<(PropTypes.InferProps<{
            label: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
            page: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
            key: PropTypes.Requireable<string | number>;
        }> | null)[]>;
        triggerEvents: PropTypes.Requireable<string | (string | null)[]>;
        delayTriggerEvents: PropTypes.Requireable<string | (string | null)[]>;
        delayTriggerCancelEvents: PropTypes.Requireable<string | (string | null)[]>;
        delayTriggerLatency: PropTypes.Requireable<number>;
        activeIndex: PropTypes.Requireable<number>;
        onSwitching: PropTypes.Requireable<(...args: any[]) => any>;
        onSwitched: PropTypes.Requireable<(...args: any[]) => any>;
        tabContainerClassName: PropTypes.Requireable<string>;
        labelContainerClassName: PropTypes.Requireable<string>;
        showHeaderLabelContainer: PropTypes.Requireable<boolean>;
        showFooterLabelContainer: PropTypes.Requireable<boolean>;
        headerLabelContainerClassName: PropTypes.Requireable<string>;
        footerLabelContainerClassName: PropTypes.Requireable<string>;
        labelItemClassName: PropTypes.Requireable<string>;
        labelItemActiveClassName: PropTypes.Requireable<string>;
        labelItemInactiveClassName: PropTypes.Requireable<string>;
        pageContainerClassName: PropTypes.Requireable<string>;
        pageItemClassName: PropTypes.Requireable<string>;
        pageItemActiveClassName: PropTypes.Requireable<string>;
        pageItemInactiveClassName: PropTypes.Requireable<string>;
    };
    static defaultProps: ReactTabberProps;
    private activeIndex;
    private currentIndex;
    private renderedIndex;
    private triggerEvents?;
    private delayTriggerEvents?;
    private delayTriggerCancelEvents?;
    private delayTimeout?;
    constructor(props: any);
    componentWillReceiveProps(nextProps: ReactTabberProps): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    private getValidIndex;
    private _getLabelContainer;
    private getHeaderLabelContainer;
    private getFooterLabelContainer;
    private getPageContainer;
    private getTabContainer;
    private switchTo;
    private getTabEntries;
    render(): JSX.Element;
    private updateRenderedIndex;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default ReactTabber;
