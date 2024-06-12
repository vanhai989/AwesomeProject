// syncService.ts

import {getNetworkStatus} from './networkStatus';
import {getNotes} from './noteService';

export const syncNotesToServer = async () => {
  if (!getNetworkStatus()) return;

  const notes = getNotes();
  console.log('notes', notes);
  
  // Example: Use fetch or any HTTP client to sync notes with your backend
  try {
    await fetch('http://localhost:3000/sync-realm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notes),
    });
  } catch (error) {
    console.error('Failed to sync notes', error);
  }
};
