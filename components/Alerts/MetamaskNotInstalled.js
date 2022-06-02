import Swal from 'sweetalert2'

export default function MetamaskNotInstalled () {
  Swal.fire({
    title: 'Metamask is not installed',
    text: 'You need to install Metamask to be able to continue',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '<a style="color:#ffffff;" href="https://metamask.io/download/">Install Metamask</a>'
  })
}
