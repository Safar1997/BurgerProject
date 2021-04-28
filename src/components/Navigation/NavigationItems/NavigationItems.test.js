import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })

  it('Should render two <NavigationItem /> elements if not authentication', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('Should render three <NavigationItem /> elements if authentication', () => {
    //Проверим 
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('Should contain <NavigationItem /> element with link if authentication', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
  });
})