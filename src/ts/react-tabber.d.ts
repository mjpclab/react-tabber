/// <reference path="public.d.ts" />
/// <reference path="private.d.ts" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactTabberLabel from './react-tabber-label';
import ReactTabberPage from './react-tabber-page';
declare class ReactTabber extends React.Component<ReactTabberProps, ReactTabberState> {
    static Label: typeof ReactTabberLabel;
    static Page: typeof ReactTabberPage;
    static propTypes: {
        tabs: PropTypes.Requireable<any>;
        triggerEvents: PropTypes.Requireable<any>;
        delayTriggerEvents: PropTypes.Requireable<any>;
        delayTriggerCancelEvents: PropTypes.Requireable<any>;
        delayTriggerLatency: PropTypes.Requireable<any>;
        activeIndex: PropTypes.Requireable<any>;
        onSwitching: PropTypes.Requireable<any>;
        onSwitched: PropTypes.Requireable<any>;
        tabContainerClassName: PropTypes.Requireable<any>;
        labelContainerClassName: PropTypes.Requireable<any>;
        showHeaderLabelContainer: PropTypes.Requireable<any>;
        showFooterLabelContainer: PropTypes.Requireable<any>;
        headerLabelContainerClassName: PropTypes.Requireable<any>;
        footerLabelContainerClassName: PropTypes.Requireable<any>;
        labelItemClassName: PropTypes.Requireable<any>;
        labelItemActiveClassName: PropTypes.Requireable<any>;
        labelItemInactiveClassName: PropTypes.Requireable<any>;
        pageContainerClassName: PropTypes.Requireable<any>;
        pageItemClassName: PropTypes.Requireable<any>;
        pageItemActiveClassName: PropTypes.Requireable<any>;
        pageItemInactiveClassName: PropTypes.Requireable<any>;
    };
    static defaultProps: ReactTabberProps;
    private currentIndex;
    private renderedIndex;
    private triggerEvents?;
    private delayTriggerEvents?;
    private delayTriggerCancelEvents?;
    private delayTimeout?;
    constructor(props: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    private getValidIndex(index);
    private _getLabelContainer(tabs, positionClassName);
    private getHeaderLabelContainer(tabs);
    private getFooterLabelContainer(tabs);
    private getPageContainer(tabs);
    private getTabContainer(tabs);
    private switchTo(index);
    private getTabs();
    render(): JSX.Element;
    private updateRenderedIndex();
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export { ReactTabber as default, ReactTabber, ReactTabberLabel, ReactTabberPage };
