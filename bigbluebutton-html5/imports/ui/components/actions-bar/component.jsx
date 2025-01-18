import React, { PureComponent } from 'react';
import CaptionsButtonContainer from '/imports/ui/components/captions/button/container';
import deviceInfo from '/imports/utils/deviceInfo';
import Styled from './styles';
import { makeCall } from '/imports/ui/services/api';

import ActionsDropdown from './actions-dropdown/container';
import AudioCaptionsButtonContainer from '/imports/ui/components/audio/captions/button/container';
import ScreenshareButtonContainer from '/imports/ui/components/actions-bar/screenshare/container';
import AudioControlsContainer from '../audio/audio-controls/container';
import JoinVideoOptionsContainer from '../video-provider/video-button/container';
import PresentationOptionsContainer from './presentation-options/component';
import RaiseHandDropdownContainer from './raise-hand/container';
import { isPresentationEnabled } from '/imports/ui/services/features';
// import LeaveMeetingButton from "../nav-bar/settings-dropdown/endMeetingButton";
import { IoLogOutOutline } from "react-icons/io5";

class ActionsBar extends PureComponent {
  
  constructor(props) {
    super(props);

    this.LOGOUT_CODE = '680'; // Unique code to indicate user left

    this.handleLeaveSession = this.handleLeaveSession.bind(this);
  }

    handleLeaveSession() {
      const { onLeaveSession } = this.props;
  
      makeCall('userLeftMeeting');
      Session.set('codeError', this.LOGOUT_CODE);
  
      // if (onLeaveSession) {
      //   onLeaveSession();
      // }
    }
  
  render() {
    const {
      amIPresenter,
      amIModerator,
      enableVideo,
      presentationIsOpen,
      setPresentationIsOpen,
      handleTakePresenter,
      intl,
      isSharingVideo,
      isSharedNotesPinned,
      hasScreenshare,
      stopExternalVideoShare,
      isCaptionsAvailable,
      isMeteorConnected,
      isPollingEnabled,
      isSelectRandomUserEnabled,
      isRaiseHandButtonEnabled,
      isThereCurrentPresentation,
      allowExternalVideo,
      setEmojiStatus,
      currentUser,
      layoutContextDispatch,
      actionsBarStyle,
      setMeetingLayout,
      showPushLayout,
      setPushLayout,
      setPresentationFitToWidth,
    } = this.props;

    const shouldShowOptionsButton = (isPresentationEnabled() && isThereCurrentPresentation) 
                                    || isSharingVideo || hasScreenshare || isSharedNotesPinned;
                                    return (
      <Styled.ActionsBar
        style={
          {
            height: actionsBarStyle.innerHeight,
          }
        }
      >
        <Styled.Left>
          <ActionsDropdown {...{
            amIPresenter,
            amIModerator,
            isPollingEnabled,
            isSelectRandomUserEnabled,
            allowExternalVideo,
            handleTakePresenter,
            intl,
            isSharingVideo,
            stopExternalVideoShare,
            isMeteorConnected,
            setMeetingLayout,
            setPushLayout,
            presentationIsOpen,
            showPushLayout,
            setPresentationFitToWidth,
          }}
          />
          {isCaptionsAvailable
            ? (
              <CaptionsButtonContainer {...{ intl }} />
            )
            : null}
          { !deviceInfo.isMobile
            ? (
              <AudioCaptionsButtonContainer />
            )
            : null }

            <IoLogOutOutline
             onClick={this.handleLeaveSession}
             color={'red'}
             size={'44px'}
            />
        </Styled.Left>
        
        <Styled.Center>
          <AudioControlsContainer />
          {enableVideo
            ? (
              <JoinVideoOptionsContainer />
            )
            : null}
          <ScreenshareButtonContainer {...{
            amIPresenter,
            isMeteorConnected,
          }}
          />
        </Styled.Center>
        <Styled.Right>
          { shouldShowOptionsButton ?
            <PresentationOptionsContainer
              presentationIsOpen={presentationIsOpen}
              setPresentationIsOpen={setPresentationIsOpen}
              layoutContextDispatch={layoutContextDispatch}
              hasPresentation={isThereCurrentPresentation}
              hasExternalVideo={isSharingVideo}
              hasScreenshare={hasScreenshare}
              hasPinnedSharedNotes={isSharedNotesPinned}
            />
            : null
          }
          {isRaiseHandButtonEnabled
            ? (
              <RaiseHandDropdownContainer {...{
                setEmojiStatus,
                currentUser,
                intl,
              }
              }
              />
            ) : null}
        </Styled.Right>
      </Styled.ActionsBar>
    );
  }
}

export default ActionsBar;
