import AppointmentCard from "@/components/(cards)/appointment-card";
import {RootStackParamList} from "@/type/root";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import tw from "tailwind-react-native-classnames";
import {FlatList, RefreshControl, ScrollView, StatusBar, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {getUpcomingClient} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {handleRefresh} from "@/constants/refresh";
import {clientIdStore} from "@/constants/storage";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/upcoming-history'>;

const UpcomingHistory = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {clientID} = route.params;
    const {upcomingData, setUpcomingData, refreshing, setRefreshing} = clientStore()
    const [serviceName, setServiceName] = useState(null);

    useEffect(() => {
        getUpcomingClient(setUpcomingData, clientID)
    }, []);

    useEffect(() => {
        let list;
        upcomingData && upcomingData.map(item => {
            list = item.serviceName.split(', ')
        })
        setServiceName(list ? list : null)
    }, [upcomingData])

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, []);

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} showHideTransition={`fade`}/>
            <NavigationMenu name={`Предстоящие записи`}/>
            <View style={tw`flex-1`}>
                {upcomingData ? (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24, gap: 16}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    >
                        <FlatList
                            data={upcomingData}
                            renderItem={({item}) => (
                                <AppointmentCard
                                    userID={clientID}
                                    data={item}
                                    serviceName={serviceName ? serviceName : ['']}
                                    isBtn={item.orderStatus === 'WAIT'}
                                    clicks={() => {
                                        navigation.navigate('(free)/(client)/details/history/history-details', {historyData: item})
                                        clientIdStore(clientID)
                                    }}
                                />
                            )}
                        />
                    </ScrollView>
                ) : (
                    <View style={[tw`flex-1 items-center justify-center`]}>
                        <Text style={[tw`text-base font-bold text-white`, {opacity: .7}]}>Информация недоступна</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default UpcomingHistory;