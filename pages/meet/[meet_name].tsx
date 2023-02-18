/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC } from "react";
import dynamic from "next/dynamic";

import { IJitsiMeetingProps } from "@jitsi/react-sdk/lib/types";
import { useRouter } from "next/router";

const JitsiMeeting = dynamic(
  () =>
    import("@jitsi/react-sdk").then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  }
) as FC<IJitsiMeetingProps>;

const index = () => {
  const router = useRouter();
  const { meet_name, name, email } = router.query;

  return (
    <div>
      <JitsiMeeting
        roomName={`${meet_name}`}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          disableInviteFunctions: true,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        }}
        userInfo={{
          displayName: `${name}`,
          email: `${email}`,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100vh";
        }}
        onReadyToClose={() => {
          router.push("/");
        }}
      />
    </div>
  );
};

export default index;
