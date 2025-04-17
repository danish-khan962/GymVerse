import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, VStack, List, ListItem, Button, useDisclosure, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text } from '@chakra-ui/react';
import { SignOutButton } from '@clerk/clerk-react';
import Home from './Home';
import Appointments from './Appointments';
import ApplyDoctor from './ApplyDoctor';
import Navbar from '../../components/Navbar';
import { HamburgerIcon } from '@chakra-ui/icons';
import Doctors from './Doctors';
import { useUser, useAuth } from '@clerk/clerk-react';
import { userProfile } from '../../utils/fetchData'

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const { getToken } = useAuth()
  const [userProfileData, setUserProfile] = useState('')

  useEffect(() => {
    if (user?.publicMetadata.role === "admin") {
      setIsAdmin(true)
    }

    const consoleToken = async () => {
      const token = await getToken()
      const data = await userProfile(token, user?.id)
      if (data.isAdmin === true) {
        setUserProfile('Admin')
      } else if (data.isDoctor === true) {
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
          <Text color={'white'} fontSize={'20px'} fontWeight={'700'}>{userProfileData && userProfileData}</Text>
          <VStack align="start" spacing="2">
            <List spacing={1}>
              <ListItem>
                <Link to="home">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Home
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="doctors">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Doctors
                  </Button>
                </Link>
              </ListItem>
              {isAdmin || userProfileData === 'Doctor' ? "" : <ListItem>
                <Link to="applyDoctor">
                  <Button fontSize={'18px'} variant="link" color="white" padding="4px" _hover={{ bg: "gray.700" }}>
                    Apply Doctor
                  </Button>
                </Link>
              </ListItem>}
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
                        <Link to="home">
                          <Button variant="link" color="white" _hover={{ bg: "gray.700" }}>
                            Home
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="doctors">
                          <Button variant="link" color="white" _hover={{ bg: "gray.700" }}>
                            Doctors
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="applyDoctor">
                          <Button variant="link" color="white" _hover={{ bg: "gray.700" }}>
                            Apply Doctor
                          </Button>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <SignOutButton>
                          <Button color="gray.800" _hover={{ bg: "gray.400" }}>
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
            <Route path="home" element={<Home />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="applyDoctor" element={<ApplyDoctor />} />
            <Route path="doctors" element={<Doctors />} />
            {/* <Route path="addCategory" element={<AddCategory />} />
            <Route path="categories" element={<Categories />} /> */}
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
