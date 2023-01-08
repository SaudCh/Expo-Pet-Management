import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomView from './BottomView';

export default function CusDatePicker({
    date,
    setDate,
    show,
    setShow,
    mode,
    dateRef
}) {

    // console.log('date', props)

    const renderContent = () => {
        return <View style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450
        }}>

            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={setDate}
            />
        </View>
    }

    return (
        <>
            {
                Platform.OS === 'ios' && (
                    <>
                        <BottomView
                            show={show}
                            setShow={setShow}
                            renderContent={renderContent}
                            sheetRef={dateRef}
                            name="date"
                        />
                    </>
                )
            }
            {
                Platform.OS === 'android' && show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                        }}
                    />
                )
            }
        </>
    )
}

const styles = StyleSheet.create({})