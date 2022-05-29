import Button from 'react-bootstrap/Button'
import styles from './ConnectWallet.module.css'

export default function ConnectWallet ({ handleConnection }) {
  return (
    <>
      <Button
        variant='outline-primary'
        onClick={handleConnection}
        className={styles.button}
      >
        Connect Wallet
      </Button>
    </>
  )
}
