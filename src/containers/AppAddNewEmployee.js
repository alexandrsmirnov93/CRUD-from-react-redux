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
              <label className='AppEmployees_Modal_label'>Имя</label>
              <input required className='AppEmployees_Modal_input' onChange={this.changeName}></input>
              <label className='AppEmployees_Modal_label'>Архив</label>
              <input className='AppEmployees_Modal_input' type='checkbox' onChange={this.changeArchive}></input>
              <label className='AppEmployees_Modal_label'>Роль</label>
              <input required className='AppEmployees_Modal_input' onChange={this.changeRole}></input>
              <label className='AppEmployees_Modal_label'>Телефон</label>
              <input required className='AppEmployees_Modal_input' onChange={this.changePhone}></input>
              <label className='AppEmployees_Modal_label'>Дата рождения</label>
              <input required className='AppEmployees_Modal_input' onChange={this.changeBirthDate}></input>
              <button className='AppEmployees_Modal_submit' type='submit'>Отправить</button>
              <button onClick={this.props.closeItself} className='AppEmployees_Modal_submit' type='button'>Отменить</button>
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
