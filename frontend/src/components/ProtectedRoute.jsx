import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import {Flex, Spinner as Loader} from "@chakra-ui/react"

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Flex
    align="center"  // Center items vertically
    justify="center" // Center items horizontally
    h="100vh" 
    background={'gray.900'}       // Full viewport height for vertical centering
  >
    <Loader color='white' />
  </Flex>; // Or a spinner
  }

  if (!user || user.publicMetadata?.role !== role) {
    return <Navigate to="/" />; // Redirect to home or sign-in page
  }

  return children;
};

export default ProtectedRoute;
