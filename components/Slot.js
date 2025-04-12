import React from 'react';
import { 
    View ,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import {default as FontAwesomeIcon} from '@expo/vector-icons/FontAwesome';
import { default as AntDesignIcon } from '@expo/vector-icons/AntDesign';
import { default as FontistoIcon } from '@expo/vector-icons/Fontisto';
import moment from 'moment-timezone';
import { getTimezoneOffsetInHours } from '../utilities/datetime'

export default ({
    slot,
    selectedTimezone
}) =>{
    const CalendarIcon = <FontAwesomeIcon name={'calendar'} size={25} color={'#000'}/>;
    const TimezoneIcon = <AntDesignIcon name={'earth'} size={15} color={'#9bc45dff'}/>;
    const ClockIcon = <AntDesignIcon name={'clockcircleo'} size={15} color={'#9bc45dff'}/>;
    const AppointMentIcon =<FontAwesomeIcon name={'calendar-plus-o'} size={15} color={'#9bc45dff'}/> ;
    const UTCIcon =<FontistoIcon name={'stopwatch'} size={15} color={'#9bc45dff'}/> ;

    const { 
        timeZone,
        startDate,
        endDate,
        startTime,
        endTime,
        breakDuration,
        slotDuration,
        bufferDuration
    } = slot;
    let  _timezone = selectedTimezone ? selectedTimezone : timeZone;

    const _startDate = moment(startDate)?.format('YYYY-MM-DD');
    const _endDate = moment(endDate)?.format('YYYY-MM-DD');
    const bookingDate = _startDate == _endDate ?
                        _startDate :
                        `from ${_startDate} to ${_endDate}`
    const _startTime = moment(startTime)?.tz(_timezone).format('HH:mm');
    const _endTime = moment(endTime)?.tz(_timezone).format('HH:mm');
    const bookingTime = `from ${_startTime} to ${_endTime}`;
    const timeZoneOffset = getTimezoneOffsetInHours(_timezone);
    const footerItems = [
        {
            label : 'Break Duration',
            value : breakDuration
        },
        {
            label : 'Slot Duration',
            value : slotDuration
        },
        {
            label : 'Buffer Duration',
            value : bufferDuration
        }
    ]
    const FooterItem = ({
        item
    }) =>{
        return (
            <View style={{
                width : '33%',
                justifyContent : 'center',
                alignItems : 'center',
            }}>
                <Text style={{
                    fontSize : 12,
                    color : '#fff',
                    fontWeight : 'bold'
                }}>
                    {item.label}
                </Text>
                <Text style={{
                    fontSize : 12,
                    color : '#fff'
                }}>
                    {`${item.value} Mins`}
                </Text>
            </View>
        )
    }

    const DataRow = ({data}) =>{
        return (
            <View
            style={[styles.row,{
            width : '100%',
            justifyContent : 'flex-start',
            alignItems : 'center',
            marginBottom : 5,
            }]}
            >
            <View
            style={[styles.row,{
                width : '100%',
                justifyContent : 'flex-start',
                alignItems : 'center',
            }]}
            >
                {data.icon}
                <Text style={{
                    marginLeft : 15,
                    fontSize : 12
                }}>
                    {data.value}
                </Text>
    
            </View>
        </View>
        )
    
    }
    

    return (
        <TouchableOpacity style={styles.container}>
            <View style={[styles.row,{padding : 20}]}>
                <View style={{
                    width : '15%'
                }}>
                    {CalendarIcon}
                </View>
                <View
                style={{
                width : '85%',
                justifyContent : 'flex-start',
                alignItems : 'center',
                
                }}
                >

                
                <DataRow 
                data={{
                    icon : TimezoneIcon,
                    value : timeZone
                }}
                />
                 <DataRow 
                data={{
                    icon : AppointMentIcon,
                    value : bookingDate
                }}
                />
                <DataRow 
                data={{
                    icon : ClockIcon,
                    value : bookingTime
                }}
                />
                <DataRow 
                data={{
                    icon : UTCIcon,
                    value : `${timeZoneOffset} hours difference between ${_timezone} and UTC Zone: `
                }}
                />



                </View>
            </View>

            <View style={styles.footer}>
                {footerItems.map((item,index) =>(
                    <FooterItem
                    key={index}
                    item={item}
                    />
                ))}
            </View>

        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    container: {
        width : '90%',
        alignSelf : 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius  : 5 ,
        borderWidth : 1,
        borderColor : '#dddd',
    
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginVertical  :10
    },
    row  : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : '100%'
    },
    footer:{
        width : '100%',
        flexDirection  : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        backgroundColor : '#3E5D9B',
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,
        padding : 5
    }
  
});