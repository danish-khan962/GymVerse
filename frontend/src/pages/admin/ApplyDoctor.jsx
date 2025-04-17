import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useToast,
  Flex,
  Heading,
  VStack,
  Divider,
  Select,
  Image
} from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';

const ApplyDoctor = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.emailAddresses[0]?.emailAddress,
    phone: '',
    calId:'',
    qualifications: '',
    experience: '',
    specialization: 'Trichologist',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [PDFName, setPDFName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      console.log({ file, profileImage, imagePreview }) 
      reader.onloadend = () => {
        setImagePreview(reader.result);
      } ;
      reader.readAsDataURL(file);
    }
  };



  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfDocument(file);
      setPDFName(file?.name)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('qualifications', formData.qualifications);
    data.append('experience', formData.experience);
    data.append('calId', formData.calId)
    data.append('specialization', formData.specialization);

    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    if (pdfDocument) {
      data.append('pdfDocument', pdfDocument);
    }

    axios
      .post(`https://gymverseassignment.onrender.com/create-profile/${user.id}`, data)
      .then(() => {
        toast({
          title: 'Application submitted successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'You have already applied',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Box
      maxW="4xl"
      mx="auto"
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      bg="gray.900"
      color={'white'}
      borderColor={'gray.600'}
    >
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">
          Apply to Become a Doctor
        </Heading>

        <form onSubmit={handleSubmit}>
          <Flex direction={{ base: 'column', md: 'row' }} spacing={6} gap={4}>
            <Box
              flex={1}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="gray.900"
              borderColor={'gray.600'}
            >
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    borderColor={'gray.600'}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    borderColor={'gray.600'}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isDisabled={true}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    borderColor={'gray.600'}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Cal Id</FormLabel>
                  <Input
                    borderColor={'gray.600'}
                    type="text"
                    name="calId"
                    value={formData.calId}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Qualifications</FormLabel>
                  <Textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    borderColor={'gray.600'}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Experience</FormLabel>
                  <Textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    borderColor={'gray.600'}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Specialization</FormLabel>
                  <Select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                  >
                    <option className="text-black" value="Trichologist">
                      Trichologist
                    </option>
                    <option className="text-black" value="Dermatologist">
                      Dermatologist
                    </option>
                    <option className="text-black" value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                    <option className="text-black" value="Neurologist">
                      Neurologist
                    </option>
                    <option className="text-black" value="General Physician">
                      General Physician
                    </option>
                    <option className="text-black" value="ENT">
                      ENT
                    </option>
                    <option className="text-black" value="Psychiatrist">
                      Psychiatrist
                    </option>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            <Box
              flex={1}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="gray.900"
              borderColor={'gray.600'}
            >
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel color="white">Profile Image</FormLabel>
                  <Input
                    borderColor={'gray.600'}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    display="none" // Hide the default file input
                    id="profileImageInput"
                  />
                  <Button
                    as="label"
                    htmlFor="profileImageInput"
                    colorScheme="gray"
                    variant="outline"
                    borderColor="gray.600"
                    color="white"
                    _hover={{ bg: 'gray.700' }}
                  >
                    Choose Profile Image
                  </Button>
                  {imagePreview && <Image src={imagePreview} />}
                </FormControl>

                <FormControl>
                  <FormLabel color="white">Your Degree and Certification</FormLabel>
                  <Input
                    borderColor={'gray.600'}
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    display="none" // Hide the default file input
                    id="pdfDocumentInput"
                  />
                  <Button
                    as="label"
                    htmlFor="pdfDocumentInput"
                    colorScheme="gray"
                    variant="outline"
                    borderColor="gray.600"
                    color="white"
                    _hover={{ bg: 'gray.700' }}
                  >
                    Choose PDF Document
                  </Button>
                  <Box bg={'gray.700'} border={'1px'} width={'fit-content'} borderColor={'gray.500'} p={1} rounded={10} m={2}>{PDFName}</Box>
                </FormControl>
              </Stack>
            </Box>
          </Flex>

          <Divider my={6} />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            w="full"
            mt={4}
            isLoading={isSubmitting} // Chakra UI's built-in loading state handling
            isDisabled={isSubmitting} // Disable the button when submitting
          >
            Submit Application
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default ApplyDoctor;
