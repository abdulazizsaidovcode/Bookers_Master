import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TimesCard from "@/components/grafic/timesCard";
import WeeklCard from "@/components/grafic/weeklCard";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { putWorkTime } from "@/helpers/api-function/graficWork/graficWorkFunctions";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { useFocusEffect, useNavigation } from "expo-router";
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(free)/(work-grafic-edit)/workTimeDetail"
>;

const timeList = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const TimeWorkDetail: React.FC = () => {
  const { weekData, selectedTimeSlot } = graficWorkStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>(); 


  const weekendDays = weekData
    .filter((day) => !day.active)
    .map((day) => day.dayName);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <View style={{ paddingLeft: 10 }}>
        <NavigationMenu name={`Время работы`} />
      </View>
      <ScrollView style={{ marginTop: 15 }}>
        <View>
          <Text style={styles.title}>Рабочие дни</Text>
        </View>
        <View style={styles.weekListContainer}>
          {weekData &&
            weekData.map(
              (item, i) =>
                item.active && (
                  <WeeklCard
                    key={i}
                    title={item.active && item.dayName.substring(0, 3)}
                  />
                )
            )}
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 15 }]}>Время работы</Text>

          <>
            <View style={{}}>
            <Text style={{ color: "white", paddingHorizontal: 15, width: 340 }}>
             {` c ${selectedTimeSlot[0]} до ${selectedTimeSlot[1]}`}
            </Text>
              
              
            </View>
          </>
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 15 }]}>Выходные дни</Text>
          <Text style={{ color: "white", paddingHorizontal: 15, fontSize: 12 }}>
            {weekendDays.length === 0 ? "Без выходных" : weekendDays.join(", ")}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 5,
          marginVertical: 20,
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Buttons
          title="Продолжить"
          onPress={() =>
            putWorkTime(
              +selectedTimeSlot[0].substring(0, 1) === 0
                ? +selectedTimeSlot[0].substring(1, 2)
                : +selectedTimeSlot[0].substring(0, 2),
              +selectedTimeSlot[0].substring(3, 4) === 0
                ? +selectedTimeSlot[0].substring(4, 5)
                : +selectedTimeSlot[0].substring(3, 5),
              +selectedTimeSlot[1].substring(0, 1) === 0
                ? +selectedTimeSlot[1].substring(1, 2)
                : +selectedTimeSlot[1].substring(0, 2),
              +selectedTimeSlot[1].substring(3, 4) === 0
                ? +selectedTimeSlot[1].substring(3, 5)
                : +selectedTimeSlot[1].substring(3, 5),
              () => navigation.navigate("(free)/(work-grafic-edit)/workMain")
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TimeWorkDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
    marginTop: 35,
  },
  title: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  weekListContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  timeListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
});
