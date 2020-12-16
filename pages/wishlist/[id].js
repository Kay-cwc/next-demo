import React, { Component } from 'react'
import Link from 'next/link'
import api, { rootUrl } from "../../components/api";
import utilStyles from "../../styles/utils.module.css";
import { Icon } from 'semantic-ui-react';

class food extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foodDetail: {

      }
    }
  }

  static async getInitialProps ({query}) {
    console.log(query.id)
    return {
      pid: query.id
    }
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = () => {
    console.log(this.props)
    let header = {
      Authorization: 'TOKEN ' + localStorage.getItem('LOGBOOK_AUTH_TOKEN')
    }
    api.get(`api/food/food/${this.props.pid}`, {headers: header})
    .then( res => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(res.data.data)
      }
      this.setState({
        foodDetail: res.data.data
      })
    })
    .catch( err => {
      console.log(err)
    })
  }

  render() {
    const data = this.state.foodDetail
    return (
      <div className={utilStyles.foodDetailContainer}>
        <div className={utilStyles.backButtonWrapper}>
          <Link href='/wishlist'>
            <a>🦝 back</a>
          </Link>
        </div>
        { 
          this.state.foodDetail &&
          <div>
            <p className={utilStyles.foodListTitle}>{data.name}</p>
            <p className={utilStyles.foodListMeta}>review: {data.review}</p>
            <p className={utilStyles.foodListMeta}>  
              <a href={data.link} target='_blank'>
                <Icon name='linkify' />
                {data.link}
              </a>
            </p>
            <hr/>
            <p>{data.description}</p>
          </div>
        }
      </div>
    )
  }
}

export default food