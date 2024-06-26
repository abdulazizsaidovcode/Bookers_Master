import registerStory from '@/helpers/state_managment/auth/register';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserInfo2 = () => {
    const { nickname, setNickname } = registerStory();
    // const [nickname, setNickname] = useState('');
    console.log(nickname);

    const handleSkip = () => {
        // Nickname ni bo'sh qilib belgilash
        setNickname('');
        // Navigate to the next page
        router.push('(auth)/userCameraInfo');
    };

    const handleContinue = () => {
        // Navigate to the next page
        router.push('(auth)/userCameraInfo');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressIndicator} />
                    <View style={styles.progressSegment} />
                    <View style={styles.progressSegment1} />
                    <View style={styles.progressSegment2} />
                </View>
                <Text style={styles.label}>Ваш никнейм</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nick name"
                    placeholderTextColor="#8A8A8A"
                    value={nickname}
                    onChangeText={setNickname}
                />
            </View>
            <View style={styles.bottomSection}>
                {nickname.length === 0 ? (
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>Пропустить</Text>
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        { backgroundColor: nickname.length > 0 ? '#9C0A35' : '#8A8A8A' },
                    ]}
                    onPress={handleContinue}
                    disabled={nickname.length === 0}
                >
                    <Text style={styles.continueButtonText}>Продолжить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 20,
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
    },
    progressBar: {
        flexDirection: 'row',
        height: 5,
        marginTop: 40,
        borderRadius: 5,
    },
    progressIndicator: {
        flex: 1,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: '#9C0A35',
        marginLeft: 5,
        borderRadius: 5,
    },
    progressSegment1: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
    },
    progressSegment2: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#4B4B64',
        backgroundColor: '#4B4B64',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
    bottomSection: {
        justifyContent: 'flex-end',
    },
    skipButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    skipButtonText: {
        color: '#9C0A35',
        fontSize: 16,
    },
    continueButton: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default UserInfo2;
