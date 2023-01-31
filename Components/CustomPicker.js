import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';

export default function CustomPicker({ value, onChange, options, handleDropdown, label }) {

    const deviceWidth = Dimensions.get('window').width
    return (
        <View>
            {
                Platform.OS === 'android' ?
                    <View style={{ alignSelf: 'center', borderWidth: 1, borderRadius: 4, marginTop: 10, height: 40, width: deviceWidth - 60, justifyContent: 'center' }}>
                        <Picker
                            style={{ height: 50, width: deviceWidth - 50 }}
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            {
                                options.map((item, index) => {
                                    return (
                                        <Picker.Item label={item} value={item} key={index} />
                                    )
                                }
                                )
                            }
                        </Picker>

                    </View>
                    :
                    <TouchableOpacity
                        onPress={
                            () => {
                                handleDropdown()
                            }
                        }
                        style={{ alignSelf: 'center', borderWidth: 1, borderRadius: 4, marginTop: 10, height: 40, width: deviceWidth - 60, justifyContent: 'center' }}>
                        {value ?
                            <Text style={{ marginStart: 10 }}>{value}</Text>
                            :
                            <Text
                                style={{
                                    color: 'rgba(0,0,0,0.3)',
                                    marginStart: 10,
                                }}
                            >
                                Select {label}
                            </Text>}
                    </TouchableOpacity>
            }

        </View>
    )
}

const styles = StyleSheet.create({})