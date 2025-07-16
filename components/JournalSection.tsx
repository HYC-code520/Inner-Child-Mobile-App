import { ThemedText } from '@/components/ThemedText';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

interface EmotionalGift {
  id: string;
  type: 'nurturing' | 'validation' | 'safety' | 'reframe';
  title: string;
  message: string;
  icon: string;
}

const emotionalGifts: EmotionalGift[] = [
  // Nurturing Words
  { id: 'n1', type: 'nurturing', title: 'Gentle Comfort', message: 'You can cry. I\'ll sit with you until the storm passes.', icon: '🫂' },
  { id: 'n2', type: 'nurturing', title: 'Safe Space', message: 'Take all the time you need. There\'s no rush here.', icon: '🌙' },
  { id: 'n3', type: 'nurturing', title: 'Warm Embrace', message: 'You\'re doing the best you can, and that\'s enough.', icon: '🤗' },
  
  // Validation Phrases
  { id: 'v1', type: 'validation', title: 'Your Feelings Matter', message: 'It\'s okay to feel this way. Your feelings make sense.', icon: '💙' },
  { id: 'v2', type: 'validation', title: 'You Are Heard', message: 'What you\'re experiencing is real and valid.', icon: '👂' },
  { id: 'v3', type: 'validation', title: 'Permission to Feel', message: 'You have every right to feel exactly as you do.', icon: '✨' },
  
  // Inner Safety
  { id: 's1', type: 'safety', title: 'You Are Safe', message: 'You\'re safe now. I\'m not going anywhere.', icon: '🛡️' },
  { id: 's2', type: 'safety', title: 'Protected Space', message: 'This is your safe space. Nothing can harm you here.', icon: '🏠' },
  { id: 's3', type: 'safety', title: 'Constant Support', message: 'You don\'t have to face this alone. I\'m here.', icon: '🌟' },
  
  // Gentle Reframes
  { id: 'r1', type: 'reframe', title: 'Deep Feeling', message: 'You weren\'t too sensitive — you just felt deeply in a world that didn\'t know how to hold that.', icon: '🌊' },
  { id: 'r2', type: 'reframe', title: 'Strength in Vulnerability', message: 'Your sensitivity is a superpower, not a weakness.', icon: '💎' },
  { id: 'r3', type: 'reframe', title: 'Growing Through Pain', message: 'You\'re not broken — you\'re growing through something difficult.', icon: '🌱' },
];

