import React, { useState, useEffect } from 'react';
import {Button, Container, TextField} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ValidateQuoteRequest } from "./validation"

function App() {
  const [jwt, setJwt] = useState(null)
  const [startDate, setStartDate] = useState(new Date('2020-10-01T00:00:00'))
  const [endDate, setEndDate] = useState(new Date('2020-10-30T00:00:00'))
  const [currency, setCurrency] = useState('')
  const [age, setage] = useState('')

  const [showResults, setShowResults] = useState(false)
  const [total, setTotal] = useState(null)
  const [currencyId, setCurrencyId] = useState(null)
  const [quotationId, setQuotationId] = useState(null)

  //Gets JWT on startup
  useEffect(() => {
    fetch('https://localhost:44343/authentication/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: "test", password: "test" })
    })
    .then(response => response.text())
    .then(jwt => setJwt(jwt))
    .catch(() => alert("There was an issue authenticating, please refresh page."))
  }, [])

  const onSubmit = async() => {
    if(!ValidateQuoteRequest(age, currency, startDate, endDate))
      return;

    setShowResults(false)

    let body = {
      age,
      currency_id: currency,
      start_date: startDate,
      end_date: endDate
    }

    fetch('https://localhost:44343/v1/quotation', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
     },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then((result) => {
      setShowResults(true)
      setTotal(result.total)
      setCurrencyId(result.currency_id)
      setQuotationId(result.quotation_id)
    })
    .catch(() => {
      alert("Something went wrong.")
    })
  }

  return (
    <React.Fragment>
    <Container maxWidth="xs">
      <form noValidate autoComplete="off">
        <TextField required label="Ages" helperText="24, 37, 58" value={age} onChange={(e) => setage(e.target.value)}></TextField>
        <TextField required label="Currency" helperText="USD, EUR, etc" value={currency} onChange={(e) => setCurrency(e.target.value)}></TextField>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker required variant="inline" label="Start Date" value={startDate} onChange={setStartDate}/>
          <DatePicker required variant="inline" label="End Date" value={endDate} onChange={setEndDate}/>
        </MuiPickersUtilsProvider>
        <Button style={{marginTop: '30px'}} variant="contained" color="primary" onClick={() => onSubmit()}>Generate Quote</Button>
      </form>
    </Container>
    {showResults && 
    <div style={{margin: '30px auto 0 auto', width: '50%'}}>
        <div>{`Total: ${total} ${currencyId}`}</div>
        <div>{`Quote Identifier: ${quotationId}`}</div>
    </div>
    }
    </React.Fragment>
  );
}

export default App;
