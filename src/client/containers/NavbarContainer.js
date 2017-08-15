'use strict';

import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { toggleConfig, setConfigVisibleState, toggleMenu, setMenuVisibleState } from '../actions/uiActions';

function mapStateToProps (state) {
  return ({
    connection: state.connection,
    activeWsAddress: state.ui.activeWsAddress
  });
}

function mapDispatchToProps (dispatch) {
  return ({
    dispatchToggleConfig: () => dispatch(toggleConfig()),
    dispatchToggleMenu: () => dispatch(toggleMenu()),
    dispatchCloseConfig: () => dispatch(setConfigVisibleState(false)),
    dispatchCloseMenu: () => dispatch(setMenuVisibleState(false))
  });
}

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default NavbarContainer;
