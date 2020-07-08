import Head from 'next/head'
import styles from './index.module.css'

export default function Home() {
  return (
    <div className={`${styles.container} flex flex-col min-h-screen h-full antialiased`}>
      <Head>
        <title>baggy - try out coupons without integrations or selectors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-1">
        <main className="flex-grow">
          <div className="pt-12 pb-12">
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
              <div className="">
                <h3 className="mt-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                  baggy
                </h3>
                <p className="mt-3 max-w-2xl text-xl leading-7 text-gray-700">
                  try out coupons without integrations or selectors
                </p>
              </div>

              <div className="mt-12">
                <p className="text-base leading-6 text-gray-700">
                  Integrating into retailer sites is hard and maintaing selectors is a pain.
                </p>

                <h3 className="mt-2 text-lg leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
                  What if you didn't have to do that?
                </h3>
                
                <p className="mt-2 text-base leading-6 text-gray-700">
                  baggy is a proof of concept approach that looks for patterns on web pages to see if coupon codes can be applied, tries them out, and figures out which one is best.
                </p>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  It works about 75%-80% of the time with no changes. And there is lots of room for improvement. See the <a href="https://github.com/sradu/baggy/blob/master/TODO" className="text-indigo-600" target="_blank">TODO</a> in the Github repository for known issues and ideas on how to address them.
                </p>

                <h3 className="mt-2 text-lg leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
                  It works on both desktop and mobile
                </h3>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  No need to maintain two sets of selectors, and it's pretty fast.
                </p>
                
                <h3 className="mt-2 text-lg leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
                  It's all open source
                </h3>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  Check out (no pun intended) the code on <a href="https://github.com/sradu/baggy" target="_blank" className="text-indigo-600">Github</a>.
                </p>

                <h3 className="mt-2 text-lg leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
                  Try baggy with the bookmarklet
                </h3>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  In Chrome on the top menu click 'View' and make sure 'Always Show Bookmarks Bar' is enabled.
                </p>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  Drag and drop
                  <span className="inline-flex rounded-md shadow-sm px-2">
                    <a href="javascript: (function () { var jsCode = document.createElement('script'); jsCode.setAttribute('src', 'https://baggy.now.sh/bookmarklet.min.js'); document.body.appendChild(jsCode); }());" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      + baggy
                    </a>
                  </span>
                  to your bookmarks bar. Then whenever you are on a cart page click '+ baggy'.
                </p>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  The bookmarklet works in any browser, including mobile Safari. It's a bit trickier to <a href="https://www.cultofmac.com/500532/how-to-add-bookmarklet-mobile-iphone-safari/#:~:text=The%20easiest%20way%20to%20install,on%20your%20iPad%20or%20iPhone." target="_blank" className="text-indigo-600">add it on iOS</a> though.
                </p>

                <h3 className="mt-2 text-lg leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
                  Try baggy as a Chrome Extension
                </h3>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  Download the latest version <a href="https://baggy.now.sh/baggy-latest.zip" className="text-indigo-600">here</a>, unpack it, and load it in Chrome after enabling developer mode. The difference between this and the bookmarklet is that it should pop up automatically on pages where coupon codes can be applied.
                </p>

                <h3 className="mt-2 text-lg leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
                  Looking for coupons?
                </h3>

                <p className="mt-2 text-base leading-6 text-gray-700">
                  Try out <a href="https://www.fmtc.co/" target="_blank" className="text-indigo-600">FMTC</a>.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
