import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import * as firebase from 'firebase';

import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LocalStorageMock from '../config/localStorageMock';

import NavBar from '../components/NavBar';
import Home from '../views/Home';

// REGISTER
import RegisterForm from '../components/RegisterForm';
import { userRegister, userRegisterDone } from '../store/user/actions';

import LoginForm from '../components/LoginForm';
import AddPasswordForm from '../components/AddPasswordForm';

global.localStorage = new LocalStorageMock
import { wrap } from 'module';
import PasswordList from '../components/PasswordList';
import EditPasswordForm from '../components/EditPasswordForm';
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
      registerForm = mount(shallow(<RegisterForm store={store}/>).get(0))
    })

    it('should render a RegisterForm modal with email & password textbox', () => {
      expect(registerForm.contains(<form id="registerForm"/>)).toBeTruthy
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

    it('onSubmit should dispatch userRegister, then clearState', () => {
      const instance = registerForm.instance()
      const handleSubmit = jest.spyOn(instance, 'handleSubmit')

      registerForm.find('#registerEmail').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })
      registerForm.find('#registerPassword').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })

      expect(registerForm.state('email')).toBe('test@email.com')
      expect(registerForm.state('password')).toBe('konde123')

      registerForm.find('#registerForm').simulate('submit')
      expect(handleSubmit).toBeCalled()

      expect(registerForm.state('email')).toBe('')
      expect(registerForm.state('password')).toBe('')
    });
  });
  
  describe('<LoginForm />', () => {
    let loginForm
    beforeAll(() => {
      loginForm = mount(shallow(<LoginForm store={store}/>).get(0))
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

    it('onSubmit should dispatch userLogin, then clearState', () => {
      const instance = loginForm.instance()
      const handleSubmit = jest.spyOn(instance, 'handleSubmit')

      loginForm.find('#loginEmail').simulate('change', {
        target: { name: 'email', value: 'test@email.com'}
      })
      loginForm.find('#loginPassword').simulate('change', {
        target: { name: 'password', value: 'konde123'}
      })

      expect(loginForm.state('email')).toBe('test@email.com')
      expect(loginForm.state('password')).toBe('konde123')

      loginForm.find('#loginForm').simulate('submit')

      expect(handleSubmit).toBeCalled()
      expect(loginForm.state('email')).toBe('')
      expect(loginForm.state('password')).toBe('')
    });
  });
});

