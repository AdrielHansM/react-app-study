import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginContext } from "./services/LoginProvider";
import LoadingScreen from "./screens/forms/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CustomerDetail from "./screens/CustomerDetail";
import AddPayment from "./screens/forms/AddPayment";
import AddOrder from "./screens/forms/AddOrder";
import AddCustomer from "./screens/forms/AddCustomer";
import UpdateCustomer from "./screens/forms/updateCustomer";

const Stack = createStackNavigator();
export default function AppStack() {
  const {user, isLoading} = useContext(LoginContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name = "loading" options={{ headerShown: false }} component={LoadingScreen} />
          ) : user ? (
          <>
            <Stack.Screen name = "Home" component={HomeScreen} />
            <Stack.Screen name = "Customer Details" component={CustomerDetail} />
            <Stack.Screen name = "Payment" component={AddPayment} />
            <Stack.Screen name = "Order" component={AddOrder} />
            <Stack.Screen name = "Customer" component={AddCustomer} />
            <Stack.Screen name = "Update Customer" component={UpdateCustomer} />
          </>
          ) : (
          <>
            <Stack.Screen name = "login" component={LoginScreen} />
            <Stack.Screen name = "Registration" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}