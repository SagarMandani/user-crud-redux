import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import UserData from './UserData';
import { connect } from 'react-redux';
import { getUser, deleteUser } from './Actions';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userList) {
            this.setState({ userData: nextProps.userList })
        }
    }

    onDeleteUser = (item) => {
        this.props.deleteUser(item.id);
    }

    renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.userName}>
                            {item.name}
                        </Text>
                        <Text style={styles.userNote}>
                            {item.note}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('User Form', { editTable: true, item })}>
                            <Image source={require('./img/edit.png')} style={{ height: 25, width: 25, marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onDeleteUser(item)}>
                            <Image source={require('./img/delete.png')} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { userData } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    ref='listRef'
                    data={userData}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()} />

                <TouchableOpacity style={styles.addButton}
                    underlayColor='#ff7043' onPress={() => navigation.navigate('User Form', { editTable: false })}>
                    <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },
    userNote: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10
    },
    userName: {
        marginTop: 5,
        fontSize: 14,
    },
    addButton: {
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});

const mapStateToProps = (state) => {
    const { userList } = state.user;
    return {
        userList
    };
};


export default connect(mapStateToProps, {
    getUser, deleteUser
})(HomeScreen);