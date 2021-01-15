import { List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"

const client = new W3CWebSocket('ws://127.0.0.1:3333/adonis-ws')

const useStyles = makeStyles((theme) => ({
  list: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: '50px 50px 50px 50px',
    backgroundColor: '#073b4c',
    overflowY: 'scroll',
  },
  listItem: {
    display: 'block',
    color: '#FFFFFF',
    background: '#118ab2',
    border: '1px solid #118ab2',
    padding: '24px 12px',
    borderRadius: '36px',
    letterSpacing: '.2em',
    maxWidth: '300px',
    maxHeight: '100%',
    wordBreak: 'break-word',
    marginBottom: '24px',
  },
  myListItem: {
    display: 'block',
    color: '#FFFFFF',
    background: '#06d6a0',
    border: '1px solid #06d6a0',
    padding: '24px 12px',
    borderRadius: '36px',
    letterSpacing: '.2em',
    maxWidth: '300px',
    maxHeight: '100%',
    wordBreak: 'break-word',
    margin: '0 0 24px 300px',
  },
  message: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
}))

function MessageList() {
  const classes = useStyles()
  const [ listData, setListData ] = useState([])

  useEffect(async () => {
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

    client.onmessage = async (message) => {
      await getMessages()
    }
  }, [])

  const getMessages = async () => {
    const messageData = await fetch('http://localhost:3333/users/1/groups/1')
    const listDataItems = await messageData.json()

    setListData(listDataItems)
  }

  return (
    <List className={classes.list}>
      {listData.length > 0 && listData.map(({ message, isMine }, index) => (
        <ListItem
          className={isMine ? classes. myListItem : classes.listItem}
          key={`abc-${index}`}
        >
          <Typography className={classes.heading}>{message}</Typography>
        </ListItem>
      ))}
    </List>
  )
}

export { MessageList }
