const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  modal: {
    overlay: {
      zIndex: 2,
    },
    content: {
      padding: 0,
      bottom: 'auto',
      borderRadius: 0,
      borderWidth: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ffffff',
    }
  },
  window: {
    width: 'auto',
    height: '100%',
    backgroundColor: '#ffffff',
    fontFamily: "'San Francisco', 'Helvetica Neue', 'Lucida Grande', Arial, sans-serif",
    fontSize: 13,
    alignItems: 'center',
  },
  switchLabel: {
    paddingTop: '5px',
    paddingLeft: '60px',
    paddingRight: '25px'
  },
  instances: {
    border: '1px solid #8A96A2',
    fontSize: '14px',
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    backgroundColor: 'rgb(79, 90, 101)',
    color: '#fff',
    width: '100%',
    height: '27px',
    marginTop: '3px'
  },
};

export default styles;
