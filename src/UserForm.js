import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addUser, updateUser } from './Actions';

class UserFormScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            note: "",
            editTable: false
        }
    }

    componentDidMount() {
        const { params } = this.props.route;
        if(params && params.editTable) {
            this.setState({ id: params.item.id, name: params.item.name, note: params.item.note });
        }
        this.setState({ editTable: params.editTable });
    }

    onAddUser = () => {
        const { name, note } = this.state;
        if (name && note) {
            var randomNumber = Math.floor(Math.random() * 100) + 1;
            let user = {
                id: randomNumber, name, note
            }
            this.props.addUser(user, this.props.navigation);
        } else {
            alert('Please all fields required')
        }
    }

    onEditUser = () => {
        const { id, name, note } = this.state;
        if (name && note) {
            let user = {
                id, name, note
            }
            this.props.updateUser(user, this.props.navigation);
        } else {
            alert('Please all fields required')
        }
    }

    render() {
        const { name, note, editTable } = this.state;
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, marginTop: 20 }}>
                    <TextInput
                        onChangeText={(text) => this.setState({ name: text })}
                        placeholder={"Enter user name"}
                        autoFocus={true}
                        style={styles.name}
                        value={name}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({ note: text })}
                        placeholder={"Enter note"}
                        style={styles.note}
                        value={note}
                    />
                </View>
                <TouchableOpacity style={[styles.saveBtn]}
                    disabled={(name.length > 0 && name.length > 0) ? false : true}
                    onPress={() => editTable ? this.onEditUser() : this.onAddUser()}
                    >
                    <Text style={[styles.buttonText,{  color: (note.length > 0 && note.length > 0) ? "#FFF" : "rgba(255,255,255,.5)" }]}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    saveBtn: {
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },
    buttonText: {
        fontWeight: "500",
    },
    note: {
        fontSize: 16,
        color: "#333333",
        padding: 15,
        height: 300,
        marginBottom: 50,
        borderWidth: 1,
        borderColor: "#6B9EFA",
        textAlignVertical: 'top'
    },
    name: {
        marginBottom: 10,
        padding: 15,
        fontSize: 16,
        height: 25 + 32,
        borderWidth: 1,
        borderColor: "#6B9EFA",
    },
});

const mapStateToProps = (state) => {
    const { userList } = state.user;
    return {
        userList
    }
}

export default connect(mapStateToProps, { addUser, updateUser })(UserFormScreen);