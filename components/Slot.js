import React from 'react';
import { 
    View ,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { default as AntDesignIcon } from '@expo/vector-icons/AntDesign';

export default ({
    slot,
}) =>{
    const ClockIcon = <AntDesignIcon 
                        name={'clockcircleo'}
                        size={15}
                        color={slot.available ? '#9bc45dff' : '#ddd'}
                        />;
    let Container = slot.available  ? TouchableOpacity : View
    
    

    return (
        <Container style={[styles.container,slot.available && {...styles.shadow}]}>
            <View style={styles.row}>
                {ClockIcon}
                <Text style={slot?.available ? {...styles.slotText} : styles.slotTextDisabled}>
                    {slot?.start} - {slot?.end}
                </Text>

            </View>
          
        </Container>
    )
};
const styles = StyleSheet.create({
    container: {
        width : '45%',
        alignSelf : 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius  : 5 ,
        borderWidth : 1,
        borderColor : '#dddd',
        padding  :10,
       
        margin  :10
    },
    row  : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : '100%'
    },
    slotText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#000',
    },
    slotTextDisabled : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#ddd',
        opacity : 0.5
    },
    slotTextAvailable : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#9bc45dff',
    },
    slotTextAvailableDisabled : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#9bc45dff',
        opacity : 0.5
    },
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
  
});