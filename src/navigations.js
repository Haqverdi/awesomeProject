import { Navigation } from 'react-native-navigation';

export const goTasks = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'sideMenu',
        left: {
          component: {
            id: 'SideBar',
            name: 'SideBar',
          },
        },
        center: {
          stack: {
            options: {
              topBar: {
                background: {
                  color: '#4CAC85',
                },
                title: {
                  component: {
                    name: 'Header',
                    passProps: {
                      title: 'Dashboard',
                    },
                    alignment: 'center',
                  },
                },
                leftButtons: [
                  {
                    icon: require('./assets/menu.svg'),
                    id: 'LeftMenuBtn',
                  },
                ],
              },
            },
            children: [
              {
                component: {
                  id: 'Tasks',
                  name: 'Tasks',
                },
              },
            ],
          },
        },
      },
    },
  });

export const goLogin = () =>
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            background: {
              color: '#4CAC85',
            },
            title: {
              alignment: 'center',
              text: 'Daxil ol',
              color: 'white',
              fontSize: 20,
            },
          },
        },
        id: 'LoginPage',
        children: [
          {
            component: {
              name: 'Login',
              id: 'Login',
            },
          },
        ],
      },
    },
  });
