import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { SvgXml } from 'react-native-svg';
const SvgImage = ({seed}) => {
  const avatarSvg = createAvatar(avataaars, {
    seed: seed,
    width: 100,
    height: 100,
  }).toString();
  return (
    <>
      <SvgXml xml={avatarSvg} style={{ height: 100, width: 100 }} />
    </>
  )
}

export default SvgImage

const styles = StyleSheet.create({})