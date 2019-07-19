import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {editEmployee} from '../actions/index.js'

class AppEditEmployee extends Component {
  state = {
    id: this.props.dataForEdit.id,
    name: this.props.dataForEdit.name,
    archive: this.props.dataForEdit.isArchive,
    role: this.props.dataForEdit.role,
    phone: this.props.dataForEdit.phone,
    birthday: this.props.dataForEdit.birthday,
    roles: ['driver', 'waiter', 'cook']
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
  editEmployee=(e)=>{
    e.preventDefault()
    let changed = {
      
        id: this.state.id,
        name: this.state.name,
        isArchive: this.state.archive,
        role: this.state.role,
        phone: this.state.phone,
        birthday: this.state.birthday
      
    }
    let employees = this.props.employees.slice()
    let index = employees.findIndex(item => item.id === changed.id)
    employees[index] = changed
    console.log('Chenged user', changed)
    this.props.editEmployee(employees)
    this.props.closeItself()
  }
  render() {
    return (
        <div className='AppEmployees_Modal'>
            <div className="AppEditEmployee">
                <form onSubmit={this.editEmployee}>
                    <label className='AppEmployees_Modal_label'>Имя</label>
                    <input required onChange={this.changeName} value={this.state.name} />
                    <label className='AppEmployees_Modal_label'>Архив</label>
                    <input type='checkbox' onChange={this.changeArchive} checked={this.state.archve}/>
                    <label className='AppEmployees_Modal_label'>Роль</label>
                    {/* <input onChange={this.changeRole} value={this.state.role}/> */}
                    <select onChange={this.changeRole} value={this.state.role}>
                        {this.state.roles.map(item => <option key={item}>
                            {item}
                        </option>)}
                    </select>
                    <label className='AppEmployees_Modal_label'>Телефон</label>
                    <input required onChange={this.changePhone} value={this.state.phone} />
                    <label className='AppEmployees_Modal_label'>Дата рождения (формат дд.мм.ггг)</label>
                    <input required onChange={this.changeBirthDate} value={this.state.birthday} pattern='^\d{1,2}.\d{1,2}.\d{4}$'/>
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
	return bindActionCreators({editEmployee: editEmployee}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AppEditEmployee);
