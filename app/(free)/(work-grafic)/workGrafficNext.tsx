import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ServicesCategory from "@/components/services/servicesCatgegory";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { Item } from "@/type/graficWork/graficWork";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { getWorkDay, postWorkDay } from "@/helpers/api-function/graficWork/graficWorkFunctions";
import CalendarGrafficEdit from "./components/calendar";
import Toast from "react-native-simple-toast";
import { RootStackParamList } from "@/type/root";
import { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import WorkDays from "./components/workDays";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import Explanations from "@/components/(explanations)/explanations";
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(free)/(work-grafic)/workGrafficNext"
>;

const WorkGrafficNext: React.FC = () => {
  const {
    calendarDate,
    setWeek,
    week,
    weekData,
    setIsLoading,
    isLoading,
    setGetMee,
    setWeekData
  } = graficWorkStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const [items, setItems] = useState<Item[]>([
    { id: 1, dayValue: "monday", dayName: "Понедельник", active: false },
    { id: 2, dayValue: "tuesday", dayName: "Вторник", active: false },
    { id: 3, dayValue: "wednesday", dayName: "Среда", active: false },
    { id: 4, dayValue: "thursday", dayName: "Четверг", active: false },
    { id: 5, dayValue: "friday", dayName: "Пятница", active: false },
    { id: 6, dayValue: "saturday", dayName: "Суббота", active: false },
    { id: 7, dayValue: "sunday", dayName: "Воскресенье", active: false },
  ]);

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee);
      getWorkDay(setWeekData, setIsLoading);
      return () => { };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const updatedItems = items.map((item) => {
        const isWeekDataActive = weekData.some(
          (weekItem) =>
            weekItem.dayName.toLowerCase() === item.dayValue.toLowerCase() &&
            weekItem.active
        );
        return { ...item, active: isWeekDataActive || item.active };
      });
      setItems(updatedItems);
      return () => { };
    }, [weekData])
  );



  const handleContinuePress = () => {
    if (!week.some((day) => day.active)) {
      Toast.show(
        "Пожалуйста, выберите дату начала работы и хотя бы один рабочий день.",
        Toast.LONG
      );
      return;
    }

    postWorkDay(
      week,
      calendarDate,
      () => { },
      setIsLoading
    );
    navigation.navigate("(free)/(work-grafic)/workTime")
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#21212E" barStyle="light-content" />
          <View style={{ paddingLeft: 10 }}>
            <NavigationMenu name="График работы" />
          </View>
          <View style={styles.section}>
            <Explanations text="Выберите дату с которой Вы начнёте работу" />

            <View style={styles.fullHeightSection}>
              <WorkDays />
              <View style={{ padding: 10 }}>
                <Buttons title="Продолжить" onPress={handleContinuePress} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default WorkGrafficNext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
  },
  section: {
    paddingHorizontal: 15,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  fullHeightSection: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 15,
  },
  categoriesContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
});
