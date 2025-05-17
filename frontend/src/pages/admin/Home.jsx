import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Flex,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  VStack,
  Heading,
  Text,
  Box,
  Button,
  Select,
  useToast,
  Container,
  SimpleGrid,
  Divider,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useAuth } from "@clerk/clerk-react";
import { userProfile, updateDoctorProfile } from "../../utils/fetchData";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaStethoscope,
} from "react-icons/fa";

const ProfilePage = () => {
  const toast = useToast();
  const bgColor = useColorModeValue("gray.700", "gray.800");
  const cardBg = useColorModeValue("gray.800", "gray.700");
  const textColor = useColorModeValue("white", "gray.100");
  const borderColor = useColorModeValue("gray.800", "gray.600");

  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profileImg: "",
    name: "",
    email: "",
    experience: "",
    qualifications: "",
    specialization: "",
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await userProfile(token, user?.id);

      setProfileData(response);
      setFormData({
        profileImg: response.doctorId.profileImg,
        name: response.doctorId.name,
        email: response.email,
        experience: response.doctorId.experience,
        qualifications: response.doctorId.qualifications,
        specialization: response.doctorId.specialization,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [getToken, user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsEditing(true);
  };

  const handleEditProfile = async () => {
    console.log("Edited Profile Data:", formData);
    const token = await getToken();
    const responsePromise = updateDoctorProfile(token, user?.id, formData);
    toast.promise(responsePromise, {
      error: { title: "There was an error updating your profile" },
      loading: { title: "Your profile is updating" },
      success: { title: "Profile Updated successfully" },
    });
    const response = await responsePromise;
    console.log(response);
  };

  if (!isLoaded || !profileData) {
    return (
      <Flex justify="center" align="center" height="100vh" bg={bgColor}>
        <Spinner size="xl" color="white" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  return (
    <>
      {profileData?.isDoctor === true && (
        <Container maxW={["100%", "100%", "90%", "80%"]} py={8} px={[4, 6, 8]}>
          <Heading
            color={textColor}
            textAlign="center"
            fontSize={["xl", "2xl", "3xl"]}
            mb={8}
          >
            Doctor Profile
          </Heading>

          <Box
            bg={cardBg}
            p={[4, 6, 8]}
            rounded="lg"
            shadow="xl"
            borderWidth="1px"
            borderColor={borderColor}
            mx="auto"
          >
            <SimpleGrid columns={[1, 1, 2]} spacing={8} mb={8}>
              <Flex
                direction="column"
                align={["center", "center", "flex-start"]}
                justify="center"
                p={5}
                bg={bgColor}
                rounded="md"
                shadow="md"
              >
                <Avatar
                  src={formData.profileImg}
                  size={["xl", "2xl"]}
                  mb={4}
                  border="4px solid"
                  borderColor="blue.400"
                />
                <VStack align={["center", "center", "flex-start"]} spacing={1}>
                  <Heading color={textColor} size="lg">
                    Dr. {formData.name}
                  </Heading>
                  <Text color="blue.300" fontWeight="medium">
                    {formData.specialization || "Specialist"}
                  </Text>
                  <Text color="gray.300" fontSize="sm">
                    {formData.email}
                  </Text>
                </VStack>
              </Flex>

              <VStack
                align="flex-start"
                spacing={4}
                p={5}
                bg={bgColor}
                rounded="md"
                shadow="md"
              >
                <Heading size="md" color={textColor}>
                  Professional Details
                </Heading>
                <Divider borderColor={borderColor} />
                <SimpleGrid columns={[1, 2]} spacing={4} w="100%">
                  <Box>
                    <Text fontWeight="bold" color="blue.300">
                      Specialization
                    </Text>
                    <Text color={textColor}>
                      {formData.specialization || "Not specified"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="blue.300">
                      Experience
                    </Text>
                    <Text color={textColor}>
                      {formData.experience || "Not specified"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="blue.300">
                      Qualifications
                    </Text>
                    <Text color={textColor}>
                      {formData.qualifications || "Not specified"}
                    </Text>
                  </Box>
                </SimpleGrid>
              </VStack>
            </SimpleGrid>

            <Box p={5} bg={bgColor} rounded="md" shadow="md" mb={6}>
              <Heading size="md" color={textColor} mb={4}>
                Edit Profile Information
              </Heading>
              <Divider borderColor={borderColor} mb={6} />

              <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                <FormControl>
                  <FormLabel color={textColor}>Full Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaUser} color="blue.400" />
                    </InputLeftElement>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="1px solid"
                      borderColor="gray.500"
                      color={textColor}
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                      _hover={{ borderColor: "blue.300" }}
                      pl={10}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="blue.400" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="1px solid"
                      borderColor="gray.500"
                      color={textColor}
                      isDisabled={true}
                      pl={10}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Experience</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaBriefcase} color="blue.400" />
                    </InputLeftElement>
                    <Input
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="1px solid"
                      borderColor="gray.500"
                      color={textColor}
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                      _hover={{ borderColor: "blue.300" }}
                      pl={10}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Qualifications</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaGraduationCap} color="blue.400" />
                    </InputLeftElement>
                    <Input
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="1px solid"
                      borderColor="gray.500"
                      color={textColor}
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                      _hover={{ borderColor: "blue.300" }}
                      pl={10}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl gridColumn={[null, null, "span 2"]}>
                  <FormLabel color={textColor}>Specialization</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaStethoscope} color="blue.400" />
                    </InputLeftElement>
                    <Select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="1px solid"
                      borderColor="gray.500"
                      color={textColor}
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                      _hover={{ borderColor: "blue.300" }}
                      pl={10}
                    >
                      <option value="">Select Specialization</option>
                      <option value="Trichologist">Trichologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Gastroenterologist">
                        Gastroenterologist
                      </option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="General Physician">
                        General Physician
                      </option>
                      <option value="ENT">ENT</option>
                      <option value="Psychiatrist">Psychiatrist</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </SimpleGrid>

              <Flex justify="center" mt={8}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleEditProfile}
                  isDisabled={!isEditing}
                  px={8}
                  fontWeight="bold"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                >
                  Update Profile
                </Button>
              </Flex>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ProfilePage;
