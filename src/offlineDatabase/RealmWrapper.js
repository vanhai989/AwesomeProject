import {useApp} from '@realm/react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import Realm, {OpenRealmBehaviorType} from 'realm';
import App from './app';
import {useEffect, useState} from 'react';
import {RealmContext} from './models/Task';

const {RealmProvider} = RealmContext;

function RealmWrapper(props) {
  const app = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      const credetials = Realm.Credentials.anonymous();
      await app.logIn(credetials);
      setIsLoggedIn(true);
    };
    login();
  }, [app]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoggedIn ? (
        <RealmProvider
          sync={{
            flexible: true,
            onError: (err) => {console.log('err:', err);},
            newRealmFileBehavior: {
              type: OpenRealmBehaviorType.DownloadBeforeOpen,
            },
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}>
          <App />
        </RealmProvider>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
}

export default RealmWrapper;