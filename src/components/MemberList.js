import React from 'react';
import {Pressable, ScrollView, View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import FIcon from 'react-native-vector-icons/Feather';
const MemberList = ({data}) => {
  return (
    <>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            justifyContent: 'space-between',
          }}>
          <Text style={{marginTop: 16, fontSize: 20, fontWeight: 'bold'}}>
            Network Members ({data.length})
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#afafaf',
              padding: 6,
              borderRadius: 8,
              marginTop: 8,
            }}>
            <Pressable style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 18,
                  marginRight: 4,
                  marginLeft: 8,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Invite
              </Text>
              <FIcon
                name="plus-circle"
                style={{alignSelf: 'center'}}
                size={22}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View style={{flex: 1}}>
          {data.map((item, index) => {
            return (
              <View style={{marginHorizontal: 16, marginTop: 24}} key={index}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View>
                    <Image
                      source={item.profileimg}
                      style={{width: 60, height: 60, borderRadius: 30}}
                    />
                  </View>
                  <View style={{marginLeft: 16, marginTop: 8}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                    <Text style={{fontSize: 16, marginTop: 6}}>
                      {item.type}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};
export default MemberList;
