import React, {  useState } from "react";
import {  View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const Input = ({
  mode="outlined",
  label,
  value,
  placeholder,
  leftIconText,
  rightIconText,
  onChangeText,
  onBlur,
  multiline,
  numberOfLines,
  returnKeyType,
  error,
  helperText,
  containerStyle,
  inputStyle={},
  right,
  keyboardType,
  disabled,
  maxLength
}) => {
  const [focused, setFocused] = useState(false);

  const iconColor = () => {
    if (error) return 'red';
    if (focused) return 'blue' ;
    return 'gray';
  };


  return (
    <View style={[{ height: 45 }, containerStyle]}>
      <TextInput
        mode={mode}
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={(...args)=>{
          setFocused(false)
          onBlur && onBlur(...args)
        }}
        multiline={multiline}
        numberOfLines={numberOfLines}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        activeOutlineColor={'green'  }
        disabled={disabled}
        maxLength={maxLength}
        style={[inputStyle,{
          fontSize :16,
          backgroundColor :'white',
          height : 45
        }]}
        
        left={
          leftIconText && (
            <TextInput.Icon
              icon={leftIconText}
              color={iconColor()}
              style={{ marginTop: 5 }}
            />
          )
        }
        right={ rightIconText && (
          <TextInput.Icon
            icon={rightIconText}
            color={iconColor()}
            style={{ marginTop: 5 }}
          />
        )}
        onFocus={(arg) => setFocused(true)}
        placeholder={placeholder}
        error={error}
      />
      {helperText && (
        <HelperText type="error" visible={error}>
          {helperText}
        </HelperText>
      )}
    </View>
  );
};

export default Input;
