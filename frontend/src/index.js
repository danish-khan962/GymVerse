import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";


const PUBLISHABLE_KEY = "pk_test_dG91Z2gtYWlyZWRhbGUtMTEuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={'/'}>

    <BrowserRouter>
      {/* <ChakraProvider> */}
        <App />
      {/* </ChakraProvider> */}
    </BrowserRouter>
  </ClerkProvider>

);
