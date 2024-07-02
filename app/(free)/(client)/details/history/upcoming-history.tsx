import AppointmentCard from "@/components/(cards)/appointment-card";
import {RootStackParamList} from "@/type/root";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import tw from "tailwind-react-native-classnames";
import {ScrollView, StatusBar, View} from "react-native";
import React, {useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {getUpcomingClient} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/history/upcoming-history'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/upcoming-history'>;

const data = [
    {id: 1, name: 'aaaasertga'},
    {id: 2, name: 'bbsdrthgbb'},
    {id: 3, name: 'ccdscc'},
    {id: 4, name: 'dddsgdd'},
    {id: 5, name: 'eegdfee'},
    {id: 6, name: 'jikgddsu'},
    {id: 7, name: 'estdgfgfa'},
    {id: 8, name: 'eassdgtfgw'},
]

const UpcomingHistory = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {clientID} = route.params;
    const {upcomingData, setUpcomingData} = clientStore()

    useEffect(() => {
        getUpcomingClient(setUpcomingData, clientID)
    }, []);

    console.log('upcoming 36: ', upcomingData)
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Предстоящие записи`}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24, gap: 16}}
                >
                    <AppointmentCard data={data}/>
                    <AppointmentCard data={data} isBtn/>
                    <AppointmentCard data={data} isBtn/>
                    <AppointmentCard data={data}/>
                    <AppointmentCard data={data} isBtn/>
                    <AppointmentCard data={data}/>
                    <AppointmentCard data={data}/>
                    <AppointmentCard data={data} isBtn/>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default UpcomingHistory;