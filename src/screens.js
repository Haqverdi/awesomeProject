import { Navigation } from 'react-native-navigation';

import Init from './screens/Init';
import Tasks from './screens/Tasks';
import Header from './components/Header';
import AddTask from './screens/AddTask';
import TaskInner from './screens/TaskInner';
import Login from './screens/Login';
import Logout from './screens/sidemenu/Logout';
import SideBar from './screens/SideBar';
import Profil from './components/Profil';
import Companies from './components/Companies';
import CurrencyListInner from './components/CurrencyListInner';

export function registerScreens(Provider, store) {
  Navigation.registerComponentWithRedux('Init', () => Init, Provider, store);
  Navigation.registerComponentWithRedux('Tasks', () => Tasks, Provider, store);
  Navigation.registerComponentWithRedux(
    'Header',
    () => Header,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'AddTask',
    () => AddTask,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'TaskInner',
    () => TaskInner,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux('Login', () => Login, Provider, store);
  Navigation.registerComponentWithRedux(
    'Logout',
    () => Logout,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'SideBar',
    () => SideBar,
    Provider,
    store
  );
  Navigation.registerComponent('Profil', () => Profil);
  Navigation.registerComponent('Companies', () => Companies);
  Navigation.registerComponent('CurrencyListInner', () => CurrencyListInner);
}
