import { Component } from "react";
import Layout from './hoc/Layout/Layout';
import BurgerBulder from './containers/BurgerBulder/BurgerBulder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBulder />
        </Layout>
      </div>
    );
  }
}

export default App;
