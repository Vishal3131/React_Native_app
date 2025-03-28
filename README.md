# React Native CLI Project  

A React Native mobile application built with TypeScript, Redux Toolkit, and Firebase.

## 🚀 Features
- Redux Toolkit for state management
- API calls using `createAsyncThunk`
- Error handling with proper fallbacks
- Responsive UI with React Native Stylesheet

## 🛠️ Installation

### 1️⃣ Prerequisites  
Ensure you have the following installed:
- **Node.js** (Download: https://nodejs.org/)
- **React Native CLI**  
  
  npm install -g react-native-cli

2. Clone the Repository
git clone https://github.com/Vishal3131/React_Native_app.git
cd project

3️. Install Dependencies
npm install

4. Running the Application
npx react-native run-android

📂 Folder Structure
/project
│-- /src
│   │-- /navigation    # Routing
│   │-- /screens       # App screens (Home, Details, etc.)
│   │-- /redux         # Redux slices and store setup
│   │-- /assets        # Images, icons, fonts
│-- /android           # Android project files
│-- /ios               # iOS project files
│-- App.tsx           # Main entry file
│-- package.json      # Dependencies and scripts


⚠️ Error Handling
The app handles errors gracefully:

API Errors: Displays a user-friendly message when the network request fails.

Redux Errors: Uses createAsyncThunk to handle rejected actions.

Navigation Errors: Provides fallback routes if id is undefined.

📦 Building APK (Android)
cd android
./gradlew assembleRelease

The APK file will be available at:
android/app/build/outputs/apk/release/app-release.apk


