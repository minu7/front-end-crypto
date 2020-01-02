// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Registration } from 'sideEffects';
import dependencies from 'dependencies';

type Props = {
  registration: (string, string) => Promise<any>,
}

const RegistrationComponent = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loadingSignup, setLoadingSignup] = useState(false);

  return (
    <div className="container">
      <div className="signup">
        <h1>Signup</h1>
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
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
            type="password"
          />
        </div>
        <div className="input">
          <h3>
            confirm
            <br />
            password:
          </h3>
          <input
            value={passwordConfirm}
            onChange={event => {
              setPasswordConfirm(event.target.value);
            }}
            type="password"
          />
        </div>
        <button onClick={() => {
          if (loadingSignup) {
            return;
          }
          setLoadingSignup(true);

          password === passwordConfirm && props.registration(email, password).then(() => {
            setLoadingSignup(false);
          }).catch(error => {
            alert(`error: ${error}`);
            setLoadingSignup(false);
          });
        }}
        >
          {loadingSignup ? 'loading...' : 'signup'}
        </button>
        <br />
        <button onClick={() => {
          dependencies.Router.push('/login');
        }}
        >
          switch to login
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
          .signup {
            border-radius: 8px;
            padding: 20px;
            height: auto;
            width: 500px;
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
  registration: (email: string, passsword: string) => dispatch(Registration(email, passsword)),
});

export default connect(undefined, mapDisaptchToProps)(RegistrationComponent);
