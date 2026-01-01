# Drive Ontario Prep - React Native Mobile App

A mobile application for preparing for the Ontario G1 driver's license test, built with React Native CLI (no Expo).

## Tech Stack

- **React Native 0.76.5** - Cross-platform mobile framework
- **React Navigation 7** - Navigation library with stack and bottom tabs
- **NativeWind 4** - Tailwind CSS for React Native
- **React Native Gesture Handler** - Touch and gesture handling
- **React Native Reanimated 3** - Smooth animations
- **MMKV** - Fast key-value storage with encryption
- **React Native Encrypted Storage** - Secure storage (Keychain/Keystore)
- **OneSignal** - Push notifications
- **Notifee** - Local notifications with scheduling

## Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Setup

1. Install dependencies:
```bash
npm install
```

2. iOS setup:
```bash
cd ios && pod install && cd ..
```

3. Configure OneSignal:
   - Create an app at [OneSignal Dashboard](https://onesignal.com)
   - Update `ONESIGNAL_APP_ID` in `src/lib/config.ts`
   - Update `ios/Podfile` with your OneSignal App ID

4. Configure API URL:
   - Update `API_URL` in `src/lib/config.ts`

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Metro Bundler
```bash
npm start
```

## Project Structure

```
mobile/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── src/
│   ├── components/          # Reusable UI components
│   │   └── QuestionCard.tsx
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ProgressContext.tsx
│   │   └── SettingsContext.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and services
│   │   ├── api.ts           # API client
│   │   ├── config.ts        # App configuration
│   │   └── storage.ts       # MMKV storage helpers
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/             # Screen components
│   │   ├── auth/            # Auth screens
│   │   ├── HomeScreen.tsx
│   │   ├── PracticeScreen.tsx
│   │   ├── TestScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── ...
│   └── types/               # TypeScript types
├── App.tsx                  # App entry point
├── global.css               # Tailwind CSS imports
├── tailwind.config.js       # Tailwind configuration
├── metro.config.js          # Metro bundler config
└── package.json
```

## Features

- **Authentication**: Login, Register, Password Reset
- **Onboarding**: Welcome screens for new users
- **Home Dashboard**: XP, level, streak tracking
- **Practice Mode**: Practice by category with explanations
- **Test Mode**: Full 40-question mock tests
- **Progress Tracking**: XP, levels, badges, achievements
- **Leaderboard**: Weekly/daily/all-time rankings
- **Offline Mode**: Encrypted local cache for offline studying
- **Push Notifications**: Study reminders via OneSignal
- **Local Notifications**: Scheduled reminders via Notifee
- **Premium Features**: Subscription-based premium content

## Storage

The app uses multiple storage solutions:

1. **MMKV** - Fast, synchronous key-value storage for:
   - User preferences
   - Progress data cache
   - App settings

2. **Encrypted Storage** - Secure storage for:
   - Auth tokens
   - Sensitive user data
   - Offline tokens

## Notifications

- **OneSignal**: Remote push notifications from server
- **Notifee**: Local notifications with:
  - Daily study reminders
  - Achievement unlocks
  - Streak reminders

## Building for Production

### iOS
```bash
cd ios
xcodebuild -workspace DriveOntarioPrep.xcworkspace -scheme DriveOntarioPrep -configuration Release archive
```

### Android
```bash
cd android
./gradlew assembleRelease
```

## License

Private - All rights reserved
