import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CenteredModal from '@/components/(modals)/modal-centered'
import { AntDesign } from '@expo/vector-icons'
import Textarea from '@/components/select/textarea'

interface IProps {
    masterName: string,
    salonName: string,
    masterGender: string,
    ratingnumber: number,
    money: string,
    titleTex?: string[], // majburiy emas
    buttonName: string,
    Adress: string
    locationIcon?: React.ReactNode
    phoneIcon?: React.ReactNode
    deleteIcon?: React.ReactNode
}

const ProfileCard: React.FC<IProps> = ({
    masterName,
    salonName,
    masterGender,
    ratingnumber,
    money,
    titleTex = [],
    buttonName,
    Adress,
    locationIcon,
    phoneIcon,
    deleteIcon }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [textAreaValue, setTextAreaValue] = useState('')
    const deleteToggleModal = () => {
        setDeleteModal(!deleteModal);
    };
    const handleChange = (e: string) => {
        const trimmedValue = e.trim();
        const regex = /^[a-zA-Z0-9а-яА-ЯёЁ.,!?;:()\s]+$/

        if (regex.test(trimmedValue) && !/\s\s+/.test(e)) setTextAreaValue(e)
        else if (e === '') setTextAreaValue('')
    };
    return (
        <View style={styles.card}>
            <View style={styles.profileContainer}>
                <View style={styles.profileRow}>
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileImage} />
                    <View>
                        <View style={styles.profileDetails}>
                            <Text style={styles.profileName}>{masterName}</Text>
                            <Text style={styles.salonName}>{salonName}</Text>
                        </View>
                        <Text style={styles.serviceName}>{masterGender}</Text>
                    </View>
                </View>
                <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackStars}>{'⭐'.repeat(ratingnumber > 5 ? 5 : ratingnumber)}</Text>
                    <Text style={styles.price}>{money}</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                {titleTex.map((title, index) => (
                    <Text key={index} style={styles.titleText}>{title}</Text>
                ))}
            </View>
            <Text style={styles.address}>{Adress}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.messageButton}

                >
                    <Text style={styles.messageButtonText}>{buttonName}</Text>
                </TouchableOpacity>
                {locationIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
                        {locationIcon}
                    </TouchableOpacity>
                )}
                {phoneIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
                        {phoneIcon}
                    </TouchableOpacity>
                )}
                {deleteIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton} onPress={deleteToggleModal}>
                        {deleteIcon}
                    </TouchableOpacity>
                )}
            </View>
            <CenteredModal
                isFullBtn={true}
                btnWhiteText={'Отмена'}
                btnRedText={'Да'}
                isModal={deleteModal}
                toggleModal={deleteToggleModal}
            >
                <>
                    <AntDesign name="delete" size={56} color="#9C0A35" />
                    <Text style={styles.deleteText}>
                        Вы хотите очистить все уведомлении?
                    </Text>
                </>
            </CenteredModal>
            <CenteredModal
                isFullBtn={false}
                btnWhiteText={'Отправить'}
                btnRedText={'Закрыть'}
                isModal={true}
                toggleModal={deleteToggleModal}
            >
                <>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: 40 }}>Оцените работу мастера!</Text>
                    <Textarea
                        placeholder='Оставьте отзыв'
                        value={textAreaValue}
                        onChangeText={e=>handleChange(e)}
                    />
                </>
            </CenteredModal>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    profileRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    profileDetails: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    profileName: {
        fontSize: 14,
        fontWeight: '600',
    },
    salonName: {
        fontSize: 8,
        color: '#666',
        borderColor: "#828282",
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 16,
        padding: 4,
    },
    serviceName: {
        fontSize: 12,
        color: '#4F4F4F',
    },
    feedbackContainer: {
        alignItems: 'flex-end',
    },
    feedbackStars: {
        fontSize: 10,
        color: '#9C0A35',
    },
    price: {
        fontSize: 12,
        color: '#9C0A35',
        marginTop: 8,
        fontWeight: '600',
    },
    titleContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
    },
    titleText: {
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderColor: '#828282',
        color: '#828282',
        borderRadius: 5,
        borderWidth: 1,
    },
    address: {
        fontSize: 12,
        color: '#828282',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    messageButton: {
        paddingHorizontal: 30,
        paddingVertical: 8,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    messageButtonText: {
        color: 'white',
    },
    iconButton: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#9C0A35',
        marginRight: 8,
    },
    deleteText: {
        color: '#494949',
        fontSize: 12,
        marginVertical: 20,
    },
});
