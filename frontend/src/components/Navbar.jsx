import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../media/Virtual GymVerse.png';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Box,
  IconButton,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/profile/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" p="2" color="white">
      {/* Logo */}
      <Link to={'/'}>
        <img src={logo} width="60px" className="rounded-full ml-1 mt-1" alt="Virtual GymVerse" />
      </Link>

      {/* Conditional Rendering for Mobile */}
      {isMobile ? (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="white"
            _hover={{ bg: 'gray.600' }}
          />
          <MenuList bg="gray.900" borderColor="gray.700">
            {/* Menu Items */}
            <MenuItem as={Link} bg="gray.900" color="white" to="/fitness" _hover={{ bg: 'gray.600' }}>
              Virtual Gym
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/Tracker/dashboard" _hover={{ bg: 'gray.600' }}>
              Fitness Tracker
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/Bmi" _hover={{ bg: 'gray.600' }}>
              BMI Calculator
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/catch" _hover={{ bg: 'gray.600' }}>
              Free Fall
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/Memory" _hover={{ bg: 'gray.600' }}>
              Memory Games
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/Aibot" _hover={{ bg: 'gray.600' }}>
              Chatbot
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/Contact" _hover={{ bg: 'gray.600' }}>
              Contact Us
            </MenuItem>
            <MenuItem as={Link} bg="gray.900" color="white" to="/news" _hover={{ bg: 'gray.600' }}>
              News
            </MenuItem>

            <Divider />

            {/* User Authentication (Profile Icon inside Mobile Menu) */}
            <Box p="2">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </Box>
          </MenuList>
        </Menu>
      ) : (
        <Flex alignItems="center" gap="4">
          {/* Desktop Navigation Links */}
          <Button variant="ghost" color={'white'} _hover={{ bg: 'gray.600' }} onClick={handleBooking}>
            Book Appointment
          </Button>

          <Menu>
            <MenuButton as={Button} color={'white'} variant="ghost" _hover={{ bg: 'gray.600' }} rightIcon={<ChevronDownIcon />}>
              Fitness
            </MenuButton>
            <MenuList bg="gray.900" borderColor="gray.700">
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/fitness" _hover={{ bg: 'gray.600' }}>
                Virtual Gym
              </MenuItem>
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/Tracker/dashboard" _hover={{ bg: 'gray.600' }}>
                Fitness Tracker
              </MenuItem>
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/Bmi" _hover={{ bg: 'gray.600' }}>
                BMI Calculator
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} color={'white'} variant="ghost" _hover={{ bg: 'gray.600' }} rightIcon={<ChevronDownIcon />}>
              Games
            </MenuButton>
            <MenuList bg="gray.900" borderColor="gray.700">
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/catch" _hover={{ bg: 'gray.600' }}>
                Free Fall
              </MenuItem>
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/Memory" _hover={{ bg: 'gray.600' }}>
                Memory Games
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} color={'white'} variant="ghost" _hover={{ bg: 'gray.600' }} rightIcon={<ChevronDownIcon />}>
              AI Assistant
            </MenuButton>
            <MenuList bg="gray.900" borderColor="gray.700">
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/Aibot" _hover={{ bg: 'gray.600' }}>
                Chatbot
              </MenuItem>
            </MenuList>
          </Menu>

          <Button color={'white'} variant="ghost" _hover={{ bg: 'gray.600' }}>
            <a href="/Contact">Contact Us</a>
          </Button>

          <Menu>
            <MenuButton as={Button} color={'white'} variant="ghost" _hover={{ bg: 'gray.600' }} rightIcon={<ChevronDownIcon />}>
              News & More
            </MenuButton>
            <MenuList bg="gray.900" borderColor="gray.700">
              <MenuItem as={Link} bg="gray.900" color={'white'} to="/news" _hover={{ bg: 'gray.600' }}>
                News
              </MenuItem>
            </MenuList>
          </Menu>

          {/* User Authentication (Profile Icon for Desktop View) */}
          <Box
            className={`${
              !user ? 'border border-white text-gray-200 hover:bg-gray-100 transition-all duration-300 hover:text-black px-4' : ''
            } py-1 rounded-full mx-4`}
          >
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
