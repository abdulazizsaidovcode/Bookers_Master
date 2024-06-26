import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import MyServicesCard from '@/components/services/myServicesCard';
import { getHelp } from '@/helpers/api-function/help/help';
import heplStore from '@/helpers/state_managment/help/helpStore';


const HelpFree = () => {
    const { setHelpDate} = heplStore()

    const services = [
        {
            title: "О сервисе",
            onPress: () => {getHelp(setHelpDate, "ABOUT_SERVICE", "/aboutUs")}
        },
        {
            title: "Оферта",
            onPress: () => {getHelp(setHelpDate, "OFFER", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Политика конфиденциальности",
            onPress: () => {getHelp(setHelpDate, "PRIVACY_POLICY", "/aboutUs")}
            // onPress: () => { router.push('/offer') }
        },
        {
            title: "Лицензионное соглашение",
            onPress: () => {getHelp(setHelpDate, "LICENSE_AGREEMENT", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Лицензии",
            onPress: () => {getHelp(setHelpDate, "LICENSES", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => {getHelp(setHelpDate, "CERTIFICATES", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Использование приложения",
            onPress: () => {getHelp(setHelpDate, "USING_APPLICATION", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Спецификация услуги",
            onPress: () => {getHelp(setHelpDate, "SERVICE_SPECIFICATION", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Условия эксплуатации",
            onPress: () => {getHelp(setHelpDate, "TERMS_OF_USE", "/aboutUs")}
            // onPress: () => { router.push('/certificate') }
        },
    ];

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Помощь`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style = {[tw``, {backgroundColor:'#21212E'}]}>
                        <View style={[tw`mb-5`,{backgroundColor:'#21212E'}]}>
                            {services.map((service, index) => (   
                                <MyServicesCard key={index}
                                    title={service.title}
                                    onPress={service.onPress}
                                />
                            ))}
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default HelpFree;
