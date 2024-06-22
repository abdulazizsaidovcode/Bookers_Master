import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-galery';
import { getFile } from '@/helpers/api';
import { fetchData } from '@/helpers/api-function/gallery/settings-galery';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-galery-main'>;

const SettingsGaleryMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { data, setData } = useGalleryStore();

    useEffect(() => {
        fetchData(setData);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <NavigationMenu name='Моя галерея' />
                </View>
                <View style={styles.content}>
                    <View style={{ height: '83%' }}>
                        <Text style={styles.title}>Фото галерея</Text>
                        {data.length === 0 ?
                            <Text style={styles.description}>Ваша галерея пустая, добавьте фотографии из проводника Вашего телефона</Text>
                            :
                            <View style={styles.imageGrid}>
                                {data.map((item, index) => (
                                    <View>
                                        <View style={{ flexDirection: 'row', width: 170, flexWrap: 'wrap' }}>
                                            {item.resGalleryAttachments.map((attachment, attIndex) => (
                                                <View key={attIndex} style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri: getFile + attachment.attachmentId }}
                                                        style={styles.image}
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                        <View>
                                            <Text style={{ color: 'white', margin: 5 }}>{item.albumName}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        }
                    </View>
                    <View style={{ height: '17%' }}>
                        {data.length === 0 ?
                            <Buttons onPress={() => navigation.navigate('(settings)/(settings-galery)/settings-galery')} icon={<AntDesign name="pluscircleo" size={20} color="white" />} title='Создать альбом' />
                            :
                            <Buttons onPress={() => navigation.goBack()} title='На главную' />}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default SettingsGaleryMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    content: {
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 27,
    },
    description: {
        width: 330,
        fontSize: 15,
        color: 'white',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    imageContainer: {
        margin: 5,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 10,
    },
});
