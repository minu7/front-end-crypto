// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Login } from 'sideEffects';
import dependencies from 'dependencies';

type Props = {
  login: (string, string) => Promise<any>,
}

const LoginComponent = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  return (
    <div className="container">
      <div className="login">
        <h1>login</h1>
        <div className="input">
          <h3>email:</h3>
          <input
            value={email}
            onChange={event => {
              setEmail(event.target.value);
            }}
            type="text"
          />
        </div>
        <div className="input">
          <h3>password:</h3>
          <input
            type="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button onClick={() => {
          if (loadingLogin) {
            return;
          }
          setLoadingLogin(true);
          props.login(email, password).then(() => {
            setLoadingLogin(false);
          }).catch(error => {
            alert(`error: ${error}`);
            setLoadingLogin(false);
          });
        }}
        >
          {loadingLogin ? 'loading...' : 'login'}
        </button>
        <br />
        <button onClick={() => {
          dependencies.Router.push('/signup');
        }}
        >
          switch to signup
        </button>
      </div>
      <style jsx>
        {`
          h1 {
            width: 100%;
            text-align: center;
          }
          .container {
            height: 80vh;
            width: 100%;
            align-items: center;
            justify-content: center;
            display: flex;
          }
          .input {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 15px;
          }
          input {
            height: 40px;
            width: 60%;
            border-radius: 8px;
            font-size: 20px;
          }
          h3 {
            margin: 0px;
            margin-right: 15px;
          }
          .login {
            border-radius: 8px;
            padding: 20px;
            height: auto;
            width: 400px;
            dispaly: flex;
            direction: column;
            background-color: #dddddd;
            font-size: 22px;
          }
          button {
            margin-top: 15px;
            margin-left: 10%;
            border-radius: 8px;
            width: 80%;
            height: 40px;
            font-size: 20px;
          }
        `}
      </style>
    </div>
  );
};

const mapDisaptchToProps = (dispatch) => ({
  login: (email: string, passsword: string) => dispatch(Login(email, passsword)),
});

export default connect(undefined, mapDisaptchToProps)(LoginComponent);
