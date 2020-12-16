import React, { Component } from 'react'
import Link from "next/link";
import api, { rootUrl } from "../../components/api";
import utilStyles from "../../styles/utils.module.css";
import { Button, Dropdown, Form, TextArea } from 'semantic-ui-react';
import SearchBar from "../../components/searchBar";

export default class add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      link: '',
      review: 'NT',
      tagList: []
    }
  }

  handleReviewChange = (e, {value}) => {
    console.log(value)
    this.setState({
      review: value
    })
  }

  handleFormSubmit = () => {
    let header = {
      Authorization: 'TOKEN ' + localStorage.getItem('LOGBOOK_AUTH_TOKEN')
    }
    api.post('api/food/food/', this.state, {headers: header})
    .then( res => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(res.data.data)
      }
    })
    .catch( err => {
      console.log(err)
    })
  }

  addTag = (newTag) => {
    let newArr = [
      ...this.state.tagList,
      newTag
    ]
    console.log(newArr)
    this.setState({
      tagList: newArr
    })
    console.log(this.state.tagList)
    // let validator = this.state.collaborator.filter( val => val.id === user.id)
    // console.log(validator.length)
    // if (validator.length !== 0) {
    //   toast({
    //     title: 'duplicated memeber.',
    //     type: 'error',
    //     time: 5000,
    //     icon: 'envelope',
    //     size: 'mini',
    //   })
    //   return true
    // } else {
    //   console.log('else')
    //   let newArr = [
    //     ...this.state.collaborator,
    //     user
    //   ]
    //   console.log(newArr)
    //   this.setState({
    //     collaborator: newArr
    //   })
  }

  
  render() {
    const comment_options = [
      {
        value: 'NT',
        content: "🙀 haven't tried"
      }, {
        value: 'BD',
        content: '😾 shitty'
      }, {
        value: 'SS',
        content: '😺 so far so good'
      }, {
        value: 'GD',
        content: '😻 Tasty Kitty'
      }
    ]
    const stateOptions = comment_options.map(({value, content}) => ({
      key: value,
      text: content,
      value: value
    }))
    return (
      <div className={utilStyles.foodDetailContainer}>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input 
              placeholder="restaurant name" 
              value={this.state.name}  
              onChange={(e) => {
                this.setState({
                  name: e.target.value
                })
              }}
              />
          </Form.Field>
          <Form.Field>
            <label>Link</label>
            <input 
              placeholder="bookmark link. if any" 
              value={this.state.link}  
              onChange={(e) => {
                this.setState({
                  link: e.target.value
                })
              }}
              />
          </Form.Field>
          <Form.Field>
            <label>Remark</label>
            <TextArea 
              placeholder="write some remarks" 
              value={this.state.description}
              onChange={(e) => {
                this.setState({
                  description: e.target.value
                })
              }}
              />
          </Form.Field>
          <Form.Field>
            <label>tasty or shitty?</label>
            <Dropdown 
              selection
              options= {stateOptions}
              value={this.state.review}
              onChange={this.handleReviewChange}
            />
          </Form.Field>
          <Form.Field>
            <SearchBar addTag={this.addTag}  />
            { 
              this.state.tagList &&
              this.state.tagList.map(({name}) => {
                return (<span className={utilStyles.foodDetailTag}>{name}</span>)
              })
            }
          </Form.Field>
          <div className={utilStyles.submitButton} >
            <Button 
              className={utilStyles.foodCreateFormButton}
              color='teal' 
              type='submit'
              onClick={this.handleFormSubmit}
              >Submit</Button>
          </div>
          <div className={utilStyles.submitButton}>
            <Link href='/wishlist'>
              <Button 
                className={utilStyles.foodCreateFormButton}
                type='submit'
                >
                back
              </Button>
            </Link>
          </div>
        </Form>
        
      </div>
    )
  }
}
