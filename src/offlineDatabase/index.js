import {AppProvider, UserProvider} from '@realm/react';
import React from 'react';
import RealmWrapper from './RealmWrapper.js';

function AppWrapper() {
  return (
    <AppProvider id={'application-0-ylhrpmd'}>
      <UserProvider fallback={<RealmWrapper />}>
        <RealmWrapper/>
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;
