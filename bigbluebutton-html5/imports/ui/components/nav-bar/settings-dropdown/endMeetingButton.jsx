import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from 'react-intl';
import { makeCall } from '/imports/ui/services/api';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import { colorDanger, colorWhite } from '/imports/ui/stylesheets/styled-components/palette';
import Styled from './styles';

const intlMessages = defineMessages({
  leaveSessionLabel: {
    id: 'app.navBar.leaveMeetingButton.leaveSessionLabel',
    description: 'Leave session button label',
  },
  leaveSessionDesc: {
    id: 'app.navBar.leaveMeetingButton.leaveSessionDesc',
    description: 'Describes leave session button',
  },
});

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  isMeteorConnected: PropTypes.bool.isRequired,
  onLeaveSession: PropTypes.func,
};

const defaultProps = {
  onLeaveSession: null,
};

class LeaveMeetingButton extends PureComponent {
  constructor(props) {
    super(props);

    this.LOGOUT_CODE = '680'; // Unique code to indicate user left

    this.handleLeaveSession = this.handleLeaveSession.bind(this);
  }

  handleLeaveSession() {
    const { onLeaveSession } = this.props;

    makeCall('userLeftMeeting');
    Session.set('codeError', this.LOGOUT_CODE);

    if (onLeaveSession) {
      onLeaveSession();
    }
  }

  render() {
    const { intl, isMeteorConnected } = this.props;

    if (!isMeteorConnected) return null;

    return (
      <Styled.LeaveButton
        onClick={this.handleLeaveSession}
        style={{ backgroundColor: colorDanger, color: colorWhite }}
        data-test="leaveMeetingButton"
      >
        {intl.formatMessage(intlMessages.leaveSessionLabel)}
      </Styled.LeaveButton>
    );
  }
}

LeaveMeetingButton.propTypes = propTypes;
LeaveMeetingButton.defaultProps = defaultProps;

export default LeaveMeetingButton;
