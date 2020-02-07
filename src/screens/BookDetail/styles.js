import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover_image: {
    width: 100,
    height: 150,
    backgroundColor: '#DEDEDE',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoView: {
    flex: 1,
    paddingLeft: 15,
  },
  statusView: {
    flexDirection: 'row',
    padding: 15,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: '300',
    marginVertical: 5,
  },
  tabWrapper: {
    flex: 1,
    padding: 15,
  },
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#20AEC0',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabItem: {
    height: 40,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    fontSize: 14,
    height: 30,
  },
  dropdownHas: {
    borderWidth: 2,
    borderColor: '#20AEC0',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default styles;
