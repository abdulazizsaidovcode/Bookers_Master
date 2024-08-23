import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

type ServiceFormProps = {
  servicePricesOrName?: string[];
  inputText: string;
  btnText?: string;
};

const ServiceForm: React.FC<ServiceFormProps> = ({ servicePricesOrName = [], inputText, btnText }) => {
  const [servicePrice, setServicePrice] = useState<string>('');
  const [showPriceDropdown, setShowPriceDropdown] = useState<boolean>(false);

  return (
    <View style={tw`flex-1 justify-center`}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[tw`flex-row items-center justify-between rounded-xl p-3 mb-3`, { backgroundColor: '#4B4B64' }]}
        onPress={() => setShowPriceDropdown(!showPriceDropdown)}
      >
        <Text
          style={[
            tw`${servicePrice ? 'text-xl font-bold' : 'text-sm'}`,
            { color: servicePrice ? 'white' : '#828282' },
          ]}
        >
          {servicePrice ? servicePrice : inputText}
        </Text>
        <Ionicons
          name={showPriceDropdown ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="gray"
          style={tw`ml-2`}
        />
      </TouchableOpacity>

      {showPriceDropdown && (
        <View style={styles.dropdown}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            style={styles.scrollView}
            nestedScrollEnabled
          >
            {servicePricesOrName.map((price) => (
              <TouchableOpacity
                key={price}
                style={[
                  styles.priceItem,
                  price === servicePrice && styles.selectedPriceItem,
                ]}
                onPress={() => {
                  setServicePrice(price);
                  setShowPriceDropdown(false);
                }}
              >
                <Text style={styles.priceText}>{price}</Text>
              </TouchableOpacity>
            ))}
             {btnText && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.button}
                onPress={() => {
                  // Add your button press logic here
                }}
              >
                <Text style={styles.buttonText}>{btnText}</Text>
              </TouchableOpacity>
            </View>
          )}
          </ScrollView> 
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#4B4B64',
    borderRadius: 10,
    padding: 10,
    maxHeight: 350, 
  },
  scrollView: {
    maxHeight: 400, 
  },
  scrollContainer: {
    paddingBottom: 10, 
  },
  priceItem: {
    padding: 10,
    borderBottomColor: '#333',
   
  },
  selectedPriceItem: {
    backgroundColor: '#9C0A35',
  },
  priceText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#9C0A35',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceForm;
