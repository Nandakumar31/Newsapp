News Search App

A React Native application that allows users to search for news articles, view results in real-time, and access cached articles when offline.

Features:-
Dynamic news search with debounce
Offline support using AsyncStorage
News API integration (with fallback provider)
Modern UI with animated cards
Article detail modal with image slider
Smooth performance
Error, empty, and loading states
Clean & minimal design

API Strategy
Primary API: NewsAPI.org
Required as per task.

    Fallback API: GNews.io
    Used because NewsAPI free keys do not work on mobile (RN).

How Offline Mode Works
When online → fresh news is fetched
Results are saved in AsyncStorage

    If offline → app loads cached results
    Shows “Offline — showing cached results”

How to Run the App
    git clone https://github.com/Nandakumar31/Newsapp.git
    cd Newsapp

npm install

# or

yarn install

npm start

# or

yarn start

npm run android

# or

yarn android

✔️ App is Ready!




Authentication Flow (Login + OTP)
    The app includes a simple and secure authentication flow using phone number login and 4-digit OTP verification.
    This approach works fully offline (since OTP is generated locally) not recomended for production

You can now:
    you can log with ur Number
    Otp will show in alert
    Search news with real-time results
    View offline cached results
    Open articles with image slider
    Test API fallback behavior
