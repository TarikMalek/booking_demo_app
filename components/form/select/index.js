import React, {  useEffect, useState } from "react";
import {TextInput } from 'react-native-paper'
import { Text, View,TouchableOpacity,StyleSheet } from "react-native";

import { HelperText } from "react-native-paper";
import {Dropdown} from "react-native-paper-dropdown";
import {Colors} from "../../../constants/Colors";  



export default ({
  title,
  list,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  containerStyle,
}) => {
  const[open,setOpen]=useState(false);
  const[Items,setItems]=useState([]);
 

  const getLabel = ()=>{
    let l = placeholder ? placeholder : "Pick " + title ?? "";
    return l
  };

   useEffect(()=>{
    
     if(list&&list.map){
       setItems(list.map(s=>{
         return {
           label: s.label?.toString(),
           value: s.value
         }
       }))
    }  
       },[list])



 
  return (
    
    <View style={[styles.container, containerStyle]}>
    {Items?.length>0&& <Dropdown
              label={getLabel()}
              mode={"outlined"}
              visible={open}
              showDropDown={() => setOpen(true)}
              onDismiss={() => setOpen(false)}
              value={value}
              onSelect={onChange}
              options={Items}
               CustomDropdownItem={({ option, value, width ,onSelect,toggleMenu,isLast}) => (
                <TouchableOpacity
                style={{
                  alignSelf : 'center',
                  marginVertical: 10,
                  padding : 5,
                  borderColor:  Colors.borderColor,
                  width : '90%',
                  borderBottomWidth: !isLast ? 1 : 0,
                   
                }}
                onPress={()=>{
                  onChange(option.value)
                  toggleMenu(false)
                }}
                >
                <Text style={{
                   color: value==option.value ? 
                            Colors.light.text:
                            Colors.light.borderColor ,
                   minWidth: width ,
                   textAlign: 'left',
                   fontSize : 16,
                  }}>
                    {option.label}
                  </Text>
                
                </TouchableOpacity>
              )}
              
              CustomMenuHeader={()=> 
                <View
                style={{
                  width : '100%',
                  height : 45,
                  alignItems : 'center',
                  justifyContent : 'center',
                  backgroundColor :'white'
                }}
                >
                  <Text
                  style={{
                    color :'black',
                    fontSize : 16,
                    fontWeight : 'bold'
                }}
                  >
                    {getLabel()}
                  </Text>
              </View>
               }
              
            />
    }
      
      {helperText && (
        <HelperText type="error" visible={error}>
          {helperText}
        </HelperText>
      )}
    </View>
  
  );
};


const styles = StyleSheet.create({
    container : {
        marginVertical : 10,
    }
})