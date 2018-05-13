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
import AddPasswordForm from '../components/AddPasswordForm';

global.localStorage = new LocalStorageMock

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
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

describe('<NavBar />', () => {
  describe('<RegisterForm />', () => {
    let registerForm

    beforeAll(() => {
      registerForm = mount(<RegisterForm store={store} />)
    })


    it('should render a RegisterForm modal with email & password textbox', () => {
      expect(registerForm.contains(<form/>)).toBeTruthy
      expect(registerForm.contains(<input id="registerEmail"/>)).toBeTruthy
      expect(registerForm.contains(<input id="registerPassword"/>)).toBeTruthy
      expect(registerForm.contains(<button type="submit"/>)).toBeTruthy
    });

    it('should have empty states of email & password', () => {
      expect(registerForm.state('email')).toBe('')
      expect(registerForm.state('password')).toBe('')
    });

    it('onChange should change email state', () => {
      registerForm.find('#registerEmail').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })

      expect(registerForm.state('email')).toBe('test@email.com')
    });

    it('onChange should change password state', () => {
      registerForm.find('#registerPassword').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })

      expect(registerForm.state('password')).toBe('konde123')
    });

    it.skip('onSubmit should dispatch userRegister, then clearState', () => {
      registerForm.find('#form').simulate('submit')
    });

    it('clearState() should clear email & password state', () => {
      registerForm.find('#registerEmail').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })
      registerForm.find('#registerPassword').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })
      registerForm.instance().clearState()

      expect(registerForm.state('email')).toBe('')
      expect(registerForm.state('password')).toBe('')
    });
  });
  
  describe('<LoginForm />', () => {
    let loginForm
    beforeAll(() => {
      loginForm = mount(<LoginForm />)
    })

    it('should render a LoginForm modal with email & password textbox', () => {
      expect(loginForm.contains(<form/>)).toBeTruthy
      expect(loginForm.contains(<input id="loginEmail"/>)).toBeTruthy
      expect(loginForm.contains(<input id="loginPassword"/>)).toBeTruthy
      expect(loginForm.contains(<button type="submit"/>)).toBeTruthy
    });

    it('should have empty states of email & password', () => {
      expect(loginForm.state('email')).toBe('')
      expect(loginForm.state('password')).toBe('')
    });

    it('onChange should change email state', () => {
      loginForm.find('#loginEmail').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })

      expect(loginForm.state('email')).toBe('test@email.com')
    });

    it('onChange should change password state', () => {
      loginForm.find('#loginPassword').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })

      expect(loginForm.state('password')).toBe('konde123')
    });

    it('clearState() should clear email & password state', () => {
      loginForm.find('#loginEmail').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })
      loginForm.find('#loginPassword').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })
      loginForm.instance().clearState()

      expect(loginForm.state('email')).toBe('')
      expect(loginForm.state('password')).toBe('')
    });
  });
});

describe('<Home />', () => {
  const home = mount(<Home store={store} />)

  describe('<AddPasswordForm />', () => {
    let addPassForm

    beforeAll(() => {
      addPassForm = mount(shallow(<AddPasswordForm store={store}/>).get(0))
    })

    it('should render AddPasswordForm successfully', () => {
      expect(addPassForm.contains(<form/>)).toBeTruthy
      expect(addPassForm.contains(<input id="url"/>)).toBeTruthy
      expect(addPassForm.contains(<input id="username"/>)).toBeTruthy
      expect(addPassForm.contains(<input id="password"/>)).toBeTruthy
      expect(addPassForm.contains(<button type="submit"/>)).toBeTruthy
    });

    it('should have empty states of url, usernam, & password', () => {
      expect(addPassForm.state('url')).toBe('')
      expect(addPassForm.state('username')).toBe('')
      expect(addPassForm.state('password')).toBe('')
    });

    it('should have password validity state default to false', () => {
      expect(addPassForm.state('validPassword')).toBeFalsy
      expect(addPassForm.state('containUppercase')).toBeFalsy
      expect(addPassForm.state('containLowercase')).toBeFalsy
      expect(addPassForm.state('containSpecialChar')).toBeFalsy
      expect(addPassForm.state('containNumber')).toBeFalsy
      expect(addPassForm.state('containMinLength')).toBeFalsy
    });

    it('onChange should change password state & validity value', () => {
      addPassForm.find('#url').simulate('change', {
        target: { name: 'url', value: 'www.hacktiv8.com'}
      })
      addPassForm.find('#username').simulate('change', {
        target: { name: 'username', value: 'user'}
      })
      addPassForm.find('#password').simulate('change', {
        target: { name: 'password', value: 'K0nde123!'}
      })

      expect(addPassForm.state('url')).toBe('www.hacktiv8.com')
      expect(addPassForm.state('username')).toBe('user')
      expect(addPassForm.state('password')).toBe('K0nde123!')
      expect(addPassForm.state('validPassword')).toBeTruthy
      expect(addPassForm.state('containUppercase')).toBeTruthy
      expect(addPassForm.state('containLowercase')).toBeTruthy
      expect(addPassForm.state('containSpecialChar')).toBeTruthy
      expect(addPassForm.state('containNumber')).toBeTruthy
      expect(addPassForm.state('containMinLength')).toBeTruthy
    });

    it('handleValidation() should change state validPassword', () => {
      addPassForm.instance().handleValidation('K0nde123!')

      expect(addPassForm.state('validPassword')).toBeTruthy
    });

    it('clearState() should clear component state', () => {
      addPassForm.instance().clearState()

      expect(addPassForm.state('url')).toBe('')
      expect(addPassForm.state('username')).toBe('')
      expect(addPassForm.state('password')).toBe('')
      expect(addPassForm.state('validPassword')).toBeFalsy
      expect(addPassForm.state('containUppercase')).toBeFalsy
      expect(addPassForm.state('containLowercase')).toBeFalsy
      expect(addPassForm.state('containSpecialChar')).toBeFalsy
      expect(addPassForm.state('containNumber')).toBeFalsy
      expect(addPassForm.state('containMinLength')).toBeFalsy
    });

  });
});