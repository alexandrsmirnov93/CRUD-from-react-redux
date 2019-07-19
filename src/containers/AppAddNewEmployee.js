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
    birthday: '',
    roles: ['', 'driver', 'waiter', 'cook']
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
    this.setState({birthday: e.target.value})
  }
  addEmployee=(e)=>{

    e.preventDefault()
    let maxId = 0
    this.props.employees.forEach(item => {
      if (item.id > maxId) maxId = item.id 
    })
    let newEmployee = {
      
      id: ++maxId,
      name: this.state.name,
      isArchive: this.state.archive,
      role: this.state.role,
      phone: this.state.phone,
      birthday: this.state.birthday
    
  }
    this.props.addEmployees(newEmployee)
    console.log('Add user', newEmployee)
    this.props.closeItself()
  }
  render() {
    return (
      <div className='AppEmployees_Modal'>
        <div className="AppAddNewEmployee">
          <form onSubmit={this.addEmployee}>
              <label className='AppEmployees_Modal_label'>Имя</label>
              <input required className='AppEmployees_Modal_input form-control' onChange={this.changeName}></input>
              <label className='AppEmployees_Modal_label'>Архив</label>
              <input className='AppEmployees_Modal_input' type='checkbox' onChange={this.changeArchive}></input>
              <label className='AppEmployees_Modal_label'>Роль</label>
              <select required onChange={this.changeRole} value={this.state.role} className='form-control'>
                        {this.state.roles.map(item => <option key={item}>
                            {item}
                        </option>)}
                    </select>
              <label className='AppEmployees_Modal_label'>Телефон</label>
              <input required className='AppEmployees_Modal_input form-control' onChange={this.changePhone}></input>
              <label className='AppEmployees_Modal_label'>Дата рождения (формат дд.мм.ггг)</label>
              <input required className='AppEmployees_Modal_input form-control' onChange={this.changeBirthDate} pattern='^\d{1,2}\.\d{1,2}\.\d{4}$'></input>
              <button className='AppEmployees_Modal_submit btn btn-primary' type='submit'>Отправить</button>
              <button onClick={this.props.closeItself} className='AppEmployees_Modal_submit btn btn-danger' type='button'>Отменить</button>
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
