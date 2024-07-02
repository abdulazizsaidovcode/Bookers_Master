import { Text, View } from "@/components/Themed";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import {
  getNumbers,
  putNumbers,
} from "@/helpers/api-function/numberSittings/numbersetting";

const screenWidht = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Welcome = () => {
  const { number, setNumber } = numberSettingStore();

  useEffect(() => {
    if (number.length === 0) {
      putNumbers(1);
    }
    getNumbers(setNumber);
  }, []);

  console.log(number);

  const data = [
    {
      title: "Услуги",
      description: "Ваша специализация и услуги",
      icon: <Feather name="check-circle" size={24} color="white" />,
      onPress: () =>
        router.push("../(standart)/(services)/(myServices)/myServices"),
    },
    {
      title: "График работы",
      description: "Планируйте своё рабочее время",
      icon: <FontAwesome5 name="calendar" size={24} color="white" />,
      onPress: () => router.push("../(work-grafic)/workMain"),
    },
    {
      title: "Локация",
      description: "Ваше мето работы",
      icon: <Entypo name="location" size={24} color="white" />,
      onPress: () => router.push("../(location)/Location"),
    },
    {
      title: "Галерея",
      description: "Создавайте фото и видео галереи своих работ",
      icon: <MaterialIcons name="photo" size={24} color="white" />,
      onPress: () =>
        router.push("../(settings)/(settings-gallery)/settings-gallery-main"),
    },
    {
      title: "Онлайн бронирование",
      description: "Настройте записи на Ваши услуги",
      icon: <FontAwesome6 name="calendar-plus" size={24} color="white" />,
      onPress: () => router.push("../(standart)/(onlineBooking)/onlineBooking"),
    },
    {
      title: "Уведомления",
      description: "Настройте уведомления",
      icon: <Ionicons name="notifications-outline" size={24} color="white" />,
      onPress: () => router.push("../(notifications)/notifications"),
    },
    {
      title: "Клиенты",
      description: "Добавьте своих клинетов",
      icon: <Fontisto name="persons" size={24} color="white" />,
      onPress: () => router.push("../(free)/(client)/main"),
    },
    {
      title: "Помощь",
      description: "Ознакомьтесь с документацией сервиса",
      icon: <AntDesign name="questioncircleo" size={24} color="white" />,
      onPress: () => router.push("(free)/(help)/help"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.progressBar}>
          {[...Array(8)].map((_, index) => (
            <View
              key={index}
              style={
                number.includes(index + 1)
                  ? styles.progressIndicator
                  : styles.progressSegment
              }
            />
          ))}
        </View>
        <View style={styles.centeredView}>
          <Text style={styles.welcomeText}>Добро пожаловать!</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require("../../assets/images/866-536x354.jpg")}
            />
            <View style={styles.editIconContainer}>
              <MaterialIcons name="edit" size={24} color="white" />
            </View>
          </View>
          <Text style={styles.profileName}>Гузаль Шерматова</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              А теперь мы поможем Вам настроить приложение что бы клиенты могли
              начать бронировать Ваши услуги.
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {data.map((item, index) => {
            const isEnabled = number.includes(index + 1);
            return (
              <Pressable
                onPress={item.onPress}
                key={index}
                disabled={!isEnabled}
                style={({ pressed }) => [
                  styles.pressable,
                  {
                    opacity: pressed ? 0.8 : isEnabled ? 1 : 0.5,
                  },
                ]}
              >
                <View style={styles.button}>
                  <View style={styles.iconContainer}>
                    <View style={styles.iconBackground}>{item.icon}</View>
                  </View>
                  <Text style={styles.buttonTitle}>{item.title}</Text>
                  <Text style={styles.buttonDescription}>{item.description}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  scrollView: {
    paddingHorizontal: 10,
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#21212E",
  },
  progressBar: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    height: 5,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 5,
  },
  progressIndicator: {
    flex: 1,
    backgroundColor: "#9C0A35",
    borderRadius: 5,
    marginHorizontal: 1,
  },
  progressSegment: {
    flex: 1,
    backgroundColor: "#8A8A8A",
    borderRadius: 5,
    marginHorizontal: 1,
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: "#21212E",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 50,
  },
  editIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -12,
    right: -8,
    backgroundColor: "#9c0935",
    borderColor: "#21212E",
    borderWidth: 4,
  },
  profileName: {
    fontSize: 24,
    marginTop: 16,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    padding: 16,
    width: "100%",
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: "#b9b9c9",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: "#6e6e6e",
    padding: 8,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    backgroundColor: "#21212e",
  },
  pressable: {
    width: screenWidht / 2.18,
    padding: 8,
  },
  button: {
    borderRadius: 24,
    height: screenHeight / 4.3,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 8,
    backgroundColor: "#b9b9c9",
  },
  iconContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  iconBackground: {
    padding: 17,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9C0A35",
  },
  buttonTitle: {
    fontSize: 18,
    color: "black",
    marginTop: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDescription: {
    fontSize: 14,
    color: "#6e6e6e",
    textAlign: "center",
  },
});
