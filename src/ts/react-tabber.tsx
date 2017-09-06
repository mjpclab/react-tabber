import React = require('react');
import PropTypes = require('prop-types');

class ReactTabber extends React.Component<ReactTabProps, ReactTabState> {
	static propTypes = {
		tabs: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.node.isRequired,
			page: PropTypes.node.isRequired,
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})).isRequired,

		tabContainerClassName: PropTypes.string,

		labelContainerClassName: PropTypes.string,
		labelItemClassName: PropTypes.string,
		labelItemActiveClassName: PropTypes.string,
		labelItemInactiveClassName: PropTypes.string,

		pageContainerClassName: PropTypes.string,
		pageItemClassName: PropTypes.string,
		pageItemActiveClassName: PropTypes.string,
		pageItemInactiveClassName: PropTypes.string,

		activeIndex: PropTypes.number,
		showTopLabel: PropTypes.bool,
		showBottomLabel: PropTypes.bool,

		clickSwitch: PropTypes.bool,
		hoverSwitch: PropTypes.bool,
		hoverSwitchDelay: PropTypes.number,
		leaveCancelSwitch: PropTypes.bool,

		onSwitch: PropTypes.func
	};

	static defaultProps: ReactTabOptionalProps = {
		tabContainerClassName: 'tab-container',

		labelContainerClassName: 'label-container',
		labelItemClassName: 'label-item',
		labelItemActiveClassName: 'label-active',
		labelItemInactiveClassName: 'label-inactive',

		pageContainerClassName: 'page-container',
		pageItemClassName: 'page-item',
		pageItemActiveClassName: 'page-active',
		pageItemInactiveClassName: 'page-inactive',

		activeIndex: 0,
		showTopLabel: true,
		showBottomLabel: false,

		clickSwitch: true,
		hoverSwitch: false,
		hoverSwitchDelay: 0,
		leaveCancelSwitch: true,
	};

	private delayTimeout?: number;

	constructor(props: any) {
		super(props);

		this.state = {
			activeIndex: this.props.activeIndex!
		};
	}

	componentWillUnmount() {
		clearTimeout(this.delayTimeout);
	}

	private getLabelContainer(position: string) {
		const props = this.props;
		const state = this.state;

		return <div className={props.labelContainerClassName + ' ' + position}>
			{this.props.tabs.map((tab, index) => {
				const className = props.labelItemClassName + ' ' + (index === state.activeIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName);
				const doSwitch = () => {
					if (index === state.activeIndex) {
						return;
					}
					this.switchTo(index);
				};
				let localDelayTimeout: number;
				const delayDoSwitch = (props.hoverSwitchDelay!) <= 0 ?
					doSwitch :
					() => {
						if (index === state.activeIndex) {
							return;
						}
						clearTimeout(this.delayTimeout);
						localDelayTimeout = this.delayTimeout = setTimeout(doSwitch, props.hoverSwitchDelay);
					};
				const cancelDelayDoSwitch = () => {
					if (localDelayTimeout === this.delayTimeout) {
						clearTimeout(localDelayTimeout);
					}
				};

				return <label
					key={tab.key ? 'key-' + tab.key : 'index-' + index}
					className={className}
					onClick={props.clickSwitch ? doSwitch : undefined}
					onMouseEnter={props.hoverSwitch ? delayDoSwitch : undefined}
					onMouseLeave={props.leaveCancelSwitch ? cancelDelayDoSwitch : undefined}
				>{tab.label}</label>
			})}
		</div>
	}

	private getPageContainer() {
		const props = this.props;
		const state = this.state;

		return <div className={props.pageContainerClassName}>
			{this.props.tabs.map((tab, index) => {
				const className = props.pageItemClassName + ' ' + (index === state.activeIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
				return <div
					key={tab.key ? 'key-' + tab.key : 'index-' + index}
					className={className}
				>{tab.page}</div>
			})}
		</div>;
	}

	private getTabContainer() {
		const props = this.props;

		return <div className={props.tabContainerClassName}>
			{props.showTopLabel ? this.getLabelContainer('top') : null}
			{this.getPageContainer()}
			{props.showBottomLabel ? this.getLabelContainer('bottom') : null}
		</div>;
	}

	private switchTo(index: number) {
		//event
		const onSwitch = this.props.onSwitch;
		if (onSwitch) {
			onSwitch(this.state.activeIndex, index);
		}

		//update
		this.setState({
			activeIndex: index
		});
	}

	render() {
		return this.props.tabs ? this.getTabContainer() : null;
	}
}

export = ReactTabber;