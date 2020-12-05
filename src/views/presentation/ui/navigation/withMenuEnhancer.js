import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import { findKey, indexOf, dropRight, last, _ , filter} from 'lodash';
import { mediaMin } from '~/views/utilities/layout';

const setSelectedKeys = (menus, path, keys) => {
	const keyOption = findKey(menus, menu => {
		const str = path.split(/[//]/);
		const url = menu.path;
		const result = url ? url.indexOf(str[1]) : '0';
		// if(result >= 0){
		// 	return true
		// }
		if((path || '').startsWith(url) ){
			return true
		}
		return false
	});
	
	if (keyOption) {
		keys.push(keyOption);
		if (menus[keyOption] && menus[keyOption].subMenus) {
			setSelectedKeys(menus[keyOption].subMenus, path, keys);
		};
	}
};

const enhance = compose(
	withRouter,
	withState('defaultSelectedKeys', 'setDefaultSelectedKeys', ({ location, menus }) => {
		const keys = [];
		setSelectedKeys(menus, location.pathname, keys);
		return keys;
	}),
	withState('openKeys', 'setOpenKeys', ({ defaultSelectedKeys }) => {
		return dropRight(defaultSelectedKeys, 1);
	}),
	withState('menus', 'setMenus', props => props.menus),
	withHandlers({
		onOpenChange: ({ setOpenKeys }) => openKeys => {
			setOpenKeys([last(openKeys)]);
		}
	}),
	lifecycle({
		shouldComponentUpdate(nextProps) {
			if (
				nextProps.isCollapsed &&
				nextProps.isCollapsed !== this.props.isCollapsed
			) {
				nextProps.setOpenKeys([]);
				return false;
			}
			return true;
		}
	})
);

export default enhance;
