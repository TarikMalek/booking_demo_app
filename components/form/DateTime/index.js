import React,{useState} from 'react';
import {
     View,
     Text,
     Platform,
     StyleSheet,
     TouchableOpacity,
     Dimensions,

}  from 'react-native';
// import IOSDateTimeActionSheet from './iOSDateTimeActionSheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import moment from 'moment-timezone';
import {  HelperText } from "react-native-paper";
import BottomSheet from './iOSBottomSheet';   
const {width} = Dimensions.get('window');

export default ({
    value,
    label,
    onChange,
    mode,
    minimumValue,
    maximumValue,
    containerStyle={},
    error,
    helperText,
    minuteInterval=1
})=>{
    const [showAndroidDateTime , setShowAndroidDateTime] = useState(false);
    const [showIosSheet, setShowIosSheet] = useState(false);

    const GetIcon = ()=>{
        switch(mode){
            case 'date':
                return <MaterialIcons name="date-range" size={20} color={error?'red' : "black"} />
            case 'time':
                return <MaterialIcons name="access-time" size={20} color={error?'red' : "black"} />
        }
    };

    const formattedValue = value 
    ? mode === 'time'
      ? moment(value).format('HH:mm z') // Time with timezone abbreviation
      : moment(value).format('ll') // Date with timezone abbreviation
    : '--';
    const SetDate = (value)=>{
            onChange(value);
            setShowAndroidDateTime(false);
    };

    return (
        <View style={[styles.container,containerStyle]}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity 
            style={styles.row}
            onPress={()=>{
                if (Platform.OS == 'ios'){
                    setShowIosSheet(true)
                } else {
                    setShowAndroidDateTime(true);
                }
            }}
            >
                <View style={styles.iconConainer}>
                    {GetIcon()}
                </View>

                <View style={[styles.labelContainer,
                    {marginBottom : 0}
                    ]}>
                    <Text>
                    {formattedValue}
                    </Text>
                </View>

               
            </TouchableOpacity>

            {showAndroidDateTime &&
             <DateTimePicker
             testID="dateTimePicker"
             value={value ?? new Date()}
             mode={mode}
             is24Hour={true}
             display='spinner'
             onChange={(event,date)=>{
                if (date ) {
                    SetDate(date);
                    setShowAndroidDateTime(false);
                }
               
             }}
             minimumDate={minimumValue}
             maximumDate={maximumValue}
             minuteInterval={minuteInterval}
             />
            }
            {helperText && (
            <HelperText type="error" visible={error}>
            {helperText}
            </HelperText>
            )}
            <BottomSheet
            visible={showIosSheet}
            onClose={() => setShowIosSheet(false)}
            value={value ?? new Date()}
            mode={mode}
            SetDate={(date)=>{
                if (date ) {
                    SetDate(date);
                }
               
             }}
            minimumDate={minimumValue}
            maximumDate={maximumValue}
            minuteInterval={minuteInterval}
        />
        </View>
    )
}

const styles= StyleSheet.create({
    container : {
        flex:1,
       
    },
    row: {
        flexDirection: 'row',
    },
    iconConainer : {
        alignItems :'center',
        marginRight : 10
    },
    labelContainer : {
        marginBottom : 10,
    }, 
    label : {
        fontSize : 16,
        fontWeight : 'bold',
        color : 'black',
    }
})