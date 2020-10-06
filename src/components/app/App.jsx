import React from 'react';
import { Route, Switch } from 'react-router';
import Opening from '../pages/Opening/Opening';
import Search from '../pages/Search/Search';
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Opening} />
      <Route path="/search-book" component={Search} />
    </Switch>
  );
}

export default App;
