import { Navigation } from 'react-native-navigation';

/** Tasks page */
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

/** Login Page */
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

/** Xercler modal show */
export const showExpenses = data =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'CurrencyListInner',
            passProps: {
              data,
            },
            options: {
              topBar: {
                background: {
                  color: '#4CAC85',
                },
                title: {
                  component: {
                    name: 'Header',
                    passProps: {
                      title: 'Xərclər cədvəli',
                    },
                    alignment: 'center',
                  },
                },
                leftButtons: [
                  {
                    icon: require('./assets/left-icon.svg'),
                  },
                ],
              },
            },
          },
        },
      ],
    },
  });

/** selected modal show(from sidebar) */
export const showCustomModal = (componentName, headerTitle, data) =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: componentName,
            id: componentName,
            passProps: {
              ...data,
            },
            options: {
              topBar: {
                background: {
                  color: '#4CAC85',
                },
                title: {
                  component: {
                    name: 'Header',
                    passProps: {
                      title: headerTitle,
                    },
                    alignment: 'center',
                  },
                },
                leftButtons: [
                  {
                    icon: require('./assets/left-icon.svg'),
                    color: 'white',
                  },
                ],
              },
            },
          },
        },
      ],
    },
  });
