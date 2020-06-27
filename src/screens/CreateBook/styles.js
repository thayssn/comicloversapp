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
  label: {
    fontSize: 18,
    color: '#91d7dc',
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
  errorView: {
    marginVertical: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 10,
    borderColor: '#91d7dc',
    padding: 40,
  },
  modalTxt: {
    fontSize: 28,
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#40B89D',
    borderColor: '#91d7dc',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonTxt: {
    color: '#fff',
  },
});

export default styles;
