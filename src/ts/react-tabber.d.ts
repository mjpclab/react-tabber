/// <reference path="main.d.ts" />
/// <reference path="private.d.ts" />
/// <reference types="react" />
import React = require('react');
import PropTypes = require('prop-types');
declare class ReactTabber extends React.Component<ReactTabberProps, ReactTabberState> {
    static propTypes: {
        tabs: PropTypes.Validator<any>;
        triggerEvents: PropTypes.Requireable<any>;
        delayTriggerEvents: PropTypes.Requireable<any>;
        delayTriggerCancelEvents: PropTypes.Requireable<any>;
        delayTriggerLatency: PropTypes.Requireable<any>;
        activeIndex: PropTypes.Requireable<any>;
        onSwitch: PropTypes.Requireable<any>;
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
    private triggerEvents?;
    private delayTriggerEvents?;
    private delayTriggerCancelEvents?;
    private delayTimeout?;
    constructor(props: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    private getValidIndex(index);
    private getLabelContainer(positionClassName);
    private getPageContainer();
    private getTabContainer();
    private switchTo(index);
    render(): JSX.Element | null;
}
export = ReactTabber;
