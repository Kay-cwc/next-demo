import Head from 'next/head'
import React, {Component} from 'react'
import Router from "next/router";
import styles from '../styles/Home.module.css'
import api from "../components/api";

import { Button, FormControl, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      email: 'fill in your email',
      password: '',
      file: []
    }
  };

  
  uploadAction() {
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append("data", imagedata);

    fetch("http://127.0.0.1:8000/upload/upload/", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
      },
      body: data
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  }

  render () {
    return (
      <div className={styles.container}>

        <form encType="multipart/form-data" action="">
          <input type="file" name="fileName" defaultValue="fileName"></input>
          <input type="button" value="upload" onClick={this.uploadAction.bind(this)}></input>
        </form>

      </div>
    )
  }
}
