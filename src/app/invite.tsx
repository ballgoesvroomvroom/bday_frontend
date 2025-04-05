"use client"

import { titleCase, timeRepr } from "@/utils/helper"

export function Homepage({ data }: {
  data: {
    domain: string,
    location: string,
    start: Date,
    end: Date
  }
}) {
  const { domain, location, start, end } = data
  return (
    <div className="flex flex-col items-start gap-2 w-full md:w-[512px] mx-auto p-8">
      <p className="text-4xl font-brand mr-8">You are <span className="text-accent">invited</span> to my <span className="text-accent">birthday party!</span></p>
      <p className="font-brand mt-4 mb-8">From: {titleCase(domain)}</p>
      <form className="flex flex-col gap-2 justify-left mt-2 mb-8">
        <label className="font-bold">Your name</label>
        <input type="text" className="p-2 px-3 bg-zinc-100 rounded border-1 border-solid border-zinc-200" placeholder="Enter your name else no food for you" />
        <button type="submit" className="cursor-pointer p-2 px-4 self-end rounded border-emerald-500 bg-emerald-500 text-white font-bold">
          Confirm
        </button>
      </form>
      <section className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3842 16.9158C16.0323 15.5664 17.096 14.6712 18.5809 14.4274C25.5639 13.2811 30.5241 22.1541 24.7169 26.9205C19.4742 31.2235 12.6133 26.0127 14.4559 19.963" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.7972 17.966C36.6191 9.39845 49.4819 17.6223 43.3008 25.5045C39.1384 30.8126 29.614 28.8487 30.8903 21.3372" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.8025 21.9588C11.3999 24.2546 5.36327 28.1074 4.06533 31.1361C3.09832 33.3923 13.2417 31.3818 14.5919 31.1361" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M46.2551 22.6991C56.3676 31.1361 55.4072 32.8481 41.4658 32.8481" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M41.4658 32.8481C41.5177 36.6024 42.6528 45.6073 41.9507 49.3214" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.5923 31.1363C15.4953 35.3628 15.7893 45.0242 15.7893 49.3214" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.5744 13.1013C24.5842 5.90801 34.3481 6.08498 37.9482 12.3512" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.7989 21.1507C28.4886 20.9116 30.0762 20.966 30.7737 21.0324" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.9093 29.3097C22.3775 36.7109 34.1426 36.5511 37.0786 30.1567" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.2976 22.0976C20.3584 21.5745 20.3472 21.0453 20.3472 20.5187" stroke="black" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M37.8607 22.8131C37.8607 22.1132 37.8781 21.6163 37.9482 20.9757" stroke="black" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.0499 23.8512C12.3074 21.8941 12.766 20.692 13.0702 19.2716" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M46.6814 22.7004C47.3891 21.4866 46.989 20.5115 46.2824 19.4514" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M46.226 24.0684C46.4302 23.9654 46.53 23.7264 46.682 23.5554" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.3956 22.8714C13.5947 22.7409 13.8137 22.7574 14.0225 22.7004" stroke="black" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p className="font-brand grow">{location}</p>
        </div>
        <div className="rounded shadow-md aspect-square">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7796769776623!2d103.84966711278412!3d1.3073856617007107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a2e4a9ac7f%3A0xe422ea6a771b2f41!2sThe%20Loft%20-%20All%20In%20One%20(BGL)!5e0!3m2!1sen!2ssg!4v1743817067300!5m2!1sen!2ssg" width="100%" height="100%" className="border-0" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="flex flex-row items-center gap-2">
          <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.7187 10.506C31.2864 3.68362 40.3392 16.6806 32.3465 21.6824C25.6531 25.871 20.7624 17.999 23.5461 12.7735" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.4504 25.7288C22.3308 29.434 21.8766 33.2831 21.8766 37.1372" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.8779 37.1372C15.9207 43.5883 16.2241 45.0032 20.5009 53.0697" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M32.398 26.8078C32.8096 30.4705 32.9219 34.0961 32.1959 37.7253" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M32.5283 38.0463C37.5889 43.9414 35.3148 47.3949 31.5753 52.8736" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.3987 53.2267C31.9991 53.2267 32.708 53.2267 33.1639 53.2267" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.2443 53.4945C19.0845 53.6959 19.949 53.5769 20.7714 53.4945" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.4566 25.3372C10.5269 21.6048 12.8029 25.1287 21.6022 15.1876" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.0694 13.3343C21.731 13.91 21.9489 14.1778 21.8669 14.7493" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M32.3972 26.8078C35.2921 26.152 38.766 24.6853 42.6068 23.1691" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M42.6075 23.0425C40.4894 20.3065 38.9421 18.2954 36.6942 16.1585" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M36.1646 12.8047C36.5061 13.763 36.5933 14.7399 36.6701 15.7364" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.3389 26.5729C27.4883 29.0995 27.6077 31.6714 27.8685 34.1631" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.3389 26.5729C27.2819 29.1503 27.1625 31.7672 27.1625 34.3395" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.7511 20.3949C28.7511 19.8655 28.7511 19.3359 28.7511 18.8063" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30.8692 16.5116C30.8692 16.276 30.8692 16.0406 30.8692 15.8055" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.5834 16.5116C27.5834 16.2763 27.5834 16.041 27.5834 15.8055" stroke="black" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.9836 7.17442C18.7329 7.07689 19.38 7.39098 20.0785 7.60587" stroke="black" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.5652 3.27289C21.3649 4.0494 21.7988 4.50523 22.0579 5.12099" stroke="black" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M37.4869 4.1969C37.6152 5.14324 37.1909 5.95602 36.6943 6.72941" stroke="black" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M40.3298 7.13208C38.4667 8.99507 40.9782 5.70674 39.0359 8.42599" stroke="black" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div className="flex flex-col gap-2 grow font-brand">
            <p className="">{start.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</p>
            <p className="">{`${timeRepr(start)} - ${timeRepr(end)}`}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export function After({ data }: {
  data: {
    name: string,
    location: string,
    start: Date,
    end: Date
  }
}) {
  const { name, location, start, end } = data
  return (
    <div className="min-h-svh flex flex-col gap-2 p-8">
      <p className="text-4xl font-brand mr-8 mb-10">See you <span className="text-accent">{`${titleCase(name)}!`}</span></p>
      <p className="font-brand">{location}</p>
      <div className="flex flex-col gap-2 mt-6 font-brand">
        <p className="">{start.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</p>
        <p className="">{`${timeRepr(start)} - ${timeRepr(end)}`}</p>
      </div>
      <div className="my-8 grow flex flex-row justify-center px-24">
        <svg width="100%" viewBox="0 0 276 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80.288 21.5225C91.105 8.1044 107.676 4.4707 123.695 11.5255C151.351 23.7043 169.349 49.5061 169.349 81.508C161.968 206.994 -34.1211 132.916 67.563 16.14" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M163.421 170.681C179.507 211.505 190.298 253.26 193.924 295.597" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M193.922 294.145C212.18 273.89 228.643 234.474 246.212 206.994" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M250.201 159.062C251.467 176.593 249.189 193.376 247.665 208.447" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M253.475 186.91C274.13 170.773 256.904 202.161 257.011 202.637" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M256.866 196.722C279.95 190.231 261.733 208.927 250.569 215.709" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M44.312 170.681C56.597 225.686 63.195 245.96 63.195 330.457" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M163.313 170.681C164.876 196.075 148.897 254.993 148.896 331.91" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M42.8601 170.681C22.2416 188.111 1.45036 311.009 9.95236 327.552" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M93.698 82.078C93.698 78.689 93.698 77.333 93.698 71.91" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M124.201 82.078C124.201 78.689 124.201 75.299 124.201 71.91" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M116.938 114.533C108.608 116.962 99.636 114.533 95.15 109.676" stroke="black" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p className="font-brand">P.S. foods and drinks will be provided</p>
    </div>
  )
}