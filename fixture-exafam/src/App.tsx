import './App.css'
import Layout from './pages/layout'
import { Container, Typography } from '@mui/material'
import {LocalizationProvider} from "@mui/x-date-pickers-pro"
import FixtureRoutes from './routes/fixture.routes'
import {AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns"
import es from 'date-fns/locale/es';

function App() {

  return (
    <>
  

    <Container >      
      <Typography textAlign={'center'} variant='h1'>EXAFAM FIXTURE</Typography>
      <Layout>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
          <FixtureRoutes/>
        </LocalizationProvider>
      </Layout>
    </Container>
       
    </>
  )
}

export default App
