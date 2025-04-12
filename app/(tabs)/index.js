import React,{useState} from 'react';
import { 
  Text,
  Image,
  StyleSheet,
  Platform ,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
  } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Select from '../../components/form/select';
import DateTimeField from '../../components/form/DateTime';
import Input from '../../components/form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addSlot } from '../../store/actions';
import { useSelector ,useDispatch} from 'react-redux';
import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import Timezones from '../../constants/Timezones';
const { width, height } = Dimensions.get('window');


const YupNumberValidation = ()=>{
  return  Yup.number('must be a number')
          .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
          })
          .typeError('Must be a number') 
                  
          .positive('Must be a positive number')
          .required('Required')
}
const SlotSchema = Yup.object().shape({
  timeZone: Yup.string().required('Required'),
  startDate: Yup.date().required('Required'),
  endDate: Yup.date()
    .required('Required')
    .min(Yup.ref('startDate'), 'End date must be after or equal to start date'),
  startTime: Yup.string().required('Required'),
  endTime: Yup.string()
    .required('Required')
    .test('is-after-startTime', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      return value && startTime && value > startTime;
  }),
  breakDuration:YupNumberValidation() ,
  slotDuration: YupNumberValidation()  ,
  bufferDuration:YupNumberValidation()
});

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  return (
    <Formik
    onSubmit = {async (values,{ setErrors ,resetForm})=>{
     dispatch(addSlot({
      timeZone:Timezones.find(t=>t.value ==values.timeZone)?.label,
      startDate:moment(values.startDate).locale('en').format(),
      endDate:moment(values.endDate).locale('en').format(),
      startTime:moment(values.startTime).locale('en').format(),
      endTime:moment(values.endTime).locale('en').format(),
      breakDuration:values.breakDuration,
      slotDuration:values.slotDuration,
      bufferDuration:values.bufferDuration,
      }))
      Alert.alert('Success', 'Slot added successfully!')
      resetForm();
      router.navigate('/explore')
     }}
     initialValues={{
      timeZone:'',
      startDate:null,
      endDate:null,
      startTime:null,
      endTime:null,
      breakDuration:'',
      slotDuration:'',
      bufferDuration:'',
      }}
      validationSchema={SlotSchema}
    >
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

                      
                       


                        <View
                        style={styles.row}
                        >
                            <DateTimeField 
                            mode={'date'}
                            value={values.startDate}
                            label={'Pick start date'}
                            onChange={(val)=>{
                              val && setFieldValue('startDate',val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{width : '45%',}}
                            helperText={touched.startDate && errors.startDate}
                            error={Boolean(
                              touched.startDate && errors.startDate
                            )}
                            setShowBottomSheet={setShowBottomSheet}
                            />
                          <DateTimeField 
                            mode={'date'}
                            value={values.endDate}
                            label={'Pick end date'}
                            onChange={(val)=>{
                              val && setFieldValue('endDate',val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{
                              width : '45%',
                              alignItems  : 'flex-end',
                            }}
                            helperText={touched.endDate && errors.endDate}
                            error={Boolean(
                              touched.endDate && errors.endDate
                            )}
                            setShowBottomSheet={setShowBottomSheet}
                            />

                        </View>

                        <View
                        style={styles.row}
                        >
                            <DateTimeField 
                            mode={'time'}
                            value={values.startTime}
                            label={'Pick start time(UTC)'}
                            onChange={(val)=>{
                              val && setFieldValue('startTime',val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{width : '45%',}}
                            helperText={touched.startTime && errors.startTime}
                            error={Boolean(
                              touched.startTime && errors.startTime
                            )}
                            minuteInterval={30}
                            setShowBottomSheet={setShowBottomSheet}
                            />
                          <DateTimeField 
                            mode={'time'}
                            value={values.endTime}
                            label={'Pick end time(UTC)'}
                            onChange={(val)=>{
                              val && setFieldValue('endTime',val)
                            }}
                            minimumValue={new Date()}
                            containerStyle={{
                              width : '45%',
                              alignItems  : 'flex-end',
                            }}
                            helperText={touched.endTime && errors.endTime}
                            error={Boolean(
                              touched.endTime && errors.endTime
                            )}
                            minuteInterval={30}
                            setShowBottomSheet={setShowBottomSheet}
                            />

                        </View>
                        <Select 
                        value={values.timeZone}
                        title={'Timezone'}
                        list = {Timezones}
                        onChange={(val)=>{
                          
                          val && setFieldValue('timeZone',val)
                        }}
                        helperText={touched.timeZone && errors.timeZone}
                        error={Boolean(
                          touched.timeZone && errors.timeZone
                        )}
                        />
                        <Input 
                        label={'Slot duration'}
                        keyboardType={'number-pad'}
                        onChangeText={(val)=>{
                          if (!val) {
                            setFieldValue('slotDuration', '');
                          } else {
                            setFieldValue('slotDuration', Number(val));
                          }
                        }}
                        value={values.slotDuration}
                        helperText={touched.slotDuration && errors.slotDuration}
                        error={Boolean(
                          touched.slotDuration && errors.slotDuration
                        )}
                        />

                        <View
                        style={styles.row}
                        >
                            <Input 
                            label={'Break duration'}
                            keyboardType={'number-pad'}
                            onChangeText={(val)=>{
                              if (!val) {
                                setFieldValue('breakDuration', '');
                              } else {
                                setFieldValue('breakDuration', Number(val));
                              }
                            }}
                            value={values.breakDuration}
                            containerStyle={{
                              width : '45%'
                            }}
                            helperText={touched.breakDuration && errors.breakDuration}
                            error={Boolean(
                              touched.breakDuration && errors.breakDuration
                            )}
                            />

                            <Input 
                            label={'Buffer duration'}
                            keyboardType={'number-pad'}
                            onChangeText={(val)=>{
                              if (!val) {
                                setFieldValue('bufferDuration', '');
                              } else {
                                setFieldValue('bufferDuration', Number(val));
                              }
                            }}
                            value={values.bufferDuration}
                            containerStyle={{
                              width : '45%'
                            }}
                            helperText={touched.bufferDuration && errors.bufferDuration}
                            error={Boolean(
                              touched.bufferDuration && errors.bufferDuration
                            )}
                            />


                      
                        </View>
                        <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
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
                 {showBottomSheet && <View style={styles.backgroundOverlay}/>}
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
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
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
    justifyContent : 'space-between',
    marginVertical : 5,
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
  backgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '200%',
    zindex:888, 
  },
});
