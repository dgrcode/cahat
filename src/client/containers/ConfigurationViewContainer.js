'use strict';

import { connect } from 'react-redux';
import ConfigurationView from '../components/ConfigurationView';
import { changeSendStyle, changeNameOnlyActive } from '../actions/configurationActions';
import { setConfigVisibleState } from '../actions/uiActions';

function mapStateToProps (state) {
  return ({
    configuration: state.configuration,
    connection: state.connection,
    ui: state.ui,
    userName: state.user.name
  });
}

function mapDispatchToProps (dispatch) {
  return ({
    onChangeSendStyle: sendWithEnter => dispatch(changeSendStyle(sendWithEnter)),
    onChangeNameOnlyActive: boolChangeName => dispatch(changeNameOnlyActive(boolChangeName)),
    dispatchCloseConfig: () => dispatch(setConfigVisibleState(false))
  });
}

const ConfigurationViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationView);

export default ConfigurationViewContainer;
