import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchScreen from './src/screens/SearchScreen'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchScreen />
    </SafeAreaView>
  )
}

export default App