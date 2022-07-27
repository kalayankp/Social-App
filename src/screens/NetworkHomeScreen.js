import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {View, Image, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import {
  intro,
  like,
  networkImg,
  user,
  img1,
  img2,
  img3,
  list,
  grid,
  member,
} from '../asset/images';
import AboutNetwork from '../components/AboutNetwork';
import Announcement from '../components/Announcement';
import Back from '../components/Back';
import ImageList from '../components/ImageList';
import ImageListView from '../components/ImageListView';
import MainHeader from '../components/MainHeader';
import MemberList from '../components/MemberList';
import RightIcons from '../components/RightIcons';
import metrics from '../contents/metrics';
const NetworkHomeScreen = () => {
  const images = [
    {id: 1, image: img1},
    {id: 2, image: img2},
    {id: 3, image: img3},
    {id: 4, image: img1},
    {id: 5, image: img2},
    {id: 6, image: img3},
    {id: 7, image: img1},
    {id: 8, image: img2},
    {id: 9, image: img3},
  ];

  const members = [
    {name: 'Harsha N K', type: 'Admin', profileimg: member},
    {name: 'Anil ', type: 'Admin', profileimg: member},
    {name: 'Rakesh S S', type: 'Member', profileimg: member},
    {name: 'Param', type: 'Member', profileimg: member},
    {name: 'Lokesh', type: 'Member', profileimg: member},
    {name: 'Srikanth', type: 'Member', profileimg: member},
  ];
  const [seeMore, setSeeMore] = useState(false);
  const [navigate, setNavigate] = useState('announcement');
  const [view, setView] = useState('grid');
  return (
    <>
      <MainHeader title="NETWORK" rightComponent={Back} />
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={{}}>
            <Image
              source={networkImg}
              style={{
                width: metrics.width,
                height: metrics.height / 4,
                resizeMode: 'cover',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 8,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginLeft: 16,
                fontSize: 28,
                alignSelf: 'center',
                marginRight: 6,
              }}>
              Hash X
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  borderWidth: 1,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginLeft: 16,
                }}>
                <Image source={user} style={{width: 15, height: 15}} />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginLeft: 8,
                }}>
                <Image source={user} style={{width: 15, height: 15}} />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginLeft: 8,
                }}>
                <Image source={user} style={{width: 15, height: 15}} />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginLeft: 8,
                }}>
                <Image source={user} style={{width: 15, height: 15}} />
              </View>
              <View style={{marginLeft: 8, alignSelf: 'center', flex: 1}}>
                <Text style={{fontSize: 14}}>
                  and 99 others are network members
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 16, marginTop: 16}}>
            <Text style={{fontSize: 16, lineHeight: 25}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            {seeMore ? (
              <Text style={{fontSize: 16, lineHeight: 25}}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>
            ) : null}
            <Pressable onPress={() => setSeeMore(!seeMore)}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 16,
                  color: 'black',
                  textDecorationLine: 'underline',
                }}>
                {seeMore ? 'See Less' : 'See More'}
              </Text>
            </Pressable>
            <Pressable>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    backgroundColor: '#afafaf',
                    paddingHorizontal: 24,
                    paddingVertical: 8,

                    borderRadius: 20,
                    overflow: 'hidden',
                    fontWeight: 'bold',
                    marginBottom: 8,
                  }}>
                  Join
                </Text>
              </View>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#eae6ff',
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: 8,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable onPress={() => setNavigate('announcement')} style={{}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 16,
                    textDecorationLine:
                      navigate === 'announcement' ? 'underline' : 'none',
                    fontWeight: navigate === 'announcement' ? 'bold' : '400',
                  }}>
                  Announcement
                </Text>
              </Pressable>
              <Pressable onPress={() => setNavigate('treasury')} style={{}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 16,
                    textDecorationLine:
                      navigate === 'treasury' ? 'underline' : 'none',
                    fontWeight: navigate === 'treasury' ? 'bold' : '400',
                  }}>
                  Treasury
                </Text>
              </Pressable>
              <Pressable onPress={() => setNavigate('members')}>
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 16,
                    textDecorationLine:
                      navigate === 'members' ? 'underline' : 'none',
                    fontWeight: navigate === 'members' ? 'bold' : '400',
                  }}>
                  Members
                </Text>
              </Pressable>
              <Pressable onPress={() => setNavigate('about')}>
                <Text
                  style={{
                    fontSize: 20,
                    textDecorationLine:
                      navigate === 'about' ? 'underline' : 'none',
                    fontWeight: navigate === 'about' ? 'bold' : '400',
                  }}>
                  About
                </Text>
              </Pressable>
            </ScrollView>
          </View>

          {navigate === 'announcement' ? (
            <Announcement
              contentImg={networkImg}
              description=" Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum."
            />
          ) : null}

          {navigate === 'treasury' ? (
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 16,
                }}>
                <Pressable
                  onPress={() => {
                    setView('list');
                  }}>
                  <Image
                    source={list}
                    style={{width: 30, height: 30, marginRight: 16}}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setView('grid');
                  }}>
                  <Image
                    source={grid}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 16,
                      marginTop: 3,
                    }}
                  />
                </Pressable>
              </View>
              {view === 'grid' ? <ImageList images={images} /> : null}
              {view === 'list' ? (
                <View>
                  <ImageListView data={images} />
                </View>
              ) : null}
            </View>
          ) : null}
          {navigate === 'members' ? (
            <View>
              <MemberList data={members} />
            </View>
          ) : null}
          {navigate === 'about' ? (
            <View>
              <AboutNetwork />
            </View>
          ) : null}
        </View>

        <View style={{marginBottom: 20}} />
      </ScrollView>
      <View style={{marginBottom: 18}} />
    </>
  );
};
export default NetworkHomeScreen;
