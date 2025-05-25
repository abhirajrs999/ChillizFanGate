import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Button,
  Grid,
  GridItem,
  keyframes,
  Icon,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { FaRocket, FaCoins, FaUsers, FaShieldAlt, FaLink } from 'react-icons/fa';
import Dashboard from './Dashboard';
import ContentCreator from './ContentCreator';
import ContentGallery from './ContentGallery';
import { useDemo } from '../contexts/DemoContext';

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(230, 0, 0, 0.3); }
  50% { box-shadow: 0 0 30px rgba(230, 0, 0, 0.6), 0 0 40px rgba(230, 0, 0, 0.3); }
  100% { box-shadow: 0 0 20px rgba(230, 0, 0, 0.3); }
`;

const Layout: React.FC = () => {
  const { isConnected: wagmiConnected } = useAccount();
  const { isConnected: demoConnected, connect } = useDemo();
  
  // Use demo connection for demo mode
  const isConnected = demoConnected || wagmiConnected;
  
  const bgGradient = "linear(135deg, gray.900 0%, gray.800 25%, gray.900 50%, red.900 75%, gray.900 100%)";

  return (
    <Box 
      minH="100vh" 
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="100px"
        h="100px"
        bgGradient="radial(circle, red.400, transparent)"
        borderRadius="full"
        animation={`${float} 6s ease-in-out infinite`}
        opacity={0.3}
      />
      <Box
        position="absolute"
        top="20%"
        right="10%"
        w="150px"
        h="150px"
        bgGradient="radial(circle, blue.400, transparent)"
        borderRadius="full"
        animation={`${float} 8s ease-in-out infinite reverse`}
        opacity={0.2}
      />
      <Box
        position="absolute"
        bottom="15%"
        left="15%"
        w="80px"
        h="80px"
        bgGradient="radial(circle, green.400, transparent)"
        borderRadius="full"
        animation={`${float} 7s ease-in-out infinite`}
        opacity={0.3}
      />

      {/* Header */}
      <Box 
        bg="rgba(0,0,0,0.3)" 
        backdropFilter="blur(20px)"
        borderBottom="1px solid rgba(255,255,255,0.1)"
        position="sticky"
        top={0}
        zIndex={999}
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Box animation={`${glow} 3s ease-in-out infinite`} borderRadius="lg">
                <Heading 
                  size="lg" 
                  bgGradient="linear(45deg, red.400, orange.400, red.600)"
                  bgClip="text"
                  fontWeight="black"
                  letterSpacing="wider"
                >
                  ⚽ ChilizFanGate
                </Heading>
              </Box>
              <Badge 
                colorScheme="green" 
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="wide"
                bg="linear-gradient(45deg, #00ff88, #00cc6a)"
                animation={`${float} 4s ease-in-out infinite`}
              >
                🌐 Chiliz Spicy Testnet
              </Badge>
              <Badge 
                colorScheme="blue" 
                variant="outline"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                borderColor="blue.400"
                color="blue.400"
              >
                Chain ID: 88882
              </Badge>
            </HStack>
            <Box transform="scale(1.05)" transition="all 0.3s">
              {/* Show demo connect button if not connected */}
              {!isConnected ? (
                <Button
                  onClick={connect}
                  bgGradient="linear(45deg, red.500, red.600)"
                  _hover={{ 
                    bgGradient: "linear(45deg, red.400, red.500)",
                    transform: 'scale(1.05)'
                  }}
                  color="white"
                  fontWeight="bold"
                  px={6}
                  py={3}
                  borderRadius="xl"
                >
                  🔗 Connect Wallet
                </Button>
              ) : (
                <ConnectButton />
              )}
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8} position="relative" zIndex={1}>
        {isConnected ? (
          <Tabs 
            colorScheme="red" 
            variant="soft-rounded"
            bg="rgba(0,0,0,0.2)"
            borderRadius="2xl"
            p={6}
            backdropFilter="blur(20px)"
            border="1px solid rgba(255,255,255,0.1)"
          >
            <TabList 
              justifyContent="center" 
              bg="rgba(0,0,0,0.3)"
              borderRadius="xl"
              p={2}
              mb={8}
            >
              <Tab 
                _selected={{ 
                  bg: 'linear-gradient(45deg, red.500, red.600)',
                  color: 'white',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(230, 0, 0, 0.4)'
                }}
                borderRadius="lg"
                mx={2}
                transition="all 0.3s"
                fontWeight="bold"
              >
                📊 Dashboard
              </Tab>
              <Tab 
                _selected={{ 
                  bg: 'linear-gradient(45deg, red.500, red.600)',
                  color: 'white',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(230, 0, 0, 0.4)'
                }}
                borderRadius="lg"
                mx={2}
                transition="all 0.3s"
                fontWeight="bold"
              >
                📝 Create Content
              </Tab>
              <Tab 
                _selected={{ 
                  bg: 'linear-gradient(45deg, red.500, red.600)',
                  color: 'white',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(230, 0, 0, 0.4)'
                }}
                borderRadius="lg"
                mx={2}
                transition="all 0.3s"
                fontWeight="bold"
              >
                🎬 Explore
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel><Dashboard /></TabPanel>
              <TabPanel><ContentCreator /></TabPanel>
              <TabPanel><ContentGallery /></TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <VStack spacing={12} textAlign="center" py={20} position="relative">
            
            {/* Hero Section */}
            <VStack spacing={6}>
              <Box animation={`${float} 5s ease-in-out infinite`}>
                <Heading 
                  size="3xl" 
                  bgGradient="linear(45deg, red.400, orange.400, red.600, yellow.400)"
                  bgClip="text"
                  fontWeight="black"
                  letterSpacing="wider"
                  textShadow="0 0 40px rgba(230, 0, 0, 0.3)"
                >
                  Welcome to ChilizFanGate! 🎉
                </Heading>
              </Box>
              
              <Text 
                fontSize="xl" 
                color="gray.200" 
                maxW="700px"
                lineHeight="tall"
                textShadow="0 2px 4px rgba(0,0,0,0.5)"
              >
                Connect your wallet to access <Text as="span" color="red.400" fontWeight="bold">exclusive fan content</Text>, 
                earn tokens through engagement, and unlock <Text as="span" color="yellow.400" fontWeight="bold">premium experiences</Text> on the Chiliz blockchain.
              </Text>
              
              {/* Blockchain Feature Highlight */}
              <Box 
                bg="rgba(59, 130, 246, 0.1)"
                border="2px solid rgba(59, 130, 246, 0.3)"
                borderRadius="xl"
                p={4}
                maxW="600px"
              >
                <HStack justify="center" spacing={4}>
                  <Icon as={FaLink} color="blue.400" w={6} h={6} />
                  <VStack spacing={1}>
                    <Text color="white" fontWeight="bold">
                      Powered by Chiliz Blockchain
                    </Text>
                    <Text color="gray.300" fontSize="sm">
                      EVM-compatible • Low gas fees • Sports-focused infrastructure
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>

            {/* Feature Cards Grid */}
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={8}
              w="full"
              maxW="1000px"
            >
              <GridItem>
                <Box
                  bg="rgba(255,255,255,0.05)"
                  backdropFilter="blur(20px)"
                  borderRadius="2xl"
                  p={8}
                  border="1px solid rgba(255,255,255,0.1)"
                  _hover={{ 
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(230, 0, 0, 0.2)',
                    border: '1px solid rgba(230, 0, 0, 0.3)'
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                >
                  <VStack spacing={4}>
                    <Icon as={FaShieldAlt} w={12} h={12} color="red.400" />
                    <Heading size="md" color="white">Token-Gated Content</Heading>
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                      Access exclusive content based on your fan token holdings with blockchain security
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  bg="rgba(255,255,255,0.05)"
                  backdropFilter="blur(20px)"
                  borderRadius="2xl"
                  p={8}
                  border="1px solid rgba(255,255,255,0.1)"
                  _hover={{ 
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(255, 193, 7, 0.2)',
                    border: '1px solid rgba(255, 193, 7, 0.3)'
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                >
                  <VStack spacing={4}>
                    <Icon as={FaCoins} w={12} h={12} color="yellow.400" />
                    <Heading size="md" color="white">Earn CFG Tokens</Heading>
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                      Get CFG tokens on Chiliz blockchain for creating content and community engagement
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  bg="rgba(255,255,255,0.05)"
                  backdropFilter="blur(20px)"
                  borderRadius="2xl"
                  p={8}
                  border="1px solid rgba(255,255,255,0.1)"
                  _hover={{ 
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                >
                  <VStack spacing={4}>
                    <Icon as={FaRocket} w={12} h={12} color="blue.400" />
                    <Heading size="md" color="white">Smart Contracts</Heading>
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                      Automated token rewards and access control via Chiliz smart contracts
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  bg="rgba(255,255,255,0.05)"
                  backdropFilter="blur(20px)"
                  borderRadius="2xl"
                  p={8}
                  border="1px solid rgba(255,255,255,0.1)"
                  _hover={{ 
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                >
                  <VStack spacing={4}>
                    <Icon as={FaUsers} w={12} h={12} color="green.400" />
                    <Heading size="md" color="white">Decentralized Community</Heading>
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                      Connect with sports fans in a truly decentralized Web3 ecosystem
                    </Text>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>

            {/* Blockchain Stats */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} w="full" maxW="800px">
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="red.400">50+</Text>
                <Text color="gray.300" fontSize="sm">CFG per Content</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="yellow.400">10</Text>
                <Text color="gray.300" fontSize="sm">Daily Reward</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.400">88882</Text>
                <Text color="gray.300" fontSize="sm">Chain ID</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="green.400">∞</Text>
                <Text color="gray.300" fontSize="sm">Fan Experiences</Text>
              </Box>
            </Grid>

            {/* CTA */}
            <VStack spacing={4}>
              <Button
                onClick={connect}
                size="lg"
                bgGradient="linear(45deg, red.500, red.600)"
                _hover={{ 
                  bgGradient: "linear(45deg, red.400, red.500)",
                  transform: 'scale(1.05)',
                  boxShadow: '0 10px 30px rgba(230, 0, 0, 0.4)'
                }}
                transition="all 0.3s"
                borderRadius="xl"
                px={12}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                animation={`${glow} 2s ease-in-out infinite`}
              >
                🚀 Connect to Chiliz & Start Earning
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={() => window.open('https://testnet.chiliscan.com/', '_blank')}
                leftIcon={<Icon as={FaLink} />}
              >
               View on ChilizScan Block Explorer
             </Button>
           </VStack>
         </VStack>
       )}
     </Container>
   </Box>
 );
};

export default Layout;