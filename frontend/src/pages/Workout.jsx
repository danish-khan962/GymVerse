import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Flex,
    VStack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker'; // Assuming you're using react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Add the necessary CSS
import { createWorkout, getWorkout } from '../utils/fetchData';
import { useUser } from '@clerk/clerk-react';
import { startOfWeek, endOfWeek } from 'date-fns'; // Import date-fns for date manipulation

const Workout = () => {
    const { user } = useUser()
    const toast = useToast();
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [duration, setDuration] = useState(0);
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [workoutDate, setWorkoutDate] = useState(new Date());
    const [pastWorkouts, setPastWorkouts] = useState([])

    const workoutTypes = [
        { type: 'Running', caloriesPerMinute: 10 },
        { type: 'Cycling', caloriesPerMinute: 8 },
        { type: 'Swimming', caloriesPerMinute: 7 },
        { type: 'Walking', caloriesPerMinute: 3.8 },
        { type: 'Jogging', caloriesPerMinute: 7 },
        { type: 'Pushups', caloriesPerMinute: 8 },
        { type: 'Deadlift', caloriesPerMinute: 6 },
        { type: 'Jumpingrope', caloriesPerMinute: 12 },
        { type: 'Aerobics', caloriesPerMinute: 6.5 },
        { type: 'Hiking', caloriesPerMinute: 7 },
        { type: 'Weightlifting', caloriesPerMinute: 3 },
        { type: 'Yoga', caloriesPerMinute: 2.5 },
        { type: 'Dancing', caloriesPerMinute: 5 },
        { type: 'Rowing', caloriesPerMinute: 7 },
        { type: 'Boxing', caloriesPerMinute: 8 },
        { type: 'Tennis', caloriesPerMinute: 7 },
        { type: 'Basketball', caloriesPerMinute: 6.5 },
        { type: 'Soccer', caloriesPerMinute: 7 },
        { type: 'Skiing', caloriesPerMinute: 6 },
        { type: 'Climbing', caloriesPerMinute: 8 },
        { type: 'Elliptical', caloriesPerMinute: 5 },
        { type: 'Pilates', caloriesPerMinute: 3 },
        { type: 'Zumba', caloriesPerMinute: 5 },
        { type: 'Squats', caloriesPerMinute: 5 },
        { type: 'Benchpress', caloriesPerMinute: 3.5 },
        { type: 'Deadlifts', caloriesPerMinute: 6 },
        { type: 'Pullups', caloriesPerMinute: 4.5 },
        { type: 'Bicepcurls', caloriesPerMinute: 3 },
        { type: 'Tricepdips', caloriesPerMinute: 4 },
        { type: 'Legpress', caloriesPerMinute: 4 },
        { type: 'Lunges', caloriesPerMinute: 5 },
        { type: 'Shoulderpress', caloriesPerMinute: 4 },
        { type: 'Plank', caloriesPerMinute: 3 },
        { type: 'Legcurls', caloriesPerMinute: 3.5 },
        { type: 'Calfraises', caloriesPerMinute: 3 },
        { type: 'Chestfly', caloriesPerMinute: 4 },
        { type: 'Latpulldown', caloriesPerMinute: 3.5 },
        { type: 'Cablerows', caloriesPerMinute: 4 },
        { type: 'Russiantwists', caloriesPerMinute: 3.5 },
        { type: 'Battleropes', caloriesPerMinute: 6 },
        { type: 'Kettlebellswings', caloriesPerMinute: 6 },
        { type: 'Burpees', caloriesPerMinute: 8 },
        { type: 'Poweryoga', caloriesPerMinute: 4 },
        { type: 'Resistancetraining', caloriesPerMinute: 6 },
        { type: 'Kettlebellexercises', caloriesPerMinute: 6 },
        { type: 'Spinclass', caloriesPerMinute: 8.5 },
        { type: 'Stepaerobics', caloriesPerMinute: 7.5 },
        { type: 'Trxtraining', caloriesPerMinute: 6 },
        { type: 'Treadmillrunning', caloriesPerMinute: 9.8 },
        { type: 'Treadmillwalking', caloriesPerMinute: 3.8 },
        { type: 'Hiit', caloriesPerMinute: 8 },
        { type: 'Circuittraining', caloriesPerMinute: 8 }
    ];


    // Calculate start and end of the current week (Monday to Sunday)
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as the start
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); // Sunday as the end

    const handleDurationChange = (e) => {
        const value = e.target.value;
        if (value < 0) {
            setDuration(0)
        } else {

            setDuration(value);
            calculateCalories(value, selectedWorkout);
        }
    };

    const handleWorkoutTypeChange = (workoutType) => {
        setSelectedWorkout(workoutType);
        calculateCalories(duration, workoutType); // Update the calories when workout type is selected
    };

    const calculateCalories = (duration, workoutType) => {
        const selected = workoutTypes.find((wt) => wt.type === workoutType);
        if (selected) {
            const totalCalories = duration * selected.caloriesPerMinute;
            setCaloriesBurned(totalCalories);
        }
    };

    const fetchWorkout = useCallback(async () => {
        try {
            const response = await getWorkout(user?.id);
            setPastWorkouts(response);
        } catch (error) {
            toast({
                title: 'Failed to load past workouts',
                description: error?.response?.data?.message || 'Something went wrong while fetching workouts.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    }, [user?.id]);


    const handleSubmit = useCallback(async () => {
        const data = { userId: user?.id, caloriesBurned, workoutDate, duration, workoutType: selectedWorkout };

        // Show loading toast
        const loadingToastId = toast({
            title: 'Posting workout...',
            description: "Your workout is being added.",
            status: 'loading',
            duration: null, // Ensure it stays until dismissed
            isClosable: true,
        });

        try {
            // Post the workout
            await createWorkout(data)
                .then((respo) => {
                    // Dismiss the loading toast once workout is successfully posted
                    toast.close(loadingToastId);

                    // Show success toast
                    toast({
                        title: 'Workout posted successfully!',
                        description: "Your workout has been saved.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });

                    // Fetch updated workouts
                    fetchWorkout();
                })
                .catch((error) => {
                    // Dismiss the loading toast in case of error
                    toast.close(loadingToastId);

                    // Show error toast
                    toast({
                        title: 'Error',
                        description: error?.response?.data?.message || 'Something went wrong. Please try again.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });

        } catch (error) {
            // Dismiss the loading toast in case of a failure in the try block
            toast.close(loadingToastId);

            console.error('Failed to post workout or fetch workout', error);
        }
    }, [caloriesBurned, duration, selectedWorkout, fetchWorkout, toast, user?.id, workoutDate]);


    useEffect(() => {
        fetchWorkout();  // Ensure initial fetch of workouts
    }, [user?.id, fetchWorkout]);


    return (
        <Box p={8} color="white">
            <Heading mb={8} textAlign="center">
                Workout
            </Heading>
            <Flex direction={['column', 'row']} justify="space-between">
                {/* Left side: Form */}
                <Box flex={1} mr={[0, 8]} mb={[8, 0]}>
                    <Heading size="md" mb={4}>
                        Post New Workout
                    </Heading>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Calories Burned</FormLabel>
                            <Input value={caloriesBurned} isDisabled={true} placeholder='Will be calculated automatically' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <Input
                                type="number"
                                value={duration}
                                onChange={handleDurationChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Box
                                bg="gray.900" // Set the background color to gray.900
                                borderRadius="md"
                                p={2}
                            >
                                <DatePicker
                                    selected={workoutDate}
                                    onChange={(date) => setWorkoutDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    maxDate={new Date()}  // Disable future dates
                                    filterDate={(date) =>
                                        date >= startOfCurrentWeek && date <= endOfCurrentWeek
                                    }  // Restrict to current week
                                    customInput={<Input bg="gray.900" color="white" />}  // Customize input appearance
                                />
                            </Box>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Workout Type</FormLabel>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    {selectedWorkout ? selectedWorkout : 'Select workout type'}
                                </MenuButton>
                                <MenuList bg={'gray.900'} maxHeight={'300px'} overflowY={'scroll'}>
                                    {workoutTypes.map((workout) => (
                                        <MenuItem
                                            bg={'gray.900'}
                                            _hover={{ bg: 'gray.700' }}
                                            key={workout.type}
                                            onClick={() => handleWorkoutTypeChange(workout.type)}
                                        >
                                            {workout.type}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </FormControl>

                        <Button colorScheme="teal" onClick={handleSubmit}>
                            Post Workout
                        </Button>

                    </VStack>
                </Box>

                {/* Right side: Past Workouts */}
                <Box flex={1} bg="gray.700" p={6} borderRadius="md">
                    <Heading size="md" mb={4}>
                        Past Workouts
                    </Heading>
                    <Box maxHeight={'500px'} overflowY={'scroll'}>
                        {pastWorkouts ? (
                            pastWorkouts.length > 0 ? (
                                pastWorkouts.map((workout, index) => (
                                    <Box
                                        key={index}
                                        bg="gray.600"
                                        p={4}
                                        mb={4}
                                        borderRadius="md"
                                        boxShadow="md"
                                    >
                                        <Text>Date: {workout.date.split('T')[0]}</Text>
                                        <Text>Workout Type: {workout.workoutType}</Text>
                                        <Text>Duration: {workout.duration} minutes</Text>
                                        <Text>Calories Burned: {workout.caloriesBurned}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Text>No past workouts</Text>
                            )
                        ) : (
                            <Text>Loading...</Text>
                        )}

                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Workout;
