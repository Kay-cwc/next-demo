import React, { Component } from 'react'
import Link from "next/link";
import api, { rootUrl } from "../../components/api";
import utilStyles from "../../styles/utils.module.css";
import { Button } from 'semantic-ui-react';


class wishlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      offset: 10,
      foodList: [],
      detail: {},
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true)
    this.getFoodList()
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e) => {
    const el = e.target.documentElement
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
    if (bottom) { 
      this.setState({
        start: this.state.start + this.state.offset
      })
      this.getFoodList()
    }
  }

  clickButtonHandler = (e) => {
    console.log('click')
    console.log(e.target.value)
  }

  getDetail = (e, raceDate, raceNumber) => {
    e.preventDefault();
    console.log(raceDate, raceNumber)
    api.get(`/api/webdata/racecard/filter/?date=${raceDate}&raceNo=${raceNumber}`)
  }

  getFoodList = () => {
    // let header = {
    //   Authorization: 'TOKEN ' + localStorage.getItem('LOGBOOK_AUTH_TOKEN')
    // }
    // let pageStart = this.state.start
    // let pageEnd = this.state.start + this.state.offset
    // api.get(`api/food/food/?start=${pageStart}&end=${pageEnd}`, {headers: header})
    api.get(`/api/webdata/track/filter/?latestDate=true`)
    .then( res => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(res.data.data)
      }
      let newList = this.state.foodList.concat(res.data.data)
      this.setState({
        foodList: newList,
      })
    })
    .catch( err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <ul className={utilStyles.foodListXd}>
          {/* { this.state.foodList &&
            this.state.foodList.map(({id, name, link, created_at, review, description}) => {
            let meta_review = ''
            switch (review) {
              case 'BD':
                meta_review = 'Bad'
                break
              case 'SS':
                meta_review = 'So so'
                break
              case 'GD':
                meta_review = 'Good'
                break
              default:
                meta_review = "haven't tried"
                break
            } 
            return (
              <li key={id} >
                <p className={utilStyles.foodListTitle}>
                  <Link href={`wishlist/${encodeURIComponent(id)}`}>
                    <a>{name}</a>
                  </Link>
                  <span className={utilStyles.foodListTag}>{meta_review}</span>
                </p>
                <p className={utilStyles.foodListContent}>{description}</p>
                <span className={utilStyles.foodListMeta}>{created_at && created_at.substring(0, 10)}</span>
              </li>
            )
          })} */}
          {/* {
            this.state.detail &&
            this.state.detail.map()
          } */}
          {
            this.state.foodList &&
            this.state.foodList.map(({id, raceDate, raceNumber}) => {
              return (
                <li>
                  <div>
                    <Button
                      key={id}
                      value={raceNumber}
                      onClick={(e) => {this.getDetail(e, raceDate, raceNumber)}}
                    >{raceNumber}</Button>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className={utilStyles.createEntryWrapper}>
          <Link href='/wishlist/add' >
            <a>
              <Button 
                className={utilStyles.createEntryButton}
                content='add' 
                color='teal'
                />
            </a>
          </Link>
        </div>
      </div>
    )
  }
}

// export async function getStaticProps() {
//   const foodListUrl = rootUrl + 'api/food/food/'
//   const foodList = await fetch(foodListUrl)
//   const foodListData = await foodList.json()
//   return {
//     props: {
//       foodListData
//     }
//   }
// }

export default wishlist;