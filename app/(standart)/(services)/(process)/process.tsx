import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; 
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';

const Process = () => {
     


    const Gender = [
        {
            title: "Мужская для взрослых"
        },
        {
            title: "Мужская для детей"
        }
    ];

    const uslugi = [
        {
            label:"Услуга"
        },
        {
            label: "Цена"
        },
        {
            label:"Длительность (без учёта перерыва после процедуры)"
        },
        {
            label:"Длительность (без учёта перерыва после процедуры)"
        },
    ];

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={tw`flex w-full`}>
                    <NavigationMenu name="Процедура услуг" deleteIcon={true} />
                    <View style={tw`p-3`}>
                        <View style = {[tw`w-full p-4 rounded-3xl mb-4`, {backgroundColor: '#B9B9C9'}]}>
                            <Text style = {tw`text-gray-600`}>Ваша специализация</Text>
                            <Text style = {tw`text-black font-bold text-lg`}>Ваша специализация
                            Парикмахер, Стилист, Специалист по причёскам Специалист по причёскам</Text>
                        </View>
                        {Gender.map((gender, index) => (
                            <ServicesCategory 
                            key={index}
                            title={gender.title} 
                            isRadioButton />
                        ))}
                      <View style = {tw`mt-5 p-2 mb-2`}>
                        {uslugi.map((uslugi , index) => (
                            <LocationInput
                             key={index}
                             label={uslugi.label}
                            />
                        ))}
                        </View>  
                        <View style = {tw`mb-3 p-2`}>
                          <Buttons title='Сохранить'/>  
                        </View>   
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Process;
