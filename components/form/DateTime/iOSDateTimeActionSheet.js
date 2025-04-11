import React,{useState} from 'react';
import { 
    View,
    Text,
    StyleSheet,

    Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RectButton from '../../UI/RectButton';
const {width,height}   = Dimensions.get('window');

export default({
    label,
    mode,
    value,
    onChange,
    minimumDate,
    maximumDate,
    datePickerStyle={},
})=>{
    const [date,setDate] = useState(new Date());
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            is24Hour={true}
            onChange={(event,date)=>{
                onChange(date);
                setDate(date)
            }}
            display='spinner'
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            style={[styles.datePickerStyle,{...datePickerStyle}]}
            />
            <RectButton 
            onPress={()=>{
                global.props.setShowBackgroundOverlay({
                    show : false,
                    dismissable: true
                });
                global.props.setShowBottomSheet(false);
                onChange(date)
            }}
            label={'test datePicker'}
            buttonBackground={['blue','lightblue']}
            containerStyle={{width : width*.9,marginVertical : 10}}
            />
        </View>
    )
};


const styles= StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center'
    },
    label : {
        marginVertical : 10,
        fontSize : 16,
        fontWeight : 'bold',
        color : 'black',
        textAlign : 'center'
    }
});
