import React from 'react';
import Dashboard from './pages/Dashboard';

import GlobalStyles from './styles/globalStyles';

const App: React.FC = () => {
  return (
    <>
      <Dashboard />
      <GlobalStyles />
    </>
  );
};

export default App;
