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
    paddingTop: 40,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  input_group: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#91d7dc',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
  link: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
  },
  button: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    margin: 10,
    marginVertical: 30,
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
