import {Redirect, SplashScreen} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Index = () => {
  // return <Redirect href='(tabs)/(home)/home'/>
  return <Redirect href='auth/login'/>
}

export default Index;