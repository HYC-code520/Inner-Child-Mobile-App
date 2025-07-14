import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
// Add Image and ImageSourcePropType to the import
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Image, ImageSourcePropType, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';


// Types for customization options
type CustomizationCategory = {
  id: 'face' | 'pet' | 'accessories' | 'background';
  icon: React.ReactNode;
};

interface CustomizationOption {
  id: string;
  image: ImageSourcePropType; // Use the correct type for images
  selected?: boolean;
}

interface AvatarCustomizerProps {
  onDone: () => void;
  onBack: () => void; // Add this prop
}

// Define a default avatar to show at the start
const defaultAvatar = require('../assets/avatars/face/face-1.png');

// Update avatarOptions with the correct file paths
const avatarOptions = {
  face: [
    { id: 'face-1', image: require('../assets/avatars/face/face-1.png') },
    { id: 'face-2', image: require('../assets/avatars/face/face-2.png') },
    { id: 'face-3', image: require('../assets/avatars/face/face-3.png') },
    { id: 'face-4', image: require('../assets/avatars/face/face-4.png') },
    { id: 'face-5', image: require('../assets/avatars/face/face-5.png') },
    { id: 'face-6', image: require('../assets/avatars/face/face-6.png') },
    { id: 'face-7', image: require('../assets/avatars/face/face-7.png') },
    { id: 'face-8', image: require('../assets/avatars/face/face-8.png') },
    { id: 'face-9', image: require('../assets/avatars/face/face-9.png') },
    { id: 'face-10', image: require('../assets/avatars/face/face-10.png') },
    { id: 'face-11', image: require('../assets/avatars/face/face-11.png') },
    { id: 'face-12', image: require('../assets/avatars/face/face-12.png') },
    { id: 'face-13', image: require('../assets/avatars/face/face-13.png') },
    { id: 'face-14', image: require('../assets/avatars/face/face-14.png') },
    { id: 'face-15', image: require('../assets/avatars/face/face-15.png') },
    { id: 'face-16', image: require('../assets/avatars/face/face-16.png') },
    { id: 'face-17', image: require('../assets/avatars/face/face-17.png') },
    { id: 'face-18', image: require('../assets/avatars/face/face-18.png') },
    { id: 'face-19', image: require('../assets/avatars/face/face-19.png') },
    { id: 'face-20', image: require('../assets/avatars/face/face-20.png') },
    { id: 'face-21', image: require('../assets/avatars/face/face-21.png') },
    { id: 'face-22', image: require('../assets/avatars/face/face-22.png') },
    { id: 'face-23', image: require('../assets/avatars/face/face-23.png') },
    { id: 'face-24', image: require('../assets/avatars/face/face-24.png') },
    { id: 'face-25', image: require('../assets/avatars/face/face-25.png') },
    { id: 'face-26', image: require('../assets/avatars/face/face-26.png') },
    { id: 'face-27', image: require('../assets/avatars/face/face-27.png') },
    { id: 'face-28', image: require('../assets/avatars/face/face-28.png') },
    { id: 'face-29', image: require('../assets/avatars/face/face-29.png') },
    { id: 'face-30', image: require('../assets/avatars/face/face-30.png') },
    { id: 'face-31', image: require('../assets/avatars/face/face-31.png') },
    { id: 'face-32', image: require('../assets/avatars/face/face-32.png') },
    { id: 'face-33', image: require('../assets/avatars/face/face-33.png') },
    { id: 'face-34', image: require('../assets/avatars/face/face-34.png') },
    { id: 'face-35', image: require('../assets/avatars/face/face-35.png') },
    { id: 'face-36', image: require('../assets/avatars/face/face-36.png') },
    { id: 'face-37', image: require('../assets/avatars/face/face-37.png') }
  ],
  pet: [
    { id: 'animal-1', image: require('../assets/avatars/pet/animal-1.png') },
    { id: 'animal-2', image: require('../assets/avatars/pet/animal-2.png') },
    { id: 'animal-3', image: require('../assets/avatars/pet/animal-3.png') },
    { id: 'animal-4', image: require('../assets/avatars/pet/animal-4.png') },
    { id: 'animal-5', image: require('../assets/avatars/pet/animal-5.png') },
    { id: 'animal-6', image: require('../assets/avatars/pet/animal-6.png') }
  ],
  accessories: [
    { id: 'accessories-1', image: require('../assets/avatars/accessories/accessories-1.png') },
    { id: 'accessories-2', image: require('../assets/avatars/accessories/accessories-2.png') },
    { id: 'accessories-3', image: require('../assets/avatars/accessories/accessories-3.png') },
    { id: 'accessories-4', image: require('../assets/avatars/accessories/accessories-4.png') },
    { id: 'accessories-5', image: require('../assets/avatars/accessories/accessories-5.png') },
    { id: 'accessories-6', image: require('../assets/avatars/accessories/accessories-6.png') },
    { id: 'accessories-7', image: require('../assets/avatars/accessories/accessories-7.png') },
    { id: 'accessories-8', image: require('../assets/avatars/accessories/accessories-8.png') },
    { id: 'accessories-9', image: require('../assets/avatars/accessories/accessories-9.png') },
    { id: 'accessories-10', image: require('../assets/avatars/accessories/accessories-10.png') },
    { id: 'accessories-11', image: require('../assets/avatars/accessories/accessories-11.png') },
  ],
  background: [
    { id: 'background-01', image: require('../assets/avatars/background/backgroung-01.png') },
    { id: 'background-02', image: require('../assets/avatars/background/backgroung-02.png') },
    { id: 'background-03', image: require('../assets/avatars/background/backgroung-03.png') }
  ]
};

// 2. Create a function to preload images
const preloadImages = (imageArray: CustomizationOption[]) => {
  imageArray.forEach(item => {
    Image.prefetch(Image.resolveAssetSource(item.image).uri);
  });
};

export default function AvatarCustomizer({ onDone, onBack }: AvatarCustomizerProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof avatarOptions>('face');
  const [isDone, setIsDone] = useState(false);
  
  // Add this state for menu visibility
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  
  // 1. Change the state to track the selected option ID instead of the image
  const [selectedFaceId, setSelectedFaceId] = useState<string>('face-2');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedAccessoryId, setSelectedAccessoryId] = useState<string | null>(null);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string | null>(null);
  
  const currentOptions = avatarOptions[selectedCategory];

  // 2. Get the selected face image based on the ID
  const selectedFace = avatarOptions.face.find(item => item.id === selectedFaceId)?.image || defaultAvatar;
  const selectedPet = avatarOptions.pet.find(item => item.id === selectedPetId)?.image;
  const selectedAccessory = avatarOptions.accessories.find(item => item.id === selectedAccessoryId)?.image;
  
  const selectedBackground = avatarOptions.background.find(item => item.id === selectedBackgroundId)?.image;

  // 3. Preload all face images when component mounts
  useEffect(() => {
    preloadImages(avatarOptions.face);
  }, []);

  // Update categories to include icons
  const categories: CustomizationCategory[] = [
    {
      id: 'face',
      icon: <FontAwesome5 name="smile" size={20} color="black" />
    },
    {
      id: 'pet',
      icon: <FontAwesome5 name="paw" size={20} color="black" />
    },
    {
      id: 'accessories',
      icon: <MaterialCommunityIcons name="bow-tie" size={24} color="black" />
    },
    {
      id: 'background',
      icon: <Ionicons name="color-palette-outline" size={20} color="black" />
    }
  ];

  // Handle done button press
  const handleDone = () => {
    setIsDone(true);
    onDone();
  };

  const handleBack = () => {
    setIsDone(false);
    onBack(); // Call the parent's onBack handler
  };

  const renderCategoryButton = (category: CustomizationCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id as keyof typeof avatarOptions)}
    >
      {/* Replace text with icon */}
      <View style={[
        styles.iconContainer,
        selectedCategory === category.id && styles.iconContainerSelected
      ]}>
        {category.icon}
      </View>
    </TouchableOpacity>
  );

  // 2. Create a handler for when an option is tapped
  const handleSelectOption = (option: CustomizationOption) => {
    console.log('Selected option:', option.id); // Add this for debugging
    if (selectedCategory === 'face') {
      setSelectedFaceId(option.id);
    }
    else if (selectedCategory === 'pet') {
      setSelectedPetId(option.id);
    }
    else if (selectedCategory === 'accessories') {
      setSelectedAccessoryId(option.id);
    }
    else if (selectedCategory === 'background') {
      setSelectedBackgroundId(option.id);
    }
    // Later, you can add else-if blocks for other categories
  };

  // We will call this function inside a .map() instead of passing it to FlatList
  const renderOption = ({ item }: { item: CustomizationOption }) => (
    // 3. Update the TouchableOpacity to call the handler
    <TouchableOpacity
      style={[
        styles.optionButton,
        // Add a style to highlight the selected option
        (item.id === selectedFaceId || item.id === selectedPetId || item.id === selectedAccessoryId || item.id === selectedBackgroundId) && styles.optionButtonSelected
      ]}
      onPress={() => handleSelectOption(item)}
    >
      <Image
        source={item.image}
        style={[
          styles.optionImage,
          selectedCategory === 'background' && { resizeMode: 'cover' },
        ]}
      />
    </TouchableOpacity>
  );

  // Add this function to handle navigation
  const handleJournalHistoryPress = () => {
    setIsMenuVisible(false); // Close menu
    router.push('/(tabs)/journal-history'); // Navigate to journal history screen
  };

  return (
    <View style={[styles.container, isDone && styles.containerEnlarged]}>
      {/* Menu Button */}
      <TouchableOpacity
        style={[
          styles.menuButton,
          isDone && styles.menuButtonEnlarged
        ]}
        onPress={() => setIsMenuVisible(true)}
      >
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <Pressable 
          style={styles.menuOverlay}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={styles.menuContent}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleJournalHistoryPress}
            >
              <Ionicons name="book-outline" size={24} color="black" />
              <ThemedText style={[styles.menuItemText, { color: '#000' }]}>Journal History</ThemedText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Preview Area */}
      <View style={[
        styles.previewArea,
        isDone && styles.previewAreaEnlarged
      ]}>
        {/* Top Bar Buttons - Conditionally Rendered */}
        {!isDone ? (
          <>
            <TouchableOpacity style={styles.randomButton}>
              <Ionicons name="shuffle" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={handleDone}
            >
              <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
            <TouchableOpacity 
              style={[styles.backButton, styles.backButtonEnlarged]}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
        )}
        
        {/* Background Image - Rendered first so it appears behind everything */}
        {selectedBackground && (
          <Image
            source={selectedBackground}
            style={[
              styles.backgroundPreview,
              isDone && styles.backgroundPreviewEnlarged
            ]}
            resizeMode="cover"
            fadeDuration={0}
          />
        )}
        
        {/* Avatar and Pet/Accessory Images */}
        <Image 
          source={selectedFace} 
          style={[styles.avatarPreview, isDone && styles.avatarPreviewEnlarged]} 
          resizeMode="contain"
          fadeDuration={0}
        />
        {selectedPet && (
          <Image
            source={selectedPet}
            style={styles.petPreview}
            resizeMode="contain"
            fadeDuration={0}
          />
        )}
        {selectedAccessory && (
          <Image
            source={selectedAccessory}
            style={styles.accessoryPreview}
            resizeMode="contain"
            fadeDuration={0}
          />
        )}
      </View>

      {/* Only show these sections if not done */}
      {!isDone && (
        <>
          {/* Category Buttons */}
          <View style={styles.categoryBar}>
            {categories.map((category) => renderCategoryButton(category))}
          </View>

          {/* Re-introduce FlatList inside a container with a fixed height */}
          <View style={styles.optionsContainer}>
            <FlatList
              data={currentOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.id}
              numColumns={4}
              showsVerticalScrollIndicator={true} // Show a scrollbar
              contentContainerStyle={styles.optionsGridContent}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  randomButtonText: {
    color: '#000000',  // This will make the text black
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerEnlarged: {
    marginHorizontal: 0,
    marginTop: -60, // Compensate for the top padding from the parent
  },
  randomButton: {
    position: 'absolute',
    bottom: 20,
    right: 12,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    zIndex: 1,
  },
  doneButton: {
    position: 'absolute',
    top: 20, // Increased from 12 to 20
    right: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    zIndex: 1,
  },
  doneButtonText: {
    color: '#fff',
  },
  previewArea: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderRadius: 16,
    position: 'relative',
  },
  previewAreaEnlarged: {
    height: 740, // Increased height when done
    // width: '100%',
    borderRadius: 0,
    marginBottom: 0,
  },
  avatarPreview: {
    width: '70%', // Use percentage to be responsive
    height: '70%',
    resizeMode: 'contain',
    // marginBottom: -250, // Add negative margin to pull it down // Ensure the whole avatar is visible
    // Remove backgroundColor to avoid flashing
  },
  petPreview: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '25%',
    height: '45%',
  },
  accessoryPreview: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    width: '30%',
    height: '30%',
  },
  backgroundPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  backgroundPreviewEnlarged: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 850, // Use viewport height
    borderRadius: 0,
  },
  avatarPreviewEnlarged: {
    width: '75%',
    height: '75%',
  },
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5, // Reduced from 12
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 0, 
  },
  categoryButton: {
    padding: 2, // Reduced from 12
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#90B77D', // Matcha green (was #FFB6C1)
  },
  iconContainer: {
    width: 32, // Reduced from 40
    height: 20, // Reduced from 40
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, // Half of width/height
    backgroundColor: '#FFF',
  },
  iconContainerSelected: {
    backgroundColor: '#90B77D', // Matcha green (was #FFB6C1)
  },
  categoryButtonText: {
    fontSize: 14,
  },
  optionsContainer: {
    height: 180, // Adjust this value to make the scrollable area taller or shorter
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
  },
  
  // This style is for the content inside the FlatList
  optionsGridContent: {
    padding: 4,
  },

  // Adjust optionButton style for FlatList's numColumns
  optionButton: {
    width: '22%', // Set a fixed percentage width
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#90B77D',
    padding: 4,
    backgroundColor: '#FFF',
  },

  // Keep the optionImage style
  optionImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#90B77D',
    resizeMode: 'contain',
    fadeDuration: 0, // Remove fade animation
  },
  backButton: {
    position: 'absolute',
    top: 20, // Increased from 12 to 20
    right: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    zIndex: 1,
  },
  backButtonEnlarged: {
    top: 80, // Move down below safe area when enlarged
    right: 20, // Give it a bit more margin from the edge
  },
  backButtonText: {
    color: '#90B77D',
    fontSize: 16,
  },
  // 5. Add a style for the selected option button
  optionButtonSelected: {
    borderColor: '#42855B', // Use a darker green to indicate selection
    borderWidth: 3,
  },
  preloader: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  preloadImage: {
    width: 1,
    height: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#000',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  menuButtonEnlarged: {
    top: 80, // Compensate for the -60 marginTop in containerEnlarged
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    marginTop: 80, // Position below the menu button
    marginLeft: 12,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#000', // Add this line to make the text black
  },
});