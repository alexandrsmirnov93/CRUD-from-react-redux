import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getAllEmployees} from '../actions/index.js'
import AppAddNewEmployee from './AppAddNewEmployee'
import AppEditEmployee from './AppEditEmployee'
import empoyeesData from '../files/employees.json';

class AppEmployees extends Component {
    state = {
        allRoles: [],
        checkBoxArchiveFilter: '',
        roleFilter: '',
        openModalAdd: false,
        openModalEdit: false,
        dataForEdit: {}
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
        this.setState({openModalAdd : !this.state.openModalAdd})
    }
    changeUser=(e, item)=>{
        console.log(item)
        this.setState({dataForEdit : item},()=>{
            this.setState({openModalEdit : !this.state.openModalEdit})
        })
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
            <div className='AppEmployees'>
                { this.state.openModalAdd && <AppAddNewEmployee closeItself={this.addUser}/> }

                {/* <div className={`AppEmployees_Modal ${this.state.openModalAdd ? '' : ' none'}`}> 
                    <AppAddNewEmployee closeItself={this.addUser}/>
                </div> */}
                { this.state.openModalEdit && <AppEditEmployee dataForEdit={this.state.dataForEdit} closeItself={this.changeUser}/> }


                <select onChange={this.filterEmployees}>
                    {this.state.allRoles.map(item=>
                        <option key={item}>
                            {item}
                        </option>
                    )}
                </select>
                <input type='checkbox' onChange={this.changeChekbox}></input>
                <button onClick={(e)=>this.sortEmployees(e, 'name')}>Сортировать по имени</button>
                <button onClick={(e)=>this.sortEmployees(e, 'birthday')}>Сортировать по дате рождения</button>
                <table>
                    <tbody >
                        {this.props.employees.filter(this.filterData).map(item=> 
                            <tr key={item.id} onClick={(e)=>this.changeUser(e, item)}>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>{item.phone}</td>
                            </tr>
                        )}
                    </tbody>  
                </table>
                <button onClick={this.addUser}>Добавить</button>
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
	return bindActionCreators({getAllEmployees: getAllEmployees}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AppEmployees);