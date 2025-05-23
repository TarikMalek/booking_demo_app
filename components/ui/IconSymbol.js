// This file is a fallback for using MaterialIcons on Android and web.

import Octicons from '@expo/vector-icons/Octicons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'clock.badge': 'clock',
  'plus.app.fill': 'plus',
  'chevron.right': 'chevron-right'
}


/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}) {
  return <Octicons color={color} size={size} name={MAPPING[name]} style={style} />;
}
