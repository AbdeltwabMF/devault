import Button from 'react-bootstrap/Button'
import styles from './ConnectedWallet.module.css'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/react'
import { truncateAddress } from '../../utils/regexMatchAddress'
import NoAccount from '../Alerts/NoAccount'
import { useState } from 'react'

export default function OutlinedButtons ({ account }) {
  const [alerted, setAlerted] = useState(false)
  console.log('account', account)

  return (
    <div>
      <Button
        variant='outline-primary'
        className={styles.button}
      >
        <Text className={styles.address}>
          {(account === undefined)
            ? 'No Account'
            : truncateAddress(account)}
        </Text>
        {(account === undefined)
          ? (
            <>
              <WarningIcon color='red.300' />
              {!alerted && <NoAccount /> && setAlerted(true)}
            </>
            )
          : (
            <CheckCircleIcon color='green.400' />)}
      </Button>{' '}
    </div>
  )
}
