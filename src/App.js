import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// page components
import Menu from './components/Menu'
import Footer from './components/Footer'
// pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Survey from './pages/Survey'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import Questions from './pages/Panel/Questions'
import Options from './pages/Panel/Options'

const App = () => {
  return (
    <Router>
      <Menu />
      <main>
        <Container>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            <Route path='/survey' component={Survey} />
            <Route path='/signup' component={SignUp} />
            <Route path='/admin' component={Admin} />
            <Route path='/questions' component={Questions} />
            <Route path='/Options' component={Options} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
