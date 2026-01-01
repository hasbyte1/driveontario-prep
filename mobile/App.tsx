import './global.css';
import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {OneSignal} from 'react-native-onesignal';
import notifee from '@notifee/react-native';

import {AuthProvider} from './src/contexts/AuthContext';
import {ProgressProvider} from './src/contexts/ProgressContext';
import {SettingsProvider} from './src/contexts/SettingsContext';
import {RootNavigator} from './src/navigation/RootNavigator';
import {ONESIGNAL_APP_ID} from './src/lib/config';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function App(): React.JSX.Element {
  useEffect(() => {
    // Initialize OneSignal
    OneSignal.initialize(ONESIGNAL_APP_ID);

    // Request notification permissions
    OneSignal.Notifications.requestPermission(true);

    // Set up Notifee for local notifications
    setupNotifee();
  }, []);

  const setupNotifee = async () => {
    // Request permissions for iOS
    await notifee.requestPermission();

    // Create a channel for Android
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: 4, // High
    });

    await notifee.createChannel({
      id: 'reminders',
      name: 'Study Reminders',
      importance: 4,
      sound: 'default',
    });

    await notifee.createChannel({
      id: 'achievements',
      name: 'Achievements',
      importance: 3, // Default
    });
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <SettingsProvider>
              <ProgressProvider>
                <StatusBar
                  barStyle="dark-content"
                  backgroundColor="transparent"
                  translucent
                />
                <RootNavigator />
              </ProgressProvider>
            </SettingsProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
