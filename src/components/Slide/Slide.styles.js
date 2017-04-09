import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    fontSize: '54px',
    padding: 20,
  },

  contents: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
});
