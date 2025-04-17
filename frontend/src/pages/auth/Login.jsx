import React from 'react';
import { Box, Flex, Center, useTheme } from '@chakra-ui/react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  const { colors } = useTheme();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bg="gray.900"
      color="white"
      p={4}
    >
      <Center w="full" maxW="md" p={6} borderRadius="md" bg="gray.800" boxShadow="md">
        <Box w="full">
          <SignIn 
            // Optionally customize styles here if supported by SignIn
            style={{ 
              backgroundColor: colors.gray[800],
              borderRadius: 'md',
              boxShadow: 'md',
            }}
          />
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
