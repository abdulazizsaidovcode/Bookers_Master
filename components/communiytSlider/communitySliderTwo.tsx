import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import { useCommunitySlider } from '@/helpers/state_managment/communitySlider/communitySliderStore';

const { width } = Dimensions.get('window');

interface DistanceSliderProps {
    title: string;
    textColor: string; // yangi props qo'shildi
}

const CommunitySlider: React.FC<DistanceSliderProps> = ({ title, textColor }) => { 
    const {rating,setRating}=useCommunitySlider()
    return (
        <View style={styles.container}>
            <View style={styles.value}>
                <Text style={{ fontSize: 16, color: textColor }} >
                    <AntDesign name="star" size={18} color="#9C0A35" />
                    {rating.toFixed(0)} {title}</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5}
                step={1}
                value={rating}
                onValueChange={setRating}
                minimumTrackTintColor="#8B1A1A"
                maximumTrackTintColor="#fff"
                thumbTintColor="#8B1A1A"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: width * 0.8, // to fit most screens
        alignItems: 'center',
    },
    value: {
        fontSize: 14,
        color: '#8B1A1A',
        position: 'absolute',
        top: 12,
        left: 25,
    },
    slider: {
        fontWeight: '800',
        width: '100%',
        height: 30,
        marginTop: 40,
        marginBottom: -14,
    },
});

export default CommunitySlider;
