import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { router } from 'expo-router';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';

type ClientCardProps = {
  salon: string;
  imageUrl: string;
  name: string;
  zaps: string;
  masterType: string;
  orders: number;
  clients: number;
  address: string;
  feedbackCount: number;
  onPress?: () => void;
  locationIcon?: React.ReactNode
  btntext?:string;
};

const ClientCard: React.FC<ClientCardProps> = ({
  salon, imageUrl, feedbackCount, name, masterType, orders, clients, address, zaps, onPress,locationIcon,btntext
}) => {
  const { getme } = webPageStore();

  const generateStars = (count: number) => {
    let stars = '';
    for (let i = 0; i < count; i++) {
      stars += '★';
    }
    for (let i = count; i < 5; i++) {
      stars += '☆';
    }
    return stars;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View style={tw`p-4 bg-gray-300 rounded-2xl shadow-lg`}>
        <View style={tw`flex-row items-center mb-4`}>
          <Image
            source={getme && getme.attachmentId ? { uri: getme.attachmentId } : require('../../assets/avatar.png')}
            style={tw`w-16 h-16 rounded-full mr-3`}
          />
          <View style={tw`flex-1`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Text style={tw`text-lg font-bold`}>{name || "No data"}</Text>
              <View style={tw`border border-gray-600 px-2 py-1 rounded-lg ml-2`}>
                <Text style={tw`text-xs text-gray-600`}>{salon}</Text>
              </View>
            </View>
            <Text style={tw`text-sm text-gray-600`}>{masterType}</Text>
          </View>
          <View style={tw`flex items-end`}>
            <Text style={[tw`text-lg`, { color: '#9C0A35' }]}>{generateStars(feedbackCount || 0)}</Text>
            <Text style={tw`text-xs text-gray-600`}>{orders} заказа, {clients} клиентов</Text>
          </View>
        </View>
        <Text style={tw`text-gray-600 text-lg mb-2`}>{address || "Address is not found"}</Text>
        <Text style={tw`text-black text-lg font-bold mb-4`}>Ближайшая запись: {zaps}</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity activeOpacity={0.8} style={[tw`px-16 py-2 rounded-xl`, { backgroundColor: '#9C0A35' }]}
              onPress={onPress}
          >
            <Text style={tw`text-white text-xl`}>{btntext}</Text>
          </TouchableOpacity>
          {locationIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={[tw`px-3 py-3 rounded-full ml-3 `, { backgroundColor: '#9C0A35' }]}>
                        {locationIcon}
                    </TouchableOpacity>
                )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClientCard;
