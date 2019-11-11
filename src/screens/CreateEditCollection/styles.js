import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 30,
  },
  inner_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingBottom: 30,
  },
  input_group: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
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
    fontWeight: '500',
  },
  selectButton: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFF',
    padding: 10,
  },
});

export default styles;
