import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { useFocusEffect } from '@react-navigation/native';

const HomeView: React.FC = () => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const shuffleAnim = useRef(new Animated.Value(0)).current;
  const letterShuffleAnims = useRef([] as Animated.Value[]).current;

  const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const createLetterShuffleAnimations = () => {
    const letters = 'Bem-Vindo ao seu Cadastro de Veículos';
    const animations = [];

    for (let i = 0; i < letters.length; i++) {
      const anim = new Animated.Value(0);
      animations.push(anim);
    }

    return animations;
  };

  useEffect(() => {
    letterShuffleAnims.length = 0;
    letterShuffleAnims.push(...createLetterShuffleAnimations());

    return () => {
      letterShuffleAnims.forEach(anim => anim.removeAllListeners());
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fadeInAnimation = Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      });

      const slideAnimation = Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      });

      const startAnimations = Animated.sequence([fadeInAnimation, slideAnimation]);

      startAnimations.start(() => {
        startShuffleAnimation();
      });

      return () => {
        fadeInAnim.setValue(0);
        slideAnim.setValue(100);
        shuffleAnim.setValue(0);
      };
    }, []),
  );

  const startShuffleAnimation = () => {
    Animated.timing(shuffleAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      letterShuffleAnims.forEach((anim, index) => {
        animateLetterShuffle(anim, index);
      });
    });
  };

  const animateLetterShuffle = (anim: Animated.Value | Animated.ValueXY, index: number) => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: getRandomNumber(500, 1000),
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  const shuffleStyle = {
    transform: [
      {
        translateX: shuffleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getRandomNumber(-100, 100)],
        }),
      },
      {
        translateY: shuffleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getRandomNumber(-100, 100)],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={{ ...styles.title, opacity: fadeInAnim }}>
        Bem-Vindo
      </Animated.Text>
      <Animated.Text style={{ ...styles.subtitle, transform: [{ translateY: slideAnim }] }}>
        ao seu Cadastro de Veículos
      </Animated.Text>
      {letterShuffleAnims.map((anim, index) => (
        <Animated.Text
          key={index}
          style={{
            ...styles.shuffleText,
            ...shuffleStyle,
            transform: [
              {
                translateX: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, getRandomNumber(-20, 20)],
                }),
              },
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, getRandomNumber(-20, 20)],
                }),
              },
            ],
          }}
        >
          {index === 0 ? 'B' : 'em-Vindo ao seu Cadastro de Veículos'[index]}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    color: '#42a5f5',
  },
  shuffleText: {
    fontSize: 24,
    color: '#42a5f5',
    position: 'absolute',
  },
});

export default HomeView;
