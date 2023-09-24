import React, { useEffect } from 'react';
import { View, Image, StyleSheet ,  Text , Dimensions,} from 'react-native';
import { DraxView } from 'react-native-drax';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const DropArea = ({ asset ,addCardToTrade ,isEnabled}) => {


  console.log("Droparea isEnabled" , isEnabled)
  useEffect(()=>{
    console.log("asses1 =====> " ,asset)

  },[])
  return (
    <View style={styles.container}>

      {isEnabled ? (
         <DraxView
         style={styles.receiver}
 
         receivingStyle={styles.receiving}
 
 
 
         onReceiveDragEnter={({ dragged: { payload } }) => {
           console.log(`hello ${payload}`)
       }}
       onReceiveDragExit={({ dragged: { payload } }) => {
           console.log(`goodbye ${payload}`)
       }}
       onReceiveDragDrop={({ dragged: { payload } }) => {
         addCardToTrade(payload);
       }}
 
       draggingStyle={styles.dragging}
       dragReleasedStyle={styles.dragging}
       hoverDraggingStyle={styles.hoverDragging}
       dragPayload={id} 
       longPressDelay={0}
       >
          {
  asset && asset.length > 0 ? (
    asset.map((item, index) => (
      <React.Fragment key={index}>
        {item.Content && item.Content.length > 0 ? (
          <Image
            source={{ uri: item.Content[0].url }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <Text
            style={{
              color: 'black',
              display: 'flex',
              textAlign: 'center',
            }}>
            Description
          </Text>
        )}
      </React.Fragment>
    ))
  ) : (
    <Text
      style={{
        color: 'black',
        display: 'flex',
        textAlign: 'center',
      }}>
      +
    </Text>
  )
}  

       </DraxView>

      ):(
        <DraxView
         style={styles.receiver}
       draggingStyle={styles.dragging}
       dragReleasedStyle={styles.dragging}
       hoverDraggingStyle={styles.hoverDragging}
       dragPayload={id} 
       longPressDelay={0}
       >
          {
  asset && asset.length > 0 ? (
    asset.map((item, index) => (
      <React.Fragment key={index}>
        {item.Content && item.Content.length > 0 ? (
          <Image
            source={{ uri: item.Content[0].url }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <Text
            style={{
              color: 'black',
              display: 'flex',
              textAlign: 'center',
            }}>
            Description
          </Text>
        )}
      </React.Fragment>
    ))
  ) : (
    <Text
      style={{
        color: 'black',
        display: 'flex',
        textAlign: 'center',
      }}>
      +
    </Text>
  )
}  

       </DraxView>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  receiver: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  receiving: {
    borderColor: 'purple',
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "green",
    borderWidth: 2,
    width: ScreenWidth/5,
    height:ScreenHeight/5
  },
});

export default DropArea;
