import styles from '../styles/Faqs.module.css'
import Link from 'next/link'

export default function Faqs () {
  return (
    <>
      <div className={styles.main}>
        <div className={'container ' + `${styles.container}`}>
          <h1 className='text-center fs-2 mt-4 '>Frequently Asked Questions</h1>
          <div className={'row ' + `${styles.header}`}>
            <div className='col col-8 m-auto mt-2 '>
              <div class='accordion' id='accordionPanelsStayOpenExample'>
                <div class='accordion-item'>
                  <h2 class='accordion-header' id='panelsStayOpen-headingOne'>
                    <button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseOne' aria-expanded='true' aria-controls='panelsStayOpen-collapseOne'>
                      How do I install MetaMask?
                    </button>
                  </h2>
                  <div id='panelsStayOpen-collapseOne' class='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingOne'>
                    <div class='accordion-body'>
                      Go to <Link href='https://metamask.io/'><a>MetaMask.io</a></Link> and select from Android or iOS for mobile application or you can select Chrome or Firefox or any supported browser to install the metamask extension.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
