import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addEmployees} from '../actions/index.js'

class AppAddNewEmployee extends Component {
  state = {
    name: '',
    archive: false,
    role: '',
    phone: '',
    birthday: ''
  }
  changeName = (e)=>{
    this.setState({name: e.target.value})
  }
  changeArchive=(e)=>{
    this.setState({archive: e.target.checked})
  }
  changeRole=(e)=>{
    this.setState({role: e.target.value})
  }
  changePhone=(e)=>{
    this.setState({phone: e.target.value})
  }
  changeBirthDate=(e)=>{
    this.setState({nabirthdayme: e.target.value})
  }
  addEmployee=(e)=>{
    e.preventDefault()
    let maxId = 0
    this.props.employees.forEach(item => {
      if (item.id > maxId) maxId = item.id 
    })
    this.props.addEmployees({
      
        id: ++maxId,
        name: this.state.name,
        isArchive: this.state.archive,
        role: this.state.role,
        phone: this.state.phone,
        birthday: this.state.birthday
      
    })
    this.props.closeItself()
  }
  render() {
    return (
      <div className='AppEmployees_Modal'>
        <div className="AppAddNewEmployee">
          <form onSubmit={this.addEmployee}>
              Имя
              <input onChange={this.changeName}></input>
              Архив
              <input type='checkbox' onChange={this.changeArchive}></input>
              Роль
              <input onChange={this.changeRole}></input>
              Телефон
              <input onChange={this.changePhone}></input>
              Дата рождения
              <input onChange={this.changeBirthDate}></input>
              <button type='submit'>Отправить</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return{
		employees: state.employees
	}
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({addEmployees: addEmployees}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AppAddNewEmployee);
