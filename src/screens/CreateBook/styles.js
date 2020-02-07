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
