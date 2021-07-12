import React, { Suspense } from 'react';
import './App.css';

const SideBar = React.lazy(() => import('./components/SideBar'));
const Content = React.lazy(() => import('./components/Content'));

const App: React.FC = () => {
  return (
    <div className="MyFavorites">
      <Suspense fallback={<div>Loading...</div>}>
        <SideBar />
        <Content numLoadingCards={9} />
      </Suspense>
    </div>
  );
};

export default App;
