import { getFile } from '@/helpers/api';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import BottomModal from "@/components/(modals)/modal-bottom";
export interface Service {
  id: string;
  name: string;
  distanceMasterCount: number;
  attachmentId?: string | undefined;
  onPress?: () => void;
}

type ClientCardDetailProps = {
  id: string;
  name: string;
  services?: Service[];
  price: any;
  imageId?: string | null;
  description: string;
  subDescription?: string;
  genderId: number[];
  attachmentId: string | null
};

type MasterCardDetailProps = {
  item: ClientCardDetailProps;
  onPress?: () => void;
}

const genderMapping: any = {
  1: 'Мужчины для взрослых',
  2: 'Женщины для взрослых',
  3: 'Мужчины для мальчиков',
  4: 'Женщины для девочек',
};

const ClientCardDetail: React.FC<MasterCardDetailProps> = ({ item, onPress }) => {
  const { setSelectedCategoryId, selectedCategoryId } = ClientStory();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [oneData, setOneData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = async () => setModalVisible(!modalVisible);

  const handleSelect = (id: string) => {
    let arr: any = [];

    if (selectedCategoryId && selectedCategoryId.includes(id)) {
      arr = selectedCategoryId.filter((res: any, index: any) => res !== id);
    } else {
      if (selectedCategoryId) {
        arr = [...selectedCategoryId, id];
      }
    }
    setSelectedIds(arr);
  };

  useEffect(() => {
    setSelectedCategoryId(selectedIds);
  }, [selectedIds]);

  console.log('one data items: ', oneData);

  return (
    <View style={[tw`p-4 rounded-2xl`, { backgroundColor: "#B9B9C9" }]}>
      <View style={tw`mb-4`}>
        {item.genderId && item.genderId.length > 0 ? (
          item.genderId.map((id, index) => (
            <TouchableOpacity
              key={id}
              style={tw`flex-row items-center mb-2`}
              onPress={() => handleSelect(item.id)}
            >
              {index === 0 ? (
                <View
                  style={[
                    tw`w-5 h-5 rounded-full border`,
                    {
                      borderColor: selectedIds.includes(item.id) ? '#9C0A35' : '#000',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 8, // Qo'shimcha joylashni ta'minlash uchun
                    }
                  ]}
                >
                  {selectedIds.includes(item.id) && (
                    <View style={[tw`w-3 h-3 rounded-full`, { backgroundColor: '#9C0A35' }]} />
                  )}
                </View>
              ) : <View style={{paddingHorizontal: 14}}>
                </View>}
              <Text style={[tw`text-xl font-bold`, { color: '#000' }]}>
                {genderMapping[id] || 'Hamma uchun'}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity
            style={tw`flex-row items-center mb-2`}
            onPress={() => handleSelect(item.id)}
          >
            <View
              style={[
                tw`w-5 h-5 rounded-full border`,
                {
                  borderColor: selectedIds.length === 0 ? '#9C0A35' : '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }
              ]}
            >
              {selectedIds.length === 0 && (
                <View style={[tw`w-3 h-3 rounded-full`, { backgroundColor: '#9C0A35' }]} />
              )}
            </View>
            <Text style={[tw`text-xl font-bold`, { color: '#000' }]}>
              Hamma uchun
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={tw`flex-row items-center mb-3 justify-between`}>
        <Text style={tw`border-gray-600 border px-3 py-2 rounded-lg`}>{item.name}</Text>
        <Text style={[tw`text-xl font-bold`, { color: '#9C0A35' }]}>{item.price} сум</Text>
      </View>
      {item.imageId && (
        <Image
          source={{ uri: getFile + item.attachmentId }}
          style={tw`w-full h-40 rounded-lg mb-4`}
        />
      )}
      <Text style={tw`text-black mb-2`}>{item.description.trim()}</Text>
      {item.subDescription && <Text style={tw`text-black mb-4`}>{item.subDescription}</Text>}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[tw`w-1/2 p-3 rounded-lg`, { backgroundColor: '#9C0A35' }]}
        onPress={() => {
          handleOpenModal();
          setOneData(item);
        }}
      >
        <Text style={[tw`text-center text-xl`, { color: '#FFFFFF' }]}>Подробнее</Text>
      </TouchableOpacity>

      <BottomModal isBottomModal={modalVisible} toggleBottomModal={handleOpenModal}>
        <View style={{ width: '100%' }}>
          {oneData && oneData.genderId && oneData.genderId.length > 0 ? (
            oneData.genderId.map((id: any) => (
              <TouchableOpacity
                key={id}
                style={tw`flex-row mb-2`}
                onPress={() => handleSelect(item.id)}
              >
                <Text style={[tw`ml-2 text-xl font-bold`, { color: '#fff' }]}>
                  {genderMapping[id] || 'Hamma uchun'}
                </Text>
              </TouchableOpacity>
            ))
          ) : null}
          <View style={[tw`px-3 py-2 border rounded-lg`, { alignItems: 'flex-start', borderColor: '#828282' }]}>
            <Text style={[tw` `, { color: '#828282' }]}>{oneData && oneData.name}</Text>
          </View>
          {oneData && oneData.imageId && (
            <Image
              source={{ uri: getFile + oneData.attachmentId }}
              style={tw`w-full h-40 rounded-lg mb-4`}
            />
          )}
          <Text style={tw`text-white mb-2 mt-3`}>{oneData && oneData.description.trim()}</Text>
          {oneData && oneData.subDescription && <Text style={tw`text-white mb-4`}>{oneData.subDescription}</Text>}
        </View>
      </BottomModal>
    </View>
  );
};

export default ClientCardDetail;
