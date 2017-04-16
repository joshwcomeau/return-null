import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  toggleButtonGroup: {
    display: 'flex',
  },

  button: {
    flex: 1,
    fontSize: '22px',
    padding: '1rem',
    border: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.15)',
    borderTop: '1px solid rgba(255,255,255,0.35)',
    backgroundColor: '#EEE',
    color: '#333',
    boxShadow: '0px 6px 20px rgba(0,0,0,0.25)',

    ':first-of-type': {
      marginRight: '1.5rem',
    }
  },

  active: {
    background: '#007bb9',
    color: 'white',
  },
});
