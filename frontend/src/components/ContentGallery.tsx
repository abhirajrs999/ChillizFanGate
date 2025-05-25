import React from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Button,
  Badge,
  VStack,
  HStack,
  Heading,
  useToast,
  Image,
  Alert,
  AlertIcon,
  Icon,
} from '@chakra-ui/react';
import { FaHeart, FaEye, FaLock } from 'react-icons/fa';
import { useDemo } from '../contexts/DemoContext';

const ContentGallery: React.FC = () => {
  const toast = useToast();
  const { balance, addReward } = useDemo();

  // Mock content data that updates based on user's content creation
  const mockContents = [
    {
      id: 1,
      title: "Amazing Goal Compilation 2024",
      description: "Best goals from this season featuring incredible saves and skills",
      imageUrl: "https://via.placeholder.com/300x200?text=Goal+Video&bg=ff4444&color=white",
      isGated: false,
      minTokensRequired: 0,
      accessLevel: "Public"
    },
    {
      id: 2,
      title: "Exclusive Team Interview",
      description: "Behind the scenes with star players and coaching staff",
      imageUrl: "https://via.placeholder.com/300x200?text=Interview&bg=6644ff&color=white",
      isGated: true,
      minTokensRequired: 100,
      accessLevel: "Premium"
    },
    {
      id: 3,
      title: "VIP Match Analysis",
      description: "Expert tactical breakdown and strategic insights",
      imageUrl: "https://via.placeholder.com/300x200?text=Analysis&bg=ff6644&color=white",
      isGated: true,
      minTokensRequired: 1000,
      accessLevel: "VIP Only"
    },
    {
      id: 4,
      title: "Training Session Highlights",
      description: "Watch the team prepare for the big match",
      imageUrl: "https://via.placeholder.com/300x200?text=Training&bg=44ff66&color=white",
      isGated: true,
      minTokensRequired: 10,
      accessLevel: "Standard"
    }
  ];

  const handleLike = async (contentId: number) => {
    try {
      toast({
        title: '⛓️ Submitting Like to Blockchain...',
        description: 'Processing your like via smart contract',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });

      const txHash = await addReward(1, 'Content Like');

      toast({
        title: 'Content Liked on Blockchain! ❤️',
        description: 'You earned 1 CFG token for your engagement!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        action: (
          <Button 
            size="sm"
            colorScheme="blue"
            onClick={() => window.open(`https://testnet.chiliscan.com/tx/${txHash}`, '_blank')}
          >
            View on ChilizScan 🔍
          </Button>
        ),
      });

    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'Could not process like transaction',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewPremium = (content: any) => {
    if (balance >= content.minTokensRequired) {
      toast({
        title: 'Access Granted! 🎉',
        description: `You have ${balance} CFG tokens. Viewing premium content...`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Insufficient Tokens 🔒',
        description: `You need ${content.minTokensRequired - balance} more CFG tokens to access this content`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getAccessBadge = (content: any) => {
    if (!content.isGated) return { text: 'Public', color: 'green' };
    if (content.minTokensRequired === 10) return { text: 'Standard', color: 'blue' };
    if (content.minTokensRequired === 100) return { text: 'Premium', color: 'purple' };
    if (content.minTokensRequired === 1000) return { text: 'VIP Only', color: 'red' };
    return { text: 'Premium', color: 'gray' };
  };

  const canAccess = (content: any) => {
    return !content.isGated || balance >= content.minTokensRequired;
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center">
        <Heading 
          mb={2}
          bgGradient="linear(45deg, red.400, orange.400, red.600)"
          bgClip="text"
          fontWeight="black"
        >
          Exclusive Fan Content 🎬
        </Heading>
        <Text color="gray.300" fontSize="lg">
          Discover amazing content from fellow fans. Like content to earn CFG tokens via blockchain!
        </Text>
      </Box>

      <Alert 
        status="info"
        bg="rgba(59, 130, 246, 0.1)"
        border="1px solid rgba(59, 130, 246, 0.2)"
        borderRadius="lg"
      >
        <AlertIcon color="blue.400" />
        <Box>
          <Text fontWeight="bold" color="white">🔗 Token-Gated Content System</Text>
          <Text fontSize="sm" color="gray.300">
            Your balance: <Text as="span" color="yellow.400" fontWeight="bold">{balance.toLocaleString()} CFG</Text> 
            {' '}• Like content to earn tokens and unlock premium experiences!
          </Text>
        </Box>
      </Alert>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={8}>
        {mockContents.map((content) => {
          const accessBadge = getAccessBadge(content);
          const hasAccess = canAccess(content);

          return (
            <Card 
              key={content.id} 
              overflow="hidden"
              bg="rgba(255,255,255,0.05)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255,255,255,0.1)"
              _hover={{ 
                transform: 'translateY(-5px) scale(1.02)',
                boxShadow: hasAccess 
                  ? '0 20px 40px rgba(16, 185, 129, 0.2)' 
                  : '0 20px 40px rgba(230, 0, 0, 0.2)',
                border: hasAccess 
                  ? '1px solid rgba(16, 185, 129, 0.3)' 
                  : '1px solid rgba(230, 0, 0, 0.3)'
              }}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              <Box position="relative">
                <Image
                  src={content.imageUrl}
                  alt={content.title}
                  h="200px"
                  w="full"
                  objectFit="cover"
                  filter={!hasAccess ? 'blur(8px) brightness(0.3)' : 'none'}
                />
                {!hasAccess && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    bg="rgba(0,0,0,0.8)"
                    backdropFilter="blur(10px)"
                    color="white"
                    px={6}
                    py={4}
                    borderRadius="lg"
                    textAlign="center"
                    border="1px solid rgba(255,255,255,0.2)"
                  >
                    <Icon as={FaLock} mb={2} w={6} h={6} />
                    <Text fontWeight="bold" fontSize="lg">Premium Content</Text>
                    <Text fontSize="sm" opacity={0.9}>
                      Requires {content.minTokensRequired} CFG tokens
                    </Text>
                    <Text fontSize="xs" color="red.300" mt={1}>
                      You need {content.minTokensRequired - balance} more CFG
                    </Text>
                  </Box>
                )}
                {hasAccess && content.isGated && (
                  <Box
                    position="absolute"
                    top="10px"
                    right="10px"
                    bg="rgba(16, 185, 129, 0.9)"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    ✅ UNLOCKED
                  </Box>
                )}
              </Box>

              <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between" align="start">
                    <Badge 
                      colorScheme={hasAccess ? 'green' : accessBadge.color} 
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {hasAccess ? '✅ ' + accessBadge.text : '🔒 ' + accessBadge.text}
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {Math.floor(Math.random() * 12 + 1)} hours ago
                    </Text>
                  </HStack>

                  <VStack align="start" spacing={2}>
                    <Text 
                      fontWeight="bold" 
                      fontSize="xl" 
                      color="white"
                      lineHeight="shorter"
                    >
                      {content.title}
                    </Text>
                    <Text 
                      fontSize="sm" 
                      color="gray.400"
                      lineHeight="tall"
                    >
                      {content.description}
                    </Text>
                  </VStack>

                  <HStack justify="space-between" fontSize="sm" color="gray.400">
                    <HStack spacing={4}>
                      <HStack>
                        <Icon as={FaEye} />
                        <Text>{Math.floor(Math.random() * 500 + 100)}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaHeart} />
                        <Text>{Math.floor(Math.random() * 150 + 20)}</Text>
                      </HStack>
                    </HStack>
                    <Text>💰 {Math.floor(Math.random() * 20 + 5)} tips</Text>
                  </HStack>

                  <HStack spacing={3}>
                    <Button
                      size="md"
                      colorScheme={hasAccess ? "green" : "red"}
                      flex={1}
                      leftIcon={hasAccess ? <FaEye /> : <FaLock />}
                      onClick={() => hasAccess ? null : handleViewPremium(content)}
                      _hover={{ 
                        transform: 'scale(1.05)',
                      }}
                      transition="all 0.3s"
                    >
                      {hasAccess ? 'View Content' : `Need ${content.minTokensRequired} CFG`}
                    </Button>
                    
                    {hasAccess && (
                      <Button
                        size="md"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleLike(content.id)}
                        leftIcon={<FaHeart />}
                        _hover={{ 
                          bg: 'red.500',
                          transform: 'scale(1.05)',
                          borderColor: 'red.500'
                        }}
                        transition="all 0.3s"
                        fontWeight="bold"
                        borderWidth="2px"
                      >
                        Like (+1 CFG)
                      </Button>
                    )}
                  </HStack>

                  {/* Creator Info */}
                  <HStack 
                    pt={3} 
                    borderTop="1px solid rgba(255,255,255,0.1)"
                    spacing={3}
                  >
                    <Box
                      w={8}
                      h={8}
                      bg={`linear-gradient(45deg, ${['red', 'blue', 'green', 'purple'][Math.floor(Math.random() * 4)]}.400, ${['orange', 'cyan', 'yellow', 'pink'][Math.floor(Math.random() * 4)]}.400)`}
                      borderRadius="full"
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="bold" color="white">
                        FanCreator{content.id}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {hasAccess ? '🔓 Access Granted' : '🔒 Premium Creator'}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Content Stats */}
      <Card 
        bg="rgba(255,255,255,0.05)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255,255,255,0.1)"
        mt={8}
      >
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md" color="white">🎯 Your Access Status</Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="green.400">
                  {mockContents.filter(c => canAccess(c)).length}/{mockContents.length}
                </Text>
                <Text color="gray.400" fontSize="sm">Content Unlocked</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="yellow.400">
                  {balance.toLocaleString()}
                </Text>
                <Text color="gray.400" fontSize="sm">CFG Balance</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.400">
                  {balance >= 1000 ? 'VIP' : balance >= 100 ? 'Premium' : balance >= 10 ? 'Standard' : 'Basic'}
                </Text>
                <Text color="gray.400" fontSize="sm">Access Level</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="purple.400">
                  ∞
                </Text>
                <Text color="gray.400" fontSize="sm">Earning Potential</Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default ContentGallery;