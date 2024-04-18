import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import style from "./style";
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import {API_URL, getAllProducts, updateProduct} from "../../config/APIConfig";

const Details = ({navigation, route}) => {

    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const [nameEdit, setNameEdit] = useState(route.params.name)
    const [priceEdit, setPriceEdit] = useState(route.params.price)

    const idTask = route.params.id

    const editTask = async () => {
        try {
            await updateProduct(idTask, {
                name: nameEdit,
                description: descriptionEdit,
                price: parseFloat(priceEdit)
            });
            const jsonData = JSON.stringify(editProduct);
            await updateProduct(jsonData);
           navigation.navigate("Task");
        } catch (error) {
            console.error("Error editing task: ", error);
            return "Erro ao editar o produto: " + error.message;
        }
    };


    return (
        <View style={style.container}>
            <Text style={style.label}>Name</Text>
            <TextInput style={style.input} placeholder="Ex: Name" onChangeText={text => setNameEdit(text)} value={nameEdit} />

            <Text style={style.label}>Description</Text>
            <TextInput style={style.input} placeholder="Ex: Estudar Python" onChangeText={text => setDescriptionEdit(text)} value={descriptionEdit} />

            <Text style={style.label}>Price</Text>
            <TextInput style={style.input} placeholder="Ex: 0" onChangeText={text => setPriceEdit(text)} value={priceEdit} />

            <TouchableOpacity style={style.buttonNewTask} onPress={() => { editTask( nameEdit,priceEdit, descriptionEdit, idTask) }}>
                <Text style={style.iconButton}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Details