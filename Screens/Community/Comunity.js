import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { AuthContext } from '../../Components/Context/AuthContext';
import { HeaderLogo } from '../../Components/Logo';

function Comunity({ navigation }) {
    const [name, setName] = useState(null);
    const [list, setList] = useState([]);
    const { user } = React.useContext(AuthContext);

    const [show, setShow] = useState([
        { status: false }
    ])
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const addPost = async () => {
        if (name === null) {
            return;
        }

        if (image) {
            const ext = image.split('.').pop();
            const filename = `${user._id}.${ext}`;
            const file = {
                uri: image,
                name: filename.trim(),
                type: `image/${ext}`,
            };

            let fData = new FormData();
            fData.append("upload_preset", "da02ej7p");
            fData.append("file", file);
            fData.append("cloud_name", "depwj5d5a");

            setLoading(true)
            let img = await axios
                .post("https://api.cloudinary.com/v1_1/depwj5d5a/image/upload", fData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                })
                .then((res) => {
                    return res?.data ? res.data.secure_url : "";
                })
                .catch((err) => {
                    console.log(err?.response?.data.message || err.message);
                });

            setLoading(false)
            if (!img) {
                alert("Image upload failed");
                return
            }

            const nP = [...list]
            setList([{ user: user, content: name, comments: [], likes: [], Image: img }, ...list])


            await axios.post("community/post", { content: name, userId: user._id, Image: image }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
                setList(nP)
            })

        } else {
            const nP = [...list]
            setList([{ user: user, content: name, comments: [], likes: [], Image: "" }, ...list])


            await axios.post("community/post", { content: name, userId: user._id, Image: "" }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
                setList(nP)
            })

        }

        setName("")
    }



    useEffect(() => {
        const getCoummunity = async () => {
            await axios.get("community/showAllPosts").then((res) => {
                var response = res.data;
                setList(res.data.data)
                setShow(res.data.data.map((item) => {
                    return { status: false }
                }))
                // console.log(response.data[0].comments);
            }).catch((err) => {
                console.log(err);
            })

        }
        getCoummunity();
    }, [])

    const addComment = async (index, id) => {
        if (comment === "") {
            return;
        }

        setList(list.map((item, i) => {
            if (i === index) {
                return { ...item, comments: [...item.comments, { user: user, content: comment }] }
            } else {
                return item;
            }
        }))
        setComment("")

        await axios.post("community/comment", { _id: id, content: comment, userId: user._id }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const likePost = async (index, id) => {
        setList(list.map((item, i) => {
            if (i === index) {
                return { ...item, likes: item.likes.filter((like) => like.userId !== user._id) }
            } else {
                return item;
            }
        }))

        await axios.post("community/like", { _id: id, userId: user._id }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const unlikePost = async (index, id) => {
        setList(list.map((item, i) => {
            if (i === index) {
                return { ...item, likes: [...item.likes, { userId: user._id }] }
            } else {
                return item;
            }
        }))

        await axios.post("community/dislike", { _id: id, userId: user._id }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <SafeAreaView style={{ paddingTop: 37 }}>
            {loading &&
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            <ScrollView>


                <View style={{ flex: 1 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <HeaderLogo />

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TextInput
                            label={'Product Name'}
                            mode='outlined'
                            width={250}
                            height={40}
                            style={{ height: 40 }}
                            onChangeText={setName}
                            value={name}
                            placeholder="Product Name"
                            keyboardType="text"
                        />
                        <TouchableOpacity style={{ width: 50, alignItems: 'center' }}
                            onPress={pickImage}
                        >
                            <AntDesign name="camera" color={'grey'} size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 80, height: 40, backgroundColor: '#54b325', marginTop: 5, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => { addPost() }}>
                            <Text style={{ color: "white", textAlign: 'center', fontSize: 15 }}>POST</Text>
                        </TouchableOpacity>

                    </View>

                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {

                            const isLiked = item.likes.find((like) => like.userId === user._id);
                            return (
                                <View style={{ flexDirection: 'column', margin: 10, backgroundColor: '#fff', borderRadius: 20, padding: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Image
                                            source={{ uri: item.user.Image }}
                                            resizeMode='stretch'
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 40,
                                                overflow: "hidden",
                                                borderWidth: 1,
                                                padding: 5,
                                                borderColor: "#DCDDDF"
                                            }}
                                        />


                                        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10 }}>{item.user.name}</Text>

                                    </View>

                                    <Text style={{ marginVertical: 5, textAlign: 'center', fontSize: 14, fontWeight: 'normal', fontStyle: 'italic' }}>{item.content}</Text>

                                    {
                                        item.Image !== "" &&
                                        <Image
                                            source={{ uri: item.Image }}
                                            resizeMode='stretch'
                                            style={{ marginTop: 10, height: 200, width: '100%', alignSelf: 'center' }} />
                                    }



                                    <View style={{ elevation: 2, padding: 10, borderColor: "#DCDDDF", borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        {isLiked
                                            ?
                                            <TouchableOpacity onPress={() => {
                                                likePost(index, item._id)
                                            }}>
                                                < AntDesign name="like2" color={'grey'} size={24} />
                                                <Text>Like</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => {
                                                unlikePost(index, item._id)
                                            }}>
                                                < AntDesign name="like1" color={'grey'} size={24} />
                                            </TouchableOpacity>

                                        }

                                        <TouchableOpacity onPress={() => {
                                            setComment("")
                                            setShow(show.map((item, i) => {
                                                if (i === index) {
                                                    return { status: !item.status }
                                                } else {
                                                    return { status: false }
                                                }
                                            }))

                                        }}>
                                            <MaterialCommunityIcons name="message-reply-outline" color={'grey'} size={24} />
                                        </TouchableOpacity>


                                    </View>
                                    {
                                        show[index]?.status &&
                                        <View style={{ elevation: 2, padding: 10, borderColor: "#DCDDDF", borderWidth: 1, justifyContent: 'space-around' }}>
                                            {item.comments.map((comment) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', width: "100%", padding: 10, borderBottomWidth: 1 }}>
                                                        <Image
                                                            source={{ uri: comment.user.Image }}
                                                            resizeMode='stretch'
                                                            style={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 40,
                                                                overflow: "hidden",
                                                                borderWidth: 1,
                                                                padding: 5,
                                                                borderColor: "#DCDDDF"
                                                            }} />
                                                        <View>
                                                            <Text style={{ marginStart: 10 }}>{comment.user.name}</Text>
                                                            <Text style={{ marginStart: 10 }}>{comment.content}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                            }
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    mode='outlined'
                                                    width={250}
                                                    height={40}
                                                    style={{ height: 40 }}
                                                    onChangeText={(name) => { setComment(name) }}
                                                    value={comment}
                                                    placeholder="Enter your comment"
                                                    keyboardType="text"
                                                />

                                                <TouchableOpacity style={{ width: 80, height: 40, backgroundColor: '#54b325', marginTop: 7, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                                                    onPress={() => {
                                                        addComment(index, item._id)
                                                    }}>
                                                    <Text style={{ color: "white", textAlign: 'center', fontSize: 15 }}>POST</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    }
                                </View>
                            )
                        }}
                    />

                </View>
            </ScrollView >

        </SafeAreaView>
    )
}

export default Comunity;
