import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./Pages/Home";
import Main from "./Pages/Main";
import Description from "./Pages/Description";
import Auth from "./Pages/Auth";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          headerShown: false
        }
      },
      Main: {
        screen: Main,
        navigationOptions: {
          headerShown: false
        }
      },
      Description: {
        screen: Description
      },
      Auth: {
        screen: Auth,
        navigationOptions: {
          headerShown: false
        }
      }
    },
    {
      // defaultNavigationOptions: {
      //   headerTintColor: "#fff",
      //   headerStyle: {
      //     backgroundColor: "#7d40e7"
      //   }
      // }
      // headerMode: "none"
    }
  )
);

export default Routes;
