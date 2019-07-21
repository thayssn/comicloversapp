import React, { Component } from 'react'; // eslint-ignore
import {
  Text, View, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from '../../components/Form';
import { Creators as collectionActions } from '../../store/ducks/collections';

import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import styles from './styles';

class NewCollection extends Component {
  state = {
    name: '',
    description: '',
    error: null,
  }

  handleCollectionCreation = () => {
    const { createCollection } = this.props;
    const { name, description } = this.state;
    if (!name) {
      this.setState({ error: 'Título obrigatório.' });
      return;
    }
    createCollection({ name, description });
  }

  render() {
    const { loading } = this.props;
    const { name, description, error } = this.state;
    return (
      <View style={styles.container}>
        <CLGradient />
        { loading
          ? <Loading />
          : (
            <>
              <View style={styles.input_group}>
                { error && <Text style={styles.error}>{error}</Text> }

                <TextInput
                  placeholder="título"
                  value={name}
                  onChangeText={(value) => { this.setState({ name: value }); }}
                />

                <TextInput
                  placeholder="descrição"
                  value={description}
                  multiline
                  numberOfLines={10}
                  onChangeText={(value) => { this.setState({ description: value }); }}
                  style={{ height: 300 }}
                />

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.handleCollectionCreation()}
                  underlayColor="rgba(255,255,255,.2)"
                >
                  <Text style={styles.text}>Criar Coleção</Text>
                </TouchableHighlight>
              </View>
            </>
          )
          }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
});
const mapDispatchToProps = dispatch => bindActionCreators(collectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewCollection);
