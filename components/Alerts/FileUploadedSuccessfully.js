export default function FileUploadedSuccessfully ({ isSucceed }) {
  return ({
    position: 'center',
    icon: isSucceed ? 'success' : 'error',
    title: isSucceed ? 'The file uploaded successfully' : 'The file upload failed',
    showConfirmButton: false,
    timer: 10000
  })
}
