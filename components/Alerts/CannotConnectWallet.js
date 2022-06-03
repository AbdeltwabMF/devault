import Swal from 'sweetalert2'

export default function CannotConnectWallet (message) {
  Swal.fire(
    'Oops...',
    'Cannot connect to the wallet.<br/><p style="color:#DB2828;font-size:1.1rem;padding-top:1rem;">' + message + '</p>',
    'question'
  )
}
