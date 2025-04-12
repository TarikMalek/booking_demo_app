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
import Select from '../../components/form/select';
import Timezones from '../../constants/Timezones';

const { width , height } = Dimensions.get('window');
const Header = (timezone,setTimezone,showSelect)=>{
  const _timezones = [
    { label: '--', value: 'all' },
    ...Timezones
  ];
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
        width : '90%',
        alignSelf : 'center'
      }}>

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
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const slots = useSelector((state) => state.slots);
  const [filteredSlots, setFilteredSlots ] = useState(slots);
  
  let showSelect = slots?.length > 0 ;
  useEffect(() => {
    if (selectedTimezone && selectedTimezone != 'all') {
      setFilteredSlots(slots.filter((slot) => slot.timeZone ===  Timezones.find(t=> t.value == selectedTimezone)?.label));
    } else {
      setFilteredSlots(slots);
    }
  }, [selectedTimezone, slots]);


 
  return (
    <View style={{flex:1,backgroundColor : '#fff',}}>

    
    <FlatList 
    data={filteredSlots}
    contentContainerStyle={{
      backgroundColor : '#fff',
      paddingBottom : 100,
      paddingTop : 20,
    }}
    ListHeaderComponent={Header(selectedTimezone,setSelectedTimezone,showSelect)}
    renderItem={({ item },idx) => (
      <Slot 
      key={idx}
      slot={item}
      selectedTimezone={selectedTimezone ? Timezones.find(t=> t.value == selectedTimezone)?.label : '' }
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
    backgroundColor : '#A1CEDC',
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom :30
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    
    // position: 'absolute',
  },
});
