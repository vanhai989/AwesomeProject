import {syncNotesToServer} from './syncService';

let isOnline: boolean = false;

export const handleConnectivityChange = (state: {isConnected: boolean | null}) => {
  isOnline = state.isConnected ?? false;
  if (isOnline) {
    syncNotesToServer();
  }
};

export const getNetworkStatus = (): boolean => isOnline;
