import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import styles from './ConnectingWallet.module.css'

export default function ConnectingWallet () {
  return (
    <>
      <LoadingButton
        loading
        loadingPosition='start'
        startIcon={<SaveIcon />}
        variant='outlined'
        className={styles.button}
      >
        Connecting...
      </LoadingButton>
    </>
  )
}
