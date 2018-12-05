import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { Provider } from 'react-redux';
import store from './src/redux/store/index';

registerScreens(Provider, store);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Init',
      },
    },
  });
});
