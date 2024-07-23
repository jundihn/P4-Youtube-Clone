import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloConnection";
import { AuthContext } from "./contexts/Auth";
import { useState } from "react";
import MainStack from "./navigations/MainStack";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          isSignedIn: isSignedIn,
          setIsSignedIn: setIsSignedIn,
        }}
      >
        <MainStack />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
