import tw from "tailwind-react-native-classnames";
import {ScrollView, StatusBar, Text, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {clientsData} from "@/type/client/client";
import {FromAddressBookList} from "@/components/clients/client-items";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {Ionicons} from "@expo/vector-icons";
import LocationInput from "@/components/(location)/locationInput";

const AddressBook = () => {
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Из адресной книги`}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <View style={tw`mb-5`}>
                            <LocationInput placeholder={`🔍 Поиск клиента по имени`} />
                        </View>
                        {clientsData.map(client => (
                            <FromAddressBookList
                                key={client.id}
                                client={client}
                            />
                        ))}
                    </View>
                    <View style={tw`pb-5`}>
                        <IconsButtons
                            name={`Добавить`}
                            icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AddressBook;