import React,{useState,useEffect,useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  Platform,
  FlatList,
  Dimensions
  } from 'react-native';
import { useSelector } from 'react-redux';
import Slot from '@/components/Slot';
import Select from '@/components/form/select';
import DateTimeField from '@/components/form/DateTime';
import Timezones from '../../constants/Timezones';
import { getTimeSlots , filterSlots,getTimezoneOffsetInHours} from '../../utilities/datetime';
import { useFocusEffect } from 'expo-router';
import moment from 'moment';
const { width , height } = Dimensions.get('window');
const _timezones = [
  ...Timezones
];
const Header = (
  currentDeviceTime,
  timezone,
  setTimezone,
  showSelect,
  setSelectedDate,
  setSelectedTime,
  selectedTime,
  selectedDate,
  minimumDate,
  maximumDate,
  setShowBottomSheet
)=>{
  
  return (
    <View>
     <View
      style={
        styles.headerContainer
      }
      >
        <Image
          source={require('@/assets/images/vosita-view.png')}
          style={styles.reactLogo}
          resizeMode="cover"
        />
      
      </View>
      
      
      {showSelect &&
      <View style={{
        width : '95%',
        alignSelf : 'center',
        marginBottom :15,
        borderRadius: 10,
        borderWidth : 1,
        borderColor : '#ddd',
        padding : 10
      }}>
        
        <View
        style={[styles.row,{marginBottom : 15}]}
        >
            <DateTimeField 
            mode={'time'}
            value={selectedTime}
            label={'Filter by time'}
            onChange={(val)=>{
              val && setSelectedTime(val)
            }}
            containerStyle={{width : '45%',}}
            minuteInterval={30}
            setShowBottomSheet={setShowBottomSheet}
            />
          <DateTimeField 
            mode={'date'}
            value={selectedDate}
            label={'Filter by date'}
            onChange={(val)=>{
              val && setSelectedDate(val)
            }}
            containerStyle={{
              width : '45%',
              alignItems  : 'flex-end',
            }}
            setShowBottomSheet={setShowBottomSheet}
            minimumValue={new Date(minimumDate)}
            maximumValue={new Date(maximumDate)}
            />

        </View>

       <Select 
       value={timezone}
       title={'Timezone'}
       list = {_timezones}
       onChange={(val)=> val && setTimezone(val)}
       />
       
      </View>
      }
     
      </View>
  )
}
export default function TabTwoScreen() {
  const _Slot = useSelector(state => state.Slot)
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [filteredSlots, setFilteredSlots ] = useState([]);
  const [selectedDate , setSelectedDate]= useState(null);
  const [selectedTime , setSelectedTime]= useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const currentDeviceTime = _Slot?.timeZone ? moment.utc().tz(_Slot?.timeZone) : null;
  let showSelect = filteredSlots?.length > 0 ? true : false;

  let tzOffest = getTimezoneOffsetInHours(
     'America/Los_Angeles',
    'America/New_York',
   
  );

  useFocusEffect(
    useCallback(() => {
      if (_Slot?.startDate) {
        let _slots = getTimeSlots(_Slot);
        let _filteredSlots = filterSlots(
          moment(_Slot?.startDate).format('YYYY-MM-DD'),
          _slots,
          _Slot?.bufferDuration,
          new moment().format('HH:mm'),
        );
        
        setFilteredSlots(_filteredSlots);
        setSelectedTimezone(_timezones.find((t)=>t.label == _Slot?.timeZone)?.value)
      }
    }, [_Slot])
  );

  useEffect(()=>{
    let _slots = getTimeSlots(_Slot,selectedTimezone);
    let filteredSlots = filterSlots(
      moment(selectedDate ? selectedDate : _Slot?.startDate).format('YYYY-MM-DD'),
      _slots,
      _Slot?.bufferDuration,
      selectedTime ? new moment(selectedTime).format('HH:mm') : new moment().format('HH:mm'),
    );
    setFilteredSlots(filteredSlots)
  },[selectedDate,selectedTime,selectedTimezone])
  

  return (
    <View style={{flex:1,backgroundColor : '#fff',}}>

    
    <FlatList 
    data={filteredSlots}
    contentContainerStyle={{
      backgroundColor : '#fff',
      paddingBottom : 100,
      paddingTop : 20,
      paddingHorizontal : 10
     
    }}
    numColumns={2}
    ListHeaderComponent={Header(
      currentDeviceTime,
      selectedTimezone,
      setSelectedTimezone,
      showSelect,
      setSelectedDate ,
      setSelectedTime,
      selectedTime ?? new Date(),
      selectedDate ?? new Date(),
      _Slot?.startDate,
      _Slot?.endDate,
      setShowBottomSheet
    )}
    renderItem={({ item, index }) => (
      <Slot 
        key={index}
        slot={item}
      />
    )}
    ListEmptyComponent={
      <View
      style={{
        flex : 1,
        alignItems : 'center',
        marginTop : 25
      }}
      >
        <Text
        style={{
          fontSize : 18,
          fontWeight : 'bold',
          color : '#000',
          opacity : 0.5
        }}
        >
          No slots found
        </Text>
      </View>
    }
    />
    </View>
  );
}

const styles = StyleSheet.create({
 

  headerContainer:{
    width : width,
    height : height * 0.3,
    // position : 'relative',
    overflow : 'hidden',
    // backgroundColor : '#A1CEDC',
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom :30
  },
  reactLogo: {
    height: '100%',
    width: '100%',
  },
  row :{
    width :'100%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginVertical : 5,
  },
});
