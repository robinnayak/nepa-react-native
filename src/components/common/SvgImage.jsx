import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { SvgXml } from 'react-native-svg';
const SvgImage = () => {
    const generateAvatar = () => {
        const svg = createAvatar(avataaars, {
          seed: "Jasper",
          width: 100,
          height: 100,
        });
        return svg;
      };
      const svg = generateAvatar().toString();
  return (
    <>
      <SvgXml xml={svg} style={{ height: 140, width: 110 }} />
    </>
  )
}

export default SvgImage

const styles = StyleSheet.create({})