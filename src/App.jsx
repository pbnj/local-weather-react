import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Weather from './Weather';

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title="Local Weather"
          showMenuIconButton={false}
        />
        <Weather />
      </div>
    </MuiThemeProvider>
  );
}
