import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  inner_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#40B89D',
    borderColor: '#91d7dc',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    marginVertical: 30,
    borderRadius: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
  },
  loading: {
    color: '#FFF',
  },
  error: {
    color: '#C22',
    fontSize: 16,
  },
});

export default styles;
