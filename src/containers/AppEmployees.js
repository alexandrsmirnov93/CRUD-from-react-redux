import React, { Component } from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addEmployees, getAllEmployees} from '../actions/index.js'
import AppAddNewEmployee from './AppAddNewEmployee'

import empoyeesData from '../files/employees.json';
class AppEmployees extends Component {
    state = {
        allRoles: [],
        checkBoxArchiveFilter: '',
        roleFilter: '',
        openModal: false
    }

    componentDidMount=()=>{
        this.props.getAllEmployees(empoyeesData);
        let allRoles = {}

        empoyeesData.forEach(item=>{ 
            allRoles[item.role] = true
        })

        allRoles = Object.keys(allRoles)
        allRoles.unshift('')
        this.setState({allRoles: allRoles})
    }

    addUser=()=>{
        this.setState({openModal : !this.state.openModal})
    }
    filterData=(item)=>{
        return  (item.role === this.state.roleFilter || this.state.roleFilter === '') &&
                (item.isArchive === this.state.checkBoxArchiveFilter || this.state.checkBoxArchiveFilter === '')
    }

    filterEmployees=(e)=>{
        this.setState({roleFilter: e.target.value})
    }

    changeChekbox=(e)=>{
        this.setState({checkBoxArchiveFilter: e.target.checked})
    }

    sortEmployees=(e, param)=>{
        let newData = this.props.employees.slice().sort((a,b)=>{
            if(a[param] > b[param]) return 1
            if(a[param] < b[param]) return -1
            return 0
        })
        
        this.props.getAllEmployees(newData);
    }

    render() {
        return (
            <div>
                <div className={`AppEmployees_Modal ${this.state.openModal ? '' : ' none'}`}> 
                    <AppAddNewEmployee />
                </div>



                <select onChange={this.filterEmployees}>
                    {this.state.allRoles.map(item=>
                        <option key={item}>
                            {item}
                        </option>
                    )}
                </select>
                <input type='checkbox' onChange = {this.changeChekbox}></input>
                <button onClick={(e)=>this.sortEmployees(e, 'name')}>Сортировать по имени</button>
                <button onClick={(e)=>this.sortEmployees(e, 'birthday')}>Сортировать по дате рождения</button>
                <table>
                    <tbody>
                        {this.props.employees.filter(this.filterData).map(item=> 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>{item.phone}</td>
                            </tr>
                        )}
                    </tbody>  
                </table>
                <button onClick={this.addUser}>Добавить (пока не работает)</button>
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
	return bindActionCreators({addEmployees: addEmployees, getAllEmployees: getAllEmployees}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AppEmployees) ;