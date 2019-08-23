import * as React from 'react';
import {
  Text, View, StyleSheet, Button,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../services/api';


export default class BarcodeScannerExample extends React.Component {
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
    // const { navigation } = this.props;
    console.log(data);

    try {
      const { data: book } = await api.get(`/books/isbn/${data}`);
      alert(`ISBN : ${data}, ${book.title}`);
    } catch (err) {
      alert(`ISBN ${data} não cadastrado`);
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

        {scanned && (
          <Button title="Tap to Scan Again" onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }
}