describe('<Home />', () => {
  let home

  beforeAll(() => {
    home = mount(shallow(<Home store={store}/>).get(0))
  })

  describe('<Home /> Will Mount', () => {
    it('should setLogin if token is exist', () => {
      global.localStorage.setItem('token', 'token')
      home.instance().componentWillMount()
    });
  });

  describe('<Home /> Will Update', () => {
    it('should dispatch action loadData', () => {
      home.instance().componentDidUpdate()
    });
  });

  describe('<AddPasswordForm />', () => {
    let addPassForm

    beforeAll(() => {
      addPassForm = mount(shallow(
        <AddPasswordForm
          store={store}
          userId={'userId'}
        />
      ).get(0))
    })

    it('should render AddPasswordForm successfully', () => {
      expect(addPassForm.contains(<form />)).toBeTruthy
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
      addPassForm.find('#inputUrl').simulate('change', {
        target: { name: 'url', value: 'www.hacktiv8.com'}
      })
      addPassForm.find('#inputUsername').simulate('change', {
        target: { name: 'username', value: 'user'}
      })
      addPassForm.find('#inputPassword').simulate('change', {
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

    it.skip('onSubmit should dispatch inputData', () => {
      addPassForm.find('#inputUrl').simulate('change', {
        target: { name: 'url', value: 'www.hacktiv8.com'}
      })
      addPassForm.find('#inputUsername').simulate('change', {
        target: { name: 'username', value: 'user'}
      })
      addPassForm.find('#inputPassword').simulate('change', {
        target: { name: 'password', value: 'K0nde123!'}
      })

      expect(addPassForm.state('url')).toBe('www.hacktiv8.com')
      expect(addPassForm.state('username')).toBe('user')
      expect(addPassForm.state('password')).toBe('K0nde123!')

      addPassForm.find('#inputData').simulate('submit')

      expect(addPassForm.state('url')).toBe('')
      expect(addPassForm.state('username')).toBe('')
      expect(addPassForm.state('password')).toBe('')
    });

  });

  describe('<PasswordList />', () => {
    let passwordList

    beforeAll(() => {
      passwordList = mount(shallow(<PasswordList store={store}/>).get(0))
    })
    
    it('should render PasswordList successfully', () => {
      expect(passwordList.contains(<div id="passwordList" />)).toBeTruthy
      expect(passwordList.contains(<input id="searchPassword" />)).toBeTruthy
      expect(passwordList.contains(<table id="tablePassword" />)).toBeTruthy
    });

    it('onChange should change searchKey state', () => {
      passwordList.find('#searchPassword').simulate('change', {
        target: { name: 'searchKey', value: 'search'}
      })

      expect(passwordList.state('searchKey')).toBe('search')
    });
  });

  describe('<EditPasswordForm />', () => {
    let editPassForm

    beforeAll(() => {
      let data = {
        id: '001',
        url: 'www.hacktiv8.com',
        username: 'username',
        password: 'Konde123$'
      }

      editPassForm = mount(shallow(
        <EditPasswordForm
          store={store}
          data={data}
        />).get(0))
    })

    it('should render EditPasswordForm successfully', () => {
      expect(editPassForm.contains(<form id="editData" />))
      expect(editPassForm.contains(<input id="editUrl" />))
      expect(editPassForm.contains(<input id="editUsername" />))
      expect(editPassForm.contains(<input name="password" />))
      expect(editPassForm.contains(<button type="submit" />))
    });

    it('should have initial states value of url, username, & password', () => {
      expect(editPassForm.state('url')).toBe('www.hacktiv8.com')
      expect(editPassForm.state('username')).toBe('username')
      expect(editPassForm.state('password')).toBe('Konde123$')
    });

    it('should have password validity state default to false', () => {
      expect(editPassForm.state('validPassword')).toBeFalsy
      expect(editPassForm.state('containUppercase')).toBeFalsy
      expect(editPassForm.state('containLowercase')).toBeFalsy
      expect(editPassForm.state('containSpecialChar')).toBeFalsy
      expect(editPassForm.state('containNumber')).toBeFalsy
      expect(editPassForm.state('containMinLength')).toBeFalsy
    });

    it('onChange should change password state & validity value', () => {
      editPassForm.find('#editUrl').simulate('change', {
        target: { name: 'url', value: 'www.hacktiv8.com'}
      })
      editPassForm.find('#editUsername').simulate('change', {
        target: { name: 'username', value: 'user'}
      })
      editPassForm.find('#pass001').simulate('change', {
        target: { name: 'password', value: 'K0nde123!'}
      })

      expect(editPassForm.state('url')).toBe('www.hacktiv8.com')
      expect(editPassForm.state('username')).toBe('user')
      expect(editPassForm.state('password')).toBe('K0nde123!')
      expect(editPassForm.state('validPassword')).toBeTruthy
      expect(editPassForm.state('containUppercase')).toBeTruthy
      expect(editPassForm.state('containLowercase')).toBeTruthy
      expect(editPassForm.state('containSpecialChar')).toBeTruthy
      expect(editPassForm.state('containNumber')).toBeTruthy
      expect(editPassForm.state('containMinLength')).toBeTruthy
    });

    it('handleValidation() should change state validPassword', () => {
      editPassForm.instance().handleValidation('K0nde123!')

      expect(editPassForm.state('validPassword')).toBeTruthy
    });

    it.skip('onSubmit should dispatch inputData', () => {
      editPassForm.find('#editUrl').simulate('change', {
        target: { name: 'url', value: 'www.hacktiv8.com'}
      })
      editPassForm.find('#editUsername').simulate('change', {
        target: { name: 'username', value: 'user'}
      })
      editPassForm.find('#pass001').simulate('change', {
        target: { name: 'password', value: 'K0nde123!'}
      })

      expect(editPassForm.state('url')).toBe('www.hacktiv8.com')
      expect(editPassForm.state('username')).toBe('user')
      expect(editPassForm.state('password')).toBe('K0nde123!')

      editPassForm.find('button').simulate('submit')

      expect(editPassForm.state('url')).toBe('')
      expect(editPassForm.state('username')).toBe('')
      expect(editPassForm.state('password')).toBe('')
    });
  });

  describe('<PasswordItem />', () => {
    it('should render PasswordItem successfully', () => {
      
    });
  });
});