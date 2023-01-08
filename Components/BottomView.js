import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

export default function BottomView({ name, setShow, show, sheetRef, renderContent }) {
    let fall = new Animated.Value(1);
    const closeBottomSheet = () => {
        setShow(false)
        sheetRef.current.snapTo(1)
    }


    return (
        <>
            <TouchableOpacity onPress={() => closeBottomSheet()} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: show ? 'flex' : 'none' }}>
            </TouchableOpacity>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[330, -100]}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                borderRadius={10}
                renderContent={renderContent}
                onCloseEnd={() => setShow(false)}
            />
        </>
    )
}

const styles = StyleSheet.create({})