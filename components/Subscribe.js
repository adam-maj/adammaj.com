import { useState } from 'react'
import { Flex, Text, Input, Button } from '../styles/Styles'
import axios from 'axios' 

export default function Subscribe ({ children, light, ...props }) {
  const [email, setEmail] = useState('')

  function isEmailValid() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) || !email;
  }

  async function subscribe() {
    if (isEmailValid()) {
      const res = await axios.post('/api/subscribe/', {
        email
      })
      if (!res.data) {
        setEmail('')
      }
    }
  }

  return (
    <Flex direction="column" {...props}>
      <Text 
        fw={light ? "bold" : "normal"}
        width="100%" 
        color={light ? "dark" : "white"} 
        textAlign="left" 
      >
        {children}
      </Text>
      <Flex width="100%">
        <Input 
          br="4px 0px 0px 4px"
          placeholder="example@gmail.com"
          margin="0px !important"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button 
          br="0px 4px 4px 0px"
          color="black"
          primary
          onClick={subscribe}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
} 