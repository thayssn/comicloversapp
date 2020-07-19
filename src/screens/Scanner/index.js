import * as React from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getUserToken } from '../../services/auth';
import { Creators as activeBookActions } from '../../store/ducks/activeBook';
import api from '../../services/api';
import * as NavigationService from '../../services/navigation';

class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleBarCodeScanned = async ({ data }) => {
    this.setState({ scanned: true });
    const { changeBook } = this.props;

    try {
      const userToken = await getUserToken();
      const { data: book } = await api.get(`/books/isbn/${data}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      await changeBook(book);
    } catch (err) {
      // alert(`ISBN ${data} não cadastrado`);
      Alert.alert(
        'Oops!',
        `Parece que este quadrinho ainda não está no nosso sistema. Gostaria de cadastrá-lo agora?\nISBN:  ${data}`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => this.setState({ scanned: false }),
          },
          {
            text: 'Cadastrar', onPress: () => NavigationService.navigate('CreateBook', { isbn: data }),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {/* {scanned && (
          <Button title="Tap to Scan Again" onPress={() => this.setState({ scanned: false })} />
        )} */}
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(activeBookActions, dispatch);

export default connect(null, mapDispatchToProps)(Scanner);
