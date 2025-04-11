import React,{useState} from 'react';
import { Text,Image, StyleSheet, Platform ,View,Dimensions,TouchableOpacity} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Select from '../../components/form/select';
import DateTimeField from '../../components/form/DateTime';
import Input from '../../components/form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addSlot } from '../../store/actions';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
const { width, height } = Dimensions.get('window');

const timezones = [
  {
    label : 'America/New_York',
    value : '1'
  },
  {
    label : 'America/Chicago',
    value : '2'
  },
  {
    label : 'America/Denver',
    value : '3'
  },
  {
    label : 'America/Los_Angeles',
    value : '4'
  },
]

export default function HomeScreen() {
  const [timeZone, setTimeZone] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate , setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime , setEndTime] = useState(null);
  const [breakDuration, setBreakDuration]= useState('')
  const [slotDuration, setSlotDuration]= useState('')
  const [bufferDuration, setBufferDuration]= useState('')
  const {slots} = useSelector((state) => state);
  console.log('slots' , slots)
  return (
    <Formik>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setFieldValue,
        })=>{
          return (
            <KeyboardAwareScrollView 
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    extraScrollHeight={Platform.OS === 'ios' ? 100 : 0}
                    contentContainerStyle={{ backgroundColor :'white'}}
                    >
              
                  <View
                  style={
                    styles.headerContainer
                  }
                  >
                    <Image
                      source={require('@/assets/images/vosita-header.png')}
                      style={styles.reactLogo}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.body}>

                      
                      <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Welcome!</ThemedText>
                        <HelloWave />
                      </ThemedView>
                      <ThemedView style={styles.stepContainer}>
                        <ThemedText type="subtitle">Add a new booking slot</ThemedText>

                      </ThemedView>

                      
                        <Select 
                        value={timeZone}
                        title={'Timezone'}
                        list = {timezones}
                        onChange={(val)=>{
                          
                          val && setTimeZone(val)
                        }}
                        />


                        <View
                        style={styles.row}
                        >
                            <DateTimeField 
                            mode={'date'}
                            value={startDate}
                            label={'Pick start date'}
                            onChange={(val)=>{
                              val && setStartDate(val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{width : '45%',}}
                            />
                          <DateTimeField 
                            mode={'date'}
                            value={endDate}
                            label={'Pick end date'}
                            onChange={(val)=>{
                              val && setEndDate(val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{
                              width : '45%',
                              alignItems  : 'flex-end',
                            }}
                            />

                        </View>

                        <View
                        style={styles.row}
                        >
                            <DateTimeField 
                            mode={'time'}
                            value={startTime}
                            label={'Pick start time'}
                            onChange={(val)=>{
                              val && setStartTime(val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{width : '45%',}}
                            />
                          <DateTimeField 
                            mode={'time'}
                            value={endTime}
                            label={'Pick end time'}
                            onChange={(val)=>{
                              val && setEndTime(val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{
                              width : '45%',
                              alignItems  : 'flex-end',
                            }}
                            />

                        </View>

                        <Input 
                        label={'Slot duration'}
                        keyboardType={'number-pad'}
                        onChangeText={(val)=>{
                          val && setSlotDuration(val)
                        }}
                        value={slotDuration}
                      
                        />

                        <View
                        style={styles.row}
                        >
                            <Input 
                            label={'Break duration'}
                            keyboardType={'number-pad'}
                            onChangeText={(val)=>{
                              val && setBreakDuration(val)
                            }}
                            value={breakDuration}
                            containerStyle={{
                              width : '45%'
                            }}
                            />

                            <Input 
                            label={'Buffer duration'}
                            keyboardType={'number-pad'}
                            onChangeText={(val)=>{
                              val && setBufferDuration(val)
                            }}
                            value={bufferDuration}
                            containerStyle={{
                              width : '45%'
                            }}
                            />


                      
                        </View>
                        <TouchableOpacity
                        style={styles.submitBtn}
                        >
                            <Text style={{
                              fontWeight : 'bold',
                              color : 'white',
                              fontSize : 16
                            }}>
                              Add Slot
                            </Text>
                        </TouchableOpacity>
                  </View>
                </KeyboardAwareScrollView>
          )
        }
      }
    </Formik>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerContainer:{
    width : width,
    height : height * 0.3,
    position : 'relative',
    overflow : 'hidden',
    backgroundColor : '#A1CEDC',
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom :30
  },
  body: {
    width : '100%',
    flex:1,
    backgroundColor : "white",
    marginTop : -30,
    alignSelf  :'center',
    padding: 20,
    paddingBottom: 200 ,
    gap: 10,
    borderWidth : 1,
    borderColor : '#dddd',
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
 
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  row :{
    width :'100%',
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  submitBtn :{
    width : '100%',
    alignSelf : 'center',
    height : 50,
    borderRadius : 10,
    backgroundColor : '#9bc45dff',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 20
  },
});
