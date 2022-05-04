import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  App: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  App_header: {
    backgroundColor: '#262626',
    overflow: 'visible',
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  Messages_list: {
    padding: 20, //0
    maxWidth: 900,
    width: '100%',
    margin: '0 auto',
    listStyle: 'none',
    paddingLeft: 0,
    flexGrow: 1,
    overflow: 'auto',
  },
  Messages_message: {flexDirection: 'row', display: 'flex', marginTop: 10},
  Messages_message_currentMember: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    // textAlign: "right",
    // alignItems: "flex-end"
  },
  Message_content: {display: 'flex'},
  Message_content_current: {
    alignItems: 'flex-end',
  },
  Messages_message_avatar: {
    height: 35,
    width: 35,
    borderRadius: '50%',
    display: 'flex',
    margin: 0,
  },
  Message_content_username: {
    display: 'flex',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 4,
  },
  Message_content_text: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: 400,
    margin: 0,
    borderRadius: 12,
    backgroundColor: 'cornflowerblue',
    color: 'white',
    display: 'flex',
  },
  currentMember_Message_content_text: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: 400,
    margin: 0,
    borderRadius: 12,
    backgroundColor: 'orangered',
    //width: '100%',
    alignSelf: 'flex-end',
    //textAlign: 'right',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    maxWidth: '900',
    margin: '0 auto 40',
  },
  input: {
    padding: 5,
    fontSize: 16,
    borderRadius: 8,
    color: 'blue',
    //   border: 1,
    borderColor: `#ff4500`,
    flexGrow: 1,
  },
  button: {
    padding: 20,
    flex: 1,
    fontSize: 16,
    backgroundColor: `#ff4500`,
    color: 'white',
    // border: 'none',
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 1,
    minWidth: 300,
    elevation: 10,
    backgroundColor: 'cornflowerblue', //'#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
