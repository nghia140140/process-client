import React, { PureComponent } from 'react';
import { compose, withState } from 'recompose';
import { Tabs, Icon } from 'antd';
import { TabsWrapperStyled } from './styles';

const TabPane = Tabs.TabPane;

class TabsWrapper extends PureComponent {
	render() {
		const {
			animated,
			position,
			size,
			tabStyle,
			fullWidth,
			tabs,
			activeKey,
			setActiveKey
		} = this.props;
		return tabs ? (
			<TabsWrapperStyled
				activeKey={activeKey}
				animated={animated}
				tabPosition={position}
				size={size}
				tabBarStyle={tabStyle}
				onChange={setActiveKey}
				fullWidth={fullWidth}
			>
				{tabs.map(tab => (
					<TabPane
						key={tab.id}
						tab={
							<span>
								{tab.icon && <Icon type={tab.icon} />}
								{tab.title}
							</span>
						}
					>
						{tab.content(activeKey, setActiveKey)}
					</TabPane>
				))}
			</TabsWrapperStyled>
		) : null;
	}
}

TabsWrapper.defaultProps = {
	animated: false,
	position: 'top',
	size: 'default',
	icon: null
};

export default compose(
	withState('activeKey', 'setActiveKey', ({ tabs }) => {
		return tabs && tabs.length ? tabs[0].id : '';
	})
)(TabsWrapper);
