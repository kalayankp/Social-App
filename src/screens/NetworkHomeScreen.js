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
  user_1,
  user_2,
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
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
                marginHorizontal: 0,
                marginTop: 20,
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
                  //justifyContent: 'flex-start',
                  flex: 1,
                  alignItems: 'center',
                  marginLeft: 60,
                  paddingLeft: 80,
                  paddingRight: 5,
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    // marginLeft: 16,
                    // marginRight: 35,
                    position: 'absolute',
                    left: 5,
                  }}>
                  <Image
                    source={member}
                    style={{width: 40, height: 40, borderRadius: 20}}
                  />
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,

                    position: 'absolute',
                    left: 25,
                  }}>
                  <Image
                    source={user_1}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,

                    position: 'absolute',
                    left: 45,
                  }}>
                  <Image
                    source={user_2}
                    style={{width: 40, height: 40, borderRadius: 20}}
                  />
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,

                    position: 'absolute',
                    left: 65,
                  }}>
                  <Image
                    source={member}
                    style={{width: 40, height: 40, borderRadius: 20}}
                  />
                </View>
                <View style={{marginLeft: 30, alignSelf: 'center', flex: 1}}>
                  <Text style={{fontSize: 14}}>+99 members</Text>
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
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
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
                      backgroundColor: '#5851bc',
                      paddingHorizontal: 24,
                      paddingVertical: 8,

                      borderRadius: 20,
                      overflow: 'hidden',
                      fontWeight: 'bold',
                      marginBottom: 8,
                      color: 'white',
                    }}>
                    Join
                  </Text>
                </View>
              </Pressable>
            </View>

            <View
              style={{
                marginTop: 8,
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
                <Pressable
                  onPress={() => setNavigate('announcement')}
                  style={{
                    borderBottomWidth: navigate === 'announcement' ? 2 : 0,
                    paddingBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 16,

                      fontWeight: navigate === 'announcement' ? 'bold' : '400',
                    }}>
                    Announcement
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setNavigate('treasury')}
                  style={{
                    borderBottomWidth: navigate === 'treasury' ? 2 : 0,
                    paddingBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 16,

                      fontWeight: navigate === 'treasury' ? 'bold' : '400',
                    }}>
                    Treasury
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setNavigate('members')}
                  style={{
                    borderBottomWidth: navigate === 'members' ? 2 : 0,
                    paddingBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 16,

                      fontWeight: navigate === 'members' ? 'bold' : '400',
                    }}>
                    Members
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setNavigate('about')}
                  style={{
                    borderBottomWidth: navigate === 'about' ? 2 : 0,
                    paddingBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,

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
                    marginTop: 8,
                  }}>
                  <Pressable
                    onPress={() => {
                      setView('list');
                    }}>
                    <Image
                      source={list}
                      style={{width: 20, height: 20, marginRight: 16}}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setView('grid');
                    }}>
                    <Image
                      source={grid}
                      style={{
                        width: 15,
                        height: 15,
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
      </View>
      <View style={{marginBottom: 3}} />
    </>
  );
};
export default NetworkHomeScreen;
