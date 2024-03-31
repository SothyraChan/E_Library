import React from 'react'
import {Route, Switch} from 'react-router-dom'
import MainMenu from './core/Home' 
import Menu from './core/Menu'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Books from './books/Books'
import EditBooks from './books/EditBooks'
import CreateBooks from './books/CreateBooks'
//<Route path="/user/:userId" component={Profile}/>
const MainRouter = () => {
return ( <div> 
    <Menu/>
    <Switch>
        <Route exact path="/" component={MainMenu}/> 
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/books/all" component={Books}/>
        <Route path="/books/edit/:bookId" component={EditBooks}/>
        <Route path="/books/create" component={CreateBooks}/>
    </Switch>
</div> 
)
}
export default MainRouter