export default function JournalSection() {
  const [journalEntry, setJournalEntry] = useState('');
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [showGiftIcon, setShowGiftIcon] = useState(false);
  const [showGiftsModal, setShowGiftsModal] = useState(false);
  const [selectedGifts, setSelectedGifts] = useState<EmotionalGift[]>([]);
  const [progress, setProgress] = useState(0);
  const [heartAnimations, setHeartAnimations] = useState<{ id: string; animation: Animated.Value }[]>([]);
  
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const giftIconAnimation = useRef(new Animated.Value(0)).current;

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      Alert.alert('Entry Saved! 📝', 'Your thoughts have been saved safely.', [
        { text: 'OK' }
      ]);
      setJournalEntry('');
      setAiAnalysisComplete(false);
      setShowGiftIcon(false);
      setShowGiftsModal(false);
      setSelectedGifts([]);
      setProgress(0);
      progressAnimation.setValue(0);
      giftIconAnimation.setValue(0);
    } else {
      Alert.alert('Empty Entry', 'Please write something before saving.');
    }
  };

  const simulateAIAnalysis = () => {
    if (!journalEntry.trim()) {
      Alert.alert(
        'No Entry to Analyze 🤔',
        'Please write something in your journal first.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysisComplete(true);
      setShowGiftIcon(true);
      
      // Animate the gift icon appearing
      Animated.spring(giftIconAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }, 2000);
  };

  const giveGift = (gift: EmotionalGift) => {
    if (selectedGifts.find(g => g.id === gift.id)) return; // Already given
    
    const newSelectedGifts = [...selectedGifts, gift];
    setSelectedGifts(newSelectedGifts);
    
    // Update progress (max 4 gifts for full progress)
    const newProgress = Math.min(newSelectedGifts.length / 4, 1);
    setProgress(newProgress);
    
    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: newProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    // Trigger heart animation
    triggerHeartAnimation();
    
    // Close modal first, then show gift message
    setShowGiftsModal(false);
    
    setTimeout(() => {
      Alert.alert(
        `${gift.icon} ${gift.title}`,
        gift.message,
        [{ text: 'Thank you ❤️' }]
      );
    }, 300);
  };

  const triggerHeartAnimation = () => {
    const heartId = Date.now().toString();
    const heartAnimation = new Animated.Value(0);
    
    setHeartAnimations(prev => [...prev, { id: heartId, animation: heartAnimation }]);
    
    Animated.sequence([
      Animated.timing(heartAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      setHeartAnimations(prev => prev.filter(h => h.id !== heartId));
    });
  };

  const getGiftsByType = (type: EmotionalGift['type']) => {
    return emotionalGifts.filter(gift => gift.type === type);
  };

  const isGiftGiven = (giftId: string) => {
    return selectedGifts.some(gift => gift.id === giftId);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Heart Animations */}
      {heartAnimations.map(({ id, animation }) => (
        <Animated.View
          key={id}
          style={[
            styles.heartAnimation,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                  }),
                },
                {
                  scale: animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1.2, 0.8],
                  }),
                },
              ],
            },
          ]}
        >
          <ThemedText style={styles.heartText}>❤️</ThemedText>
        </Animated.View>
      ))}

      {/* Floating Gift Icon */}
      {showGiftIcon && (
        <Animated.View
          style={[
            styles.floatingGiftIcon,
            {
              opacity: giftIconAnimation,
              transform: [
                {
                  scale: giftIconAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.giftIconButton}
            onPress={() => setShowGiftsModal(true)}
          >
            <ThemedText style={styles.giftIconText}>🎁</ThemedText>
            {progress > 0 && (
              <View style={styles.giftIconBadge}>
                <ThemedText style={styles.giftIconBadgeText}>{selectedGifts.length}</ThemedText>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Progress Bar (only show when gifts have been given) */}
      {progress > 0 && (
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressTitle}>Healing Progress</ThemedText>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <ThemedText style={styles.progressText}>
            {Math.round(progress * 100)}% • {selectedGifts.length}/4 gifts given
          </ThemedText>
        </View>
      )}

      {/* Gifts Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showGiftsModal}
        onRequestClose={() => setShowGiftsModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowGiftsModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <ThemedText style={styles.modalTitle}>🎁 Emotional Gifts</ThemedText>
                  <ThemedText style={styles.modalSubtitle}>Choose a gift for your inner child</ThemedText>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowGiftsModal(false)}
                  >
                    <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                  {/* Nurturing Words */}
                  <View style={styles.giftCategory}>
                    <ThemedText style={styles.categoryTitle}>🫂 Nurturing Words</ThemedText>
                    <View style={styles.giftGrid}>
                      {getGiftsByType('nurturing').map(gift => (
                        <TouchableOpacity
                          key={gift.id}
                          style={[
                            styles.giftCard,
                            isGiftGiven(gift.id) && styles.giftCardUsed
                          ]}
                          onPress={() => giveGift(gift)}
                          disabled={isGiftGiven(gift.id)}
                        >
                          <ThemedText style={styles.giftIcon}>{gift.icon}</ThemedText>
                          <ThemedText style={styles.giftTitle}>{gift.title}</ThemedText>
                          {isGiftGiven(gift.id) && (
                            <ThemedText style={styles.checkMark}>✓</ThemedText>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Validation Phrases */}
                  <View style={styles.giftCategory}>
                    <ThemedText style={styles.categoryTitle}>💙 Validation Phrases</ThemedText>
                    <View style={styles.giftGrid}>
                      {getGiftsByType('validation').map(gift => (
                        <TouchableOpacity
                          key={gift.id}
                          style={[
                            styles.giftCard,
                            isGiftGiven(gift.id) && styles.giftCardUsed
                          ]}
                          onPress={() => giveGift(gift)}
                          disabled={isGiftGiven(gift.id)}
                        >
                          <ThemedText style={styles.giftIcon}>{gift.icon}</ThemedText>
                          <ThemedText style={styles.giftTitle}>{gift.title}</ThemedText>
                          {isGiftGiven(gift.id) && (
                            <ThemedText style={styles.checkMark}>✓</ThemedText>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Inner Safety */}
                  <View style={styles.giftCategory}>
                    <ThemedText style={styles.categoryTitle}>🛡️ Inner Safety</ThemedText>
                    <View style={styles.giftGrid}>
                      {getGiftsByType('safety').map(gift => (
                        <TouchableOpacity
                          key={gift.id}
                          style={[
                            styles.giftCard,
                            isGiftGiven(gift.id) && styles.giftCardUsed
                          ]}
                          onPress={() => giveGift(gift)}
                          disabled={isGiftGiven(gift.id)}
                        >
                          <ThemedText style={styles.giftIcon}>{gift.icon}</ThemedText>
                          <ThemedText style={styles.giftTitle}>{gift.title}</ThemedText>
                          {isGiftGiven(gift.id) && (
                            <ThemedText style={styles.checkMark}>✓</ThemedText>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Gentle Reframes */}
                  <View style={styles.giftCategory}>
                    <ThemedText style={styles.categoryTitle}>🌊 Gentle Reframes</ThemedText>
                    <View style={styles.giftGrid}>
                      {getGiftsByType('reframe').map(gift => (
                        <TouchableOpacity
                          key={gift.id}
                          style={[
                            styles.giftCard,
                            isGiftGiven(gift.id) && styles.giftCardUsed
                          ]}
                          onPress={() => giveGift(gift)}
                          disabled={isGiftGiven(gift.id)}
                        >
                          <ThemedText style={styles.giftIcon}>{gift.icon}</ThemedText>
                          <ThemedText style={styles.giftTitle}>{gift.title}</ThemedText>
                          {isGiftGiven(gift.id) && (
                            <ThemedText style={styles.checkMark}>✓</ThemedText>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Dismissible area */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.dismissibleArea} />
      </TouchableWithoutFeedback>

      {/* Bottom content */}
      <View style={styles.bottomContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Dear Inner Child... 💭"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={journalEntry}
            onChangeText={setJournalEntry}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, aiAnalysisComplete && styles.buttonSuccess]}
            onPress={simulateAIAnalysis}
            disabled={aiAnalysisComplete}
          >
            <ThemedText style={styles.buttonText}>
              {aiAnalysisComplete ? '✅ Analysis Complete' : '✨ Analyze & Reframe'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSaveEntry}
          >
            <ThemedText style={styles.buttonText}>💾 Save</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const INPUT_HEIGHT = screenHeight * 0.15; // Back to original size

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dismissibleArea: {
    flex: 1,
  },
  bottomContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    height: INPUT_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 12,
  },
  textInput: {
    height: '100%',
    padding: 16,
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: 'rgba(144, 183, 125, 0.6)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  floatingGiftIcon: {
    position: 'absolute',
    top: '20%',
    right: 20,
    zIndex: 100,
  },
  giftIconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  giftIconText: {
    fontSize: 28,
  },
  giftIconBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftIconBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 80, // Leave space for gift icon
    alignItems: 'center',
    zIndex: 50,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#90B77D',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: screenHeight * 0.8,
  },
  modalHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  modalScrollView: {
    paddingHorizontal: 20,
  },
  giftCategory: {
    marginVertical: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  giftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  giftCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: (screenWidth - 60) / 2, // Two cards per row with spacing
    minHeight: 80,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  giftCardUsed: {
    backgroundColor: 'rgba(144, 183, 125, 0.2)',
    borderColor: '#90B77D',
  },
  giftIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  giftTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
  },
  checkMark: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 16,
    color: '#90B77D',
    fontWeight: 'bold',
  },
  heartAnimation: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    zIndex: 1000,
  },
  heartText: {
    fontSize: 30,
  },
});