import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import style from "./style";
import { addDoc, collection } from "firebase/firestore";
import {API_URL, createProduct} from "../../config/APIConfig";

const NewTask = ({navigation, route}, props) => {
    const [description, setDescription] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)

    const addTask = async () =>  {
        try {
            await createProduct({
                name: name,
                description: description,
                price: price
            });
            const jsonData = JSON.stringify(newProduct);
            await createProduct(jsonData);
            navigation.navigate("Task");
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    }



    return (
        <View style={style.container}>
            <Text style={style.label}>Name</Text>
            <TextInput style={style.input} placeholder="Ex: Nome" onChangeText={setName} value={name} />
            <Text style={style.label}>Description</Text>
            <TextInput style={style.input} placeholder="Ex: Estudar Python" onChangeText={setDescription} value={description} />
            <Text style={style.label}>Price</Text>
            <TextInput style={style.input} placeholder="0" onChangeText={setPrice} value={price} />
            <TouchableOpacity style={style.buttonNewTask} onPress={addTask}>
                <Text style={style.iconButton}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewTask