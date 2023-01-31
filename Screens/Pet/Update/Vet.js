import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomPicker from '../../../Components/CustomPicker'
import CusDatePicker from '../../../Components/DatePicker'
import { TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Vet({ route }) {

    const navigation = useNavigation()
    const { id } = route.params

    const [date, setDate] = React.useState(new Date());

    const [show, setShow] = React.useState(false);
    const dateRef = React.useRef(null);

    const [address, setAddress] = React.useState('')
    const [reason, setReason] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const addVacination = async () => {

        setLoading(true)

        await axios.post("pet/vet/add_appointment", {
            _id: id, AppointmentDate: date, address, reason
        }).then((res) => {
            console.log(res.data)
            navigation.goBack()
        }
        ).catch((err) => {
            console.log(err)
        }
        )

        setLoading(false)

    }


    return (
        <View style={{
            flex: 1,
        }}>

            <Text
                style={{
                    margin: 10,
                    marginBottom: 0,
                    fontSize: 16,
                }}
            >
                Reason
            </Text>
            <TextInput
                style={{
                    ...styles.textInput
                }}
                value={reason}
                onChangeText={setReason}
            />


            <Text
                style={{
                    margin: 10,
                    marginBottom: 0,
                    fontSize: 16,
                }}
            >
                Address
            </Text>
            <TextInput
                style={{
                    ...styles.textInput
                }}
                value={address}
                onChangeText={setAddress}
            />



            <Text
                style={{
                    margin: 10,
                    marginBottom: 0,
                    fontSize: 16,
                }}
            >
                Date
            </Text>
            <TouchableOpacity
                onPress={() => {
                    setShow(true)
                    dateRef.current.snapTo(0)
                }}
                style={{
                    ...styles.input
                }}
            >
                <Text>
                    {date.toLocaleTimeString()}
                </Text>
            </TouchableOpacity>


            <CusDatePicker
                date={date}
                setDate={setDate}
                show={show}
                setShow={setShow}
                mode="time"
                dateRef={dateRef}
            />

            <Button
                mode="contained"
                onPress={() => {
                    addVacination()
                }}
                style={{
                    width: 200,
                    marginTop: 20,
                    borderRadius: 4,
                    alignSelf: 'center'
                }}
                loading={loading}
                disabled={loading}
            >
                Save
            </Button>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 4,
        margin: 5,
        marginTop: 1,
        height: 40,
        justifyContent: 'center',
        padding: 10,
        borderColor: 'rgba(0,0,0,0.3)',
        backgroundColor: 'white'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 4,
        margin: 5,
        marginTop: 1,
        height: 40,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.3)'
    }
})