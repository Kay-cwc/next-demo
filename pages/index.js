import Head from 'next/head'
import React, {Component} from 'react'
import Router from "next/router";
import styles from '../styles/Home.module.css'
import api from "../components/api";


export default class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      email: 'fill in your email',
      password: ''
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    }
    api.post('api/user/auth/login/', data)
      .then(res => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          console.log(res)
        }
        localStorage.setItem('LOGBOOK_AUTH_TOKEN', res.data.key)
        Router.push('/wishlist')
      })
      .catch(err => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          console.log(err.response)
        }
      })
  }


  render () {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section>
          <form onSubmit={this.handleSubmit}>
            <label>email</label>
            <input 
              type='text' 
              id='email'
              value={this.state.email}
              onChange={(e) => {
                this.setState({
                  email: e.target.value
                })
              }}
              /><br/>
            <label>password</label>
            <input 
              type='password'
              id='password' 
              value={this.state.password}
              onChange={(e) => {
                this.setState({
                  password: e.target.value
                })
              }}
              /><br/>
            <input 
              type='submit' 
              id='submit' 
              value='submit'
              />
          </form>
        </section>

      </div>
    )
  }
}
