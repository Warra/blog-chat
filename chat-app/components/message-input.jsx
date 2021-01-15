import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:3333/adonis-ws');

const useStyles = makeStyles((theme) => ({
  messageInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    right: '0',
    left: '0',
    bottom: '0',
    background: 'white',
  },
  messageInput: {
    width: '100%',
    border: '1px solid #2C2C2C',
  },
  submitInput: {
    borderRadius: 0,
    border: '1px solid #2C2C2C',
  }
}))

function MessageInput() {
  const classes = useStyles()
  const [ currentMessage, setCurrentMessage ] = useState('')

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')

      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({
          t: 1,
          d: {
            topic: 'chat',
          }
        }))
      }
    }
  }, [])

  const handleChange = (e) => {
    setCurrentMessage(e.target.value)
  }

  const handleSubmit = async () => {
    client.send(JSON.stringify({
      t: 7,
      d: {
        topic: 'chat',
        event: 'message',
        data: {
          userId: 1,
          groupId: 1,
          message: currentMessage,
          type: 'message',
        },
      }
    }))

    setCurrentMessage('')
  }

  return (
    <div className={classes.messageInputContainer}>
      <TextField
        id="filled-password-input"
        label="Message"
        type="standard"
        autoComplete="current-password"
        variant="filled"
        className={classes.messageInput}
        onChange={handleChange}
        value={currentMessage}
      />
      <Button
        variant="contained"
        className={classes.submitInput}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  )
}

export { MessageInput }
