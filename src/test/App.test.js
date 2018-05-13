import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LocalStorageMock from '../config/localStorageMock';

import NavBar from '../components/NavBar';
import Home from '../views/Home';

// REGISTER
import { RegisterForm } from '../components/RegisterForm';
import { userRegister, userRegisterDone } from '../store/user/actions';

import { LoginForm } from '../components/LoginForm';

global.localStorage = new LocalStorageMock

Enzyme.configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = mount(
      <Provider store={store}>
        <App/>
      </Provider>
    )
    ReactDOM.render(wrapper, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render components NavBar & Home', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.containsMatchingElement([
      <NavBar/>,
      <Home/>
    ])).toBeTruthy
  });
});

describe('<NavBar/>', () => {
  const registerForm = mount(<RegisterForm store={store} />)
  const loginForm = shallow(<LoginForm />)

  describe('<RegisterForm />', () => {
    it('should render a RegisterForm modal with email & password textbox', () => {
      expect(registerForm.contains(<form/>)).toBeTruthy
      expect(registerForm.contains(<input id="email"/>)).toBeTruthy
      expect(registerForm.contains(<input id="password"/>)).toBeTruthy
      expect(registerForm.contains(<button type="submit"/>)).toBeTruthy
    });

    it('should have empty states of email & password', () => {
      expect(registerForm.state('email')).toBe('')
      expect(registerForm.state('password')).toBe('')
    });

    it('onChange should change email state', () => {
      registerForm.find('#email').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })

      expect(registerForm.state('email')).toBe('test@email.com')
    });

    it('onChange should change password state', () => {
      registerForm.find('#password').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })

      expect(registerForm.state('password')).toBe('konde123')
    });

    it('clearState() should clear email & password state', () => {
      registerForm.find('#email').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })
      registerForm.find('#password').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })
      registerForm.instance().clearState()

      expect(registerForm.state('email')).toBe('')
      expect(registerForm.state('password')).toBe('')
    });
  });
  
  describe('<LoginForm />', () => {
    it('should render a LoginForm modal with email & password textbox', () => {
      expect(loginForm.contains(<form/>)).toBeTruthy
      expect(loginForm.contains(<input id="email"/>)).toBeTruthy
      expect(loginForm.contains(<input id="password"/>)).toBeTruthy
      expect(loginForm.contains(<button type="submit"/>)).toBeTruthy
    });

    it('should have empty states of email & password', () => {
      expect(loginForm.state('email')).toBe('')
      expect(loginForm.state('password')).toBe('')
    });

    it('onChange should change email state', () => {
      loginForm.find('#email').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })

      expect(loginForm.state('email')).toBe('test@email.com')
    });

    it('onChange should change password state', () => {
      loginForm.find('#password').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })

      expect(loginForm.state('password')).toBe('konde123')
    });

    it('clearState() should clear email & password state', () => {
      loginForm.find('#email').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })
      loginForm.find('#password').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })
      loginForm.instance().clearState()

      expect(loginForm.state('email')).toBe('')
      expect(loginForm.state('password')).toBe('')
    });
  });
});