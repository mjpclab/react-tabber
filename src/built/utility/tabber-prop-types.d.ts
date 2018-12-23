import PropTypes from 'prop-types';
declare const tabberPropTypes: {
    tabs: PropTypes.Requireable<(PropTypes.InferProps<{
        label: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        panel: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
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
    labelItemClassName: PropTypes.Requireable<string>;
    panelContainerClassName: PropTypes.Requireable<string>;
    panelItemClassName: PropTypes.Requireable<string>;
};
export default tabberPropTypes;
