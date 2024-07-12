// TariffsPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { SafeAreaView } from 'react-native-safe-area-context'
import { tariffStore } from '@/helpers/state_managment/tariff/tariff';
import * as SecureStore from "expo-secure-store";


type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(profile)/(tariff)/tariff'>;

const tariffs = [
  {
    unicName: 'free',
    name: 'Тариф бесплатный',
    description: 'Стандартный набор функций',
    price: 'Срок до: 31.12.2024',
    details: ['Бронирование услуг', 'Галерея', 'Предоплата'],
    navigate: '(welcome)/Welcome'
  },
  {
    unicName: 'standard',
    name: 'Тариф STANDART',
    description: 'Продвинутый набор функций',
    price: '49 000 в месяц',
    trial: 'Пробный период доступен на 3 месяца',
    details: ['Бронирование услуг', 'Галерея', 'Предоплата', 'Еще функции'],
    navigate: ''
  },
];

const TariffsPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const [tariffStatus, setTariffStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchTariffStatus = async () => {
      try {
        const storedTariffStatus = await SecureStore.getItemAsync('tariff');
        setTariffStatus(storedTariffStatus);
      } catch (error) {
        console.error('Error fetching tariff status:', error);
      }
    };

    fetchTariffStatus();

    // test uchun clear function, yani storege remove qilib test qilib kurdim
    // const clearSecureStore = async () => {
    //   try {
    //     await SecureStore.deleteItemAsync('tariff');
    //   } catch (error) {
    //     console.log('Error clearing secure store:', error);
    //   }
    // };
    // clearSecureStore()
  }, []);

  const setTariff = async (type: string) => {
    await SecureStore.setItemAsync("tariff", type);
    // console.log('starage ga saqlandi: ', type);
  };

  const handleDisabled = () => {
    if (tariffStatus === 'free') return 'free'
    else if (tariffStatus === 'standard') return 'standard'
    else return 'all'
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <NavigationMenu name='Tarifi' />
        <View >
          {tariffs.map((tariff, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              style={[styles.card, { opacity: handleDisabled() === tariff.unicName ? 1 : handleDisabled() === 'all' ? 1 : .75 }]}
              disabled={handleDisabled() === tariff.unicName ? false : handleDisabled() === 'all' ? false : true}
            >
              <Text style={styles.name}>{tariff.name}</Text>
              <Text style={styles.description}>{tariff.description}</Text>
              <Text style={styles.price}>{tariff.price}</Text>
              {tariff.trial && <Text style={styles.trial}>{tariff.trial}</Text>}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setTariff(tariffStatus === 'all' ? 'all' : tariff.unicName)
                    navigation.navigate(tariff.navigate)
                  }}
                  activeOpacity={.7}
                  disabled={handleDisabled() !== tariff.unicName ? false : handleDisabled() === 'all' ? false : true}
                  style={[styles.activateButton, { opacity: handleDisabled() === tariff.unicName ? 1 : handleDisabled() === 'all' ? 1 : .75 }]}
                >
                  <Text style={styles.buttonText}>Активировать</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={.4}
                  style={styles.detailsButton}
                >
                  <Text style={[styles.buttonText, styles.detailsButtonText]}>Подробнее</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#B9B9C9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginVertical: 5,
    color: '#666',
  },
  price: {
    color: '#666',
  },
  trial: {
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  activateButton: {
    backgroundColor: '#9C0A35',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  detailsButton: {
    backgroundColor: '#B9B9C9',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#9C0A35',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
  },
  detailsButtonText: {
    color: '#9C0A35',
  },
});

export default TariffsPage;
