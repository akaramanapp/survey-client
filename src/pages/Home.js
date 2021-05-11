import Header from '../components/Header'
import Meta from '../components/Meta'
import Login from '../components/Login'
import { authenticationService } from '../service'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

const Home = () => {
  const pageTitle = 'Home'
  const pageDescription = 'Survey Application'
  const history = useHistory();

  const logoutHandle = () => {
    authenticationService.logout()
    history.push('/')
  }

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
      { authenticationService && !authenticationService.currentUserValue ? <Login /> : (
        <Button variant="primary" onClick={logoutHandle}>
          Log Out
        </Button>
      )}

    </div>
  )
}

export default Home