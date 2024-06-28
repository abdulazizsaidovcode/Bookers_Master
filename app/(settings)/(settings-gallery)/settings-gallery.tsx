import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Switch,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationInput from "@/components/(location)/locationInput";
import Buttons from "@/components/(buttons)/button";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import {
  addData,
  fetchData,
} from "@/helpers/api-function/gallery/settings-gallery";
import useGalleryStore from "@/helpers/state_managment/gallery/settings-gallery";
import NavigationMenu from "@/components/navigation/navigation-menu";

const { width, height } = Dimensions.get("window");

const SettingsGallery: React.FC = () => {
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const [selectedImageIndices, setSelectedImageIndices] = useState<number[]>(
    []
  );
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
  const [showMainSwitch, setShowMainSwitch] = useState<boolean>(false);
  const [albumName, setAlbumName] = useState<string>("");

  const { data, setData } = useGalleryStore();

  useEffect(() => {
    fetchData(setData);
  }, []);

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, { uri: result.assets[0].uri }]);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map((asset) => ({ uri: asset.uri }));
      setImages([...images, ...newImages]);
    }
  };

  const toggleModal = () => setShowCheckboxes(!showCheckboxes);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  const handleMainImageSelect = (index: number) => setMainImageIndex(index);

  const deleteSelectedImage = () => {
    if (selectedImageIndices.length > 0) {
      const updatedImages = images.filter(
        (_, index) => !selectedImageIndices.includes(index)
      );
      setImages(updatedImages);
      setSelectedImageIndices([]);
      setMainImageIndex(null);
      setShowCheckboxes(false);
      setShowMainSwitch(false);
    }
  };

  const saveAlbum = async () => {
    if (!albumName || images.length === 0 || mainImageIndex === null) {
      Alert.alert(
        "Please ensure all fields are filled and an image is selected."
      );
      return;
    }

    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append("photos", {
        uri: image.uri,
        type: "image/jpeg",
        name: `image_${index}.jpg`,
      });
    });

    formData.append("mainPhoto", {
      uri: images[mainImageIndex].uri,
      type: "image/jpeg",
      name: `main_image.jpg`,
    });

    formData.append("albumName", albumName);

    try {
      await addData(formData, albumName);
      Alert.alert("Album saved successfully!");
    } catch (error) {
      Alert.alert("Failed to save album. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <NavigationMenu
            name="Создать альбом"
            deleteIcon
            toggleModal={toggleModal}
          />
        </View>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>Фото галерея</Text>
            <View style={{ marginTop: 10 }}>
              <LocationInput
                placeholder="Название альбома"
                labalVisible={true}
                onChangeText={setAlbumName}
              />
            </View>
            {images.length > 0 && (
              <>
                <View style={styles.imageRow}>
                  {images.map((image, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onLongPress={() => setShowMainSwitch(true)}
                      onPress={() => showCheckboxes && handleImageSelect(index)}
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: image.uri }}
                          style={styles.image}
                        />
                        {showCheckboxes && (
                          <View style={styles.checkIcon}>
                            <MaterialIcons
                              name={
                                selectedImageIndices.includes(index)
                                  ? "check-circle"
                                  : "radio-button-unchecked"
                              }
                              size={24}
                              color="#9C0A35"
                            />
                          </View>
                        )}
                        {showMainSwitch && (
                          <TouchableWithoutFeedback
                            onPress={() => handleMainImageSelect(index)}
                          >
                            <View style={styles.mainCheckIcon}>
                              <MaterialIcons
                                name={
                                  mainImageIndex === index
                                    ? "check-circle"
                                    : "radio-button-unchecked"
                                }
                                size={24}
                                color="#9C0A35"
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
                {images.length > 0 && showCheckboxes && (
                  <View style={styles.switchContainer}>
                    <View style={{ width: "50%" }}>
                      <Buttons
                        title="Удалить выбранные"
                        textSize={15}
                        onPress={deleteSelectedImage}
                      />
                    </View>
                    <View style={{ width: "50%" }}>
                      <Buttons
                        title="Назад"
                        backgroundColor="white"
                        textColor="#9C0A35"
                        textSize={15}
                        onPress={() => {
                          setShowCheckboxes(false);
                          setSelectedImageIndices([]);
                          setShowMainSwitch(false);
                        }}
                      />
                    </View>
                  </View>
                )}
                {showMainSwitch && (
                  <View style={styles.mainSwitchContainer}>
                    <Text style={styles.mainSwitchLabel}>
                      Сделать фото основным
                    </Text>
                    <Switch
                      value={mainImageIndex !== null}
                      onValueChange={() => setShowMainSwitch(!showMainSwitch)}
                    />
                  </View>
                )}
              </>
            )}
            <View style={{ marginTop: 10 }}>
              <View style={{ width: 200 }}>
                <Buttons
                  icon={<Feather name="upload-cloud" size={20} color="white" />}
                  title={`Загрузить фото`}
                  onPress={pickImageFromGallery}
                />
              </View>
              <View style={{ width: 180, marginTop: 10 }}>
                <Buttons
                  icon={
                    <Ionicons name="camera-outline" size={20} color="white" />
                  }
                  title={` Сделать фото`}
                  onPress={pickImageFromCamera}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Buttons
            title={`Сохранить`}
            onPress={saveAlbum}
            // isDisebled={
            //   images.length === 0 || albumName === "" || mainImageIndex === null
            // }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
  },
  title: {
    color: "white",
    fontSize: 27,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    margin: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width / 3 - 25,
    height: height / 7,
    borderRadius: 15,
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  mainCheckIcon: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  switchLabel: {
    color: "white",
    marginRight: 10,
  },
  mainSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  mainSwitchLabel: {
    color: "white",
    marginRight: 10,
    fontSize: 16,
  },
});
