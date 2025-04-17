import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, VStack, List, ListItem, Button, useDisclosure, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text } from '@chakra-ui/react';
import { SignOutButton } from '@clerk/clerk-react';
import Activity from './Activity';

import Navbar from '../components/Navbar';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useUser, useAuth } from '@clerk/clerk-react';
import { userProfile } from '../utils/fetchData'
import Dashboard from './Dashboard';
import Goals from './Goals';
import Workout from './Workout';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser()
  const { getToken } = useAuth()
  const [userProfileData, setUserProfile] = useState('')
  const [score, setScore] = useState(0)

  useEffect(() => {
   

    const consoleToken = async () => {
      const token = await getToken()
      const data = await userProfile(token, user?.id)

      setScore(data?.score)


      if (data?.isAdmin === true) {
        setUserProfile('Admin')
      } else if (data?.isDoctor === true) {
        setUserProfile('Doctor')
      } else {
        setUserProfile('User')
      }
    }



    consoleToken();
  }, [getToken, user?.id, user?.publicMetadata.role])

  return (
    <Box bg="gray.900" minH="100vh">
      <Navbar />
      <Flex direction="row" bg="gray.900" borderTop="1px" borderColor="gray.700">
        <Box
          display={{ base: 'none', md: 'block' }} // Hide on mobile
          w="40"
          bg="gray.900"
          borderRight="1px"
          borderColor="gray.700"
          p="4"
          height="90vh"
        >
          <Box textAlign="center" p={4} bg="gray.700" borderRadius="md" boxShadow="lg">
            <Text color="white" fontSize="18px" fontWeight="600">
              Role: {userProfileData}
            </Text>
            <Box mt={2} p={2} bg="green.500" borderRadius="md" display="inline-block">
              <Text color="white" fontSize="14px" fontWeight="700">
                {score} Points
              </Text>
            </Box>
          </Box>

          <VStack align="start" spacing="2">
            <List spacing={1}>
              <ListItem>
                <Link to="dashboard">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Dashboard
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="workout">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Workout
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="goals">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Goals
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="activity">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Activity
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <SignOutButton>
                  <Button fontSize={'18px'} color="gray.800" _hover={{ bg: "gray.400" }}>
                    Sign Out
                  </Button>
                </SignOutButton>
              </ListItem>
            </List>
          </VStack>
        </Box>

        <Box
          display={{ base: 'block', md: 'none' }} // Show on mobile
          p="4"
          bg="gray.900"
          borderRight="1px"
          borderColor="gray.700"
          height="90vh"
        >
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
            color="white"
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
          >
            <DrawerOverlay>
              <DrawerContent bg="gray.900" color="white">
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <Text color={'white'} fontSize={'20px'} fontWeight={'700'}>{userProfileData && userProfileData}</Text>
                  <VStack align="start" spacing="2">
                    <List spacing={1}>
                      <ListItem>
                        <Link to="dashboard">
                          <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                            Dashboard
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="workout">
                          <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                            Workout
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="goals">
                          <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                            Goals
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="activity">
                          <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                            Activity
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <SignOutButton>
                          <Button fontSize={'18px'} color="gray.800" _hover={{ bg: "gray.400" }}>
                            Sign Out
                          </Button>
                        </SignOutButton>
                      </ListItem>
                    </List>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>

        <Box flex="1" p="4" maxH="90vh" overflowY="scroll">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workout" element={<Workout />} />
            <Route path="activity" element={<Activity />} />
            <Route path="goals" element={<Goals />} />
            {/* <Route path="addCategory" element={<AddCategory />} />
            <Route path="categories" element={<Categories />} /> */}
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
