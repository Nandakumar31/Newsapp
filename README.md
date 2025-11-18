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
