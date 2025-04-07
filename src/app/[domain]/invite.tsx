"use client"

import config from "@/config"
import { titleCase, timeRepr } from "@/utils/helper"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation";

export function Homepage({ data }: {
  data: {
    code: string,
    domain: string,
    location: string,
    start: Date,
    end: Date,
    cut: Date
  }
}) {
  const { code, domain, location, start, end, cut } = data

  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const [allergyState, setAllergyState] = useState(false)
  const remarksRef = useRef<HTMLInputElement>(null)
  const allergiesRef = useRef<HTMLInputElement>(null)
  const [clickedDebounce, setClickDebounce] = useState(true)

  return (
    <div className="flex flex-col gap-2 w-full md:w-[512px] mx-auto p-8">
      <p className="text-4xl font-brand mr-8">You are <span className="text-accent">invited</span> to my <span className="text-accent">birthday party!</span></p>
      <p className="font-brand mt-4 mb-8">From: {titleCase(domain)}</p>
      <div className="w-full flex flex-col gap-2 justify-left mt-2 mb-8">
        <label className="font-bold">Your name</label>
        <input ref={nameRef} type="text" className="mb-2 p-2 px-3 bg-zinc-100 rounded border-1 border-solid border-zinc-200" placeholder="Enter your name or else no food for you" />
        <label className="font-bold">Food allergy</label>
        <div className="flex flex-gap mb-2 bg-zinc-100 rounded border-1 border-solid border-zinc-200 text-zinc-200 overflow-clip">
          {
            [false, true].map((choiceState, idx) =>
              <button key={idx} className={`p-2 ${idx === 0 ? "pl-3" : "pr-3"} basis-1/2 grow w-full text-center transition-colors`} style={{
                backgroundColor: choiceState === allergyState ? "#fff" : "transparent",
                fontWeight: choiceState === allergyState ? "700" : "400",
                color: choiceState === allergyState ? "#000" : "inherit"
              }} onClick={() => {
                setAllergyState(choiceState)
              }}>
                {choiceState ? "Yes" : "No"}
              </button>
            )
          }
        </div>
        <div className="flex flex-col gap-2 justify-left mb-2 transition-opacity" style={{
          opacity: allergyState === true ? "1" : ".25"
        }}>
          <label className="font-bold">Allergies</label>
          <input ref={allergiesRef} disabled={!allergyState} type="text" className="p-2 px-3 bg-zinc-100 rounded border-1 border-solid border-zinc-200" placeholder="Indicate your allergies" />
        </div>
        <label className="font-bold">Remarks (optional)</label>
        <input ref={remarksRef} type="text" className="p-2 px-3 bg-zinc-100 rounded border-1 border-solid border-zinc-200" placeholder="E.g. coming in late" />
        <button className="p-2 px-4 self-end rounded bg-emerald-500 text-white disabled:text-zinc-400 disabled:bg-emerald-900 transition-colors font-bold" disabled={!clickedDebounce} onClick={async () => {
          console.log("CLICKING")
          const name = nameRef.current?.value
          console.log("name", name)
          if (name == null || name.length === 0 || name.length >= 256) {
            // failed sanity check
            console.warn("Name cannot be empty")
            return
          }
          let allergies = allergiesRef.current?.value
          if (allergyState) {
            // is allergic
            if (allergies == null || allergies.length === 0 || allergies.length >= 2048) {
              // failed sanity check
              console.warn("Allergies cannot be empty if indicated true")
              return
            }
          } else {
            allergies = undefined // unset
          }
          const remarks = remarksRef.current?.value
          if (remarks != null && remarks.length >= 2049) {
            // failed sanity check
            console.warn("Remarks must be shorter than or equal to 2048 characters")
            return
          }

          if (!clickedDebounce) {
            // debounce not yet reset
            return
          }
          // set debounce
          setClickDebounce(false)

          const resp = await fetch(`${config.BACKEND_URL}/api/events/${code}`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              name,
              allergies,
              remarks: remarks?.length === 0 ? undefined : remarks
            })
          }).then(r => {
            if (r.status === 200) {
              return r.json()
            }
          })

          if (resp == null) {
            // failed
            setClickDebounce(true) // reset debounce
          } else {
            // successful --> refresh page
            router.refresh()
          }
        }}>
          Confirm
        </button>
      </div>
      <section className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-2">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3842 16.9158C16.0323 15.5664 17.096 14.6712 18.5809 14.4274C25.5639 13.2811 30.5241 22.1541 24.7169 26.9205C19.4742 31.2235 12.6133 26.0127 14.4559 19.963" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M31.7972 17.966C36.6191 9.39845 49.4819 17.6223 43.3008 25.5045C39.1384 30.8126 29.614 28.8487 30.8903 21.3372" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.8025 21.9588C11.3999 24.2546 5.36327 28.1074 4.06533 31.1361C3.09832 33.3923 13.2417 31.3818 14.5919 31.1361" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.2551 22.6991C56.3676 31.1361 55.4072 32.8481 41.4658 32.8481" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M41.4658 32.8481C41.5177 36.6024 42.6528 45.6073 41.9507 49.3214" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.5923 31.1363C15.4953 35.3628 15.7893 45.0242 15.7893 49.3214" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.5744 13.1013C24.5842 5.90801 34.3481 6.08498 37.9482 12.3512" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.7989 21.1507C28.4886 20.9116 30.0762 20.966 30.7737 21.0324" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.9093 29.3097C22.3775 36.7109 34.1426 36.5511 37.0786 30.1567" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.2976 22.0976C20.3584 21.5745 20.3472 21.0453 20.3472 20.5187" stroke="black" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M37.8607 22.8131C37.8607 22.1132 37.8781 21.6163 37.9482 20.9757" stroke="black" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.0499 23.8512C12.3074 21.8941 12.766 20.692 13.0702 19.2716" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.6814 22.7004C47.3891 21.4866 46.989 20.5115 46.2824 19.4514" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.226 24.0684C46.4302 23.9654 46.53 23.7264 46.682 23.5554" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3956 22.8714C13.5947 22.7409 13.8137 22.7574 14.0225 22.7004" stroke="black" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="font-brand grow">{location}</p>
        </div>
        <div className="rounded shadow-md aspect-square">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7780451969293!2d103.856354!3d1.3084122999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da195a3ae9acdb%3A0xc10db37440d08097!2sLevel%20Two%20Space!5e0!3m2!1sen!2ssg!4v1743841968767!5m2!1sen!2ssg" width="100%" height="100%" className="border-0" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="flex flex-row items-center gap-2">
          <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.7187 10.506C31.2864 3.68362 40.3392 16.6806 32.3465 21.6824C25.6531 25.871 20.7624 17.999 23.5461 12.7735" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.4504 25.7288C22.3308 29.434 21.8766 33.2831 21.8766 37.1372" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.8779 37.1372C15.9207 43.5883 16.2241 45.0032 20.5009 53.0697" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32.398 26.8078C32.8096 30.4705 32.9219 34.0961 32.1959 37.7253" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32.5283 38.0463C37.5889 43.9414 35.3148 47.3949 31.5753 52.8736" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M31.3987 53.2267C31.9991 53.2267 32.708 53.2267 33.1639 53.2267" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.2443 53.4945C19.0845 53.6959 19.949 53.5769 20.7714 53.4945" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.4566 25.3372C10.5269 21.6048 12.8029 25.1287 21.6022 15.1876" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.0694 13.3343C21.731 13.91 21.9489 14.1778 21.8669 14.7493" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32.3972 26.8078C35.2921 26.152 38.766 24.6853 42.6068 23.1691" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M42.6075 23.0425C40.4894 20.3065 38.9421 18.2954 36.6942 16.1585" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36.1646 12.8047C36.5061 13.763 36.5933 14.7399 36.6701 15.7364" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.3389 26.5729C27.4883 29.0995 27.6077 31.6714 27.8685 34.1631" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.3389 26.5729C27.2819 29.1503 27.1625 31.7672 27.1625 34.3395" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28.7511 20.3949C28.7511 19.8655 28.7511 19.3359 28.7511 18.8063" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30.8692 16.5116C30.8692 16.276 30.8692 16.0406 30.8692 15.8055" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.5834 16.5116C27.5834 16.2763 27.5834 16.041 27.5834 15.8055" stroke="black" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.9836 7.17442C18.7329 7.07689 19.38 7.39098 20.0785 7.60587" stroke="black" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.5652 3.27289C21.3649 4.0494 21.7988 4.50523 22.0579 5.12099" stroke="black" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M37.4869 4.1969C37.6152 5.14324 37.1909 5.95602 36.6943 6.72941" stroke="black" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M40.3298 7.13208C38.4667 8.99507 40.9782 5.70674 39.0359 8.42599" stroke="black" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex flex-col gap-2 grow font-brand">
            <p className="">{start.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</p>
            <p className="">{`${timeRepr(start)} - ${timeRepr(end)}`}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.503384" d="M9.96157 24.6345C9.55575 26.9768 9.48907 28.9366 12.0621 29.3122C13.2034 29.4783 15.3165 28.6338 16.0715 27.7528C16.1638 27.6445 17.7126 25.1012 17.7897 25.2191C18.4214 26.1859 17.1388 28.6584 18.9353 29.1172C21.9136 29.877 22.7441 26.9758 25.0446 26.3885C25.3513 26.3107 26.49 28.0089 27.1452 28.1424C29.0163 28.5245 30.7021 26.6473 32.3001 26.9731C33.2104 27.159 33.6467 28.2571 34.5912 28.5324C35.701 28.8561 36.2082 27.3031 37.4551 27.5577C38.671 27.8064 39.9225 28.8894 41.2738 28.3374C42.4163 27.8712 42.485 23.4052 42.0372 22.4909C40.7021 19.765 30.5592 20.2114 28.2907 20.542C22.6318 21.3672 15.9476 21.3217 10.3432 21.3217" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.8857 30.0886C10.4669 31.2675 9.92398 40.0657 10.7704 40.9207C11.2239 41.378 39.173 41.9233 39.6917 41.1384C40.4951 39.9218 39.4795 32.1381 39.4795 30.3235" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.9114 20.8357C16.0051 19.7137 16.3696 17.3562 16.426 16.6772" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.132 20.2934C22.2106 19.5524 22.3229 18.8438 22.4997 18.1238" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.4296 19.9317C28.5239 18.9933 28.5031 18.1475 28.454 17.2196" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34.1014 19.9317C34.274 19.2193 34.3196 18.4842 34.3955 17.7621" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.503384" d="M17.7025 11.3595C11.5989 18.7383 19.3743 17.1909 18.9543 14.1561C18.7902 12.9719 17.8937 12.1486 17.6327 11.0724" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.503384" d="M23.6352 10.53C18.5977 18.4283 26.159 19.6655 23.7118 11.3116" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.503384" d="M28.9055 11.6149C23.843 15.5048 30.2501 20.9823 28.9055 11.9675" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.503384" d="M34.6079 11.9764C29.8283 21.6076 37.9385 15.2717 35.77 13.9861C34.7526 13.3828 34.623 13.5007 34.3899 12.1199" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5781 32.7881C17.6031 32.7149 17.6274 32.6412 17.6518 32.5679" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.3001 32.7685C25.2842 32.4817 25.4197 32.2862 25.4796 32.0452" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M32.6841 32.5877C32.7803 32.4122 32.7166 32.225 32.733 32.0452" stroke="black" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p className="font-brand grow">{`cut cake time: ${timeRepr(cut)}`}</p>
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
    end: Date,
    cut: Date,
    allergies: string, // empty string if not inputted
    remarks: string // empty string if not inputted
  }
}) {
  const { name, location, start, end, cut, allergies, remarks } = data
  return (
    <div className="min-h-svh flex flex-col items-start gap-2 w-full md:w-[512px] mx-auto p-8">
      <p className="text-4xl font-brand mr-8 mb-10">See you <span className="text-accent">{`${titleCase(name)}!`}</span></p>
      <p className="font-brand">{location}</p>
      <div className="flex flex-col gap-2 mt-6 font-brand">
        <p>{start.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</p>
        <p>{`${timeRepr(start)} - ${timeRepr(end)}`}</p>
        <p>{`Cut cake timing: ${timeRepr(cut)}`}</p>
      </div>
      {
        (allergies.length !== 0 || remarks.length !== 0) &&
          (<div className="flex flex-col gap-2 mt-6 font-brand">
            { allergies.length !== 0 && <p className="text-rose-600">{`Allergies: ${allergies}`}</p> }
            { remarks.length !== 0 && <p>{`Remarks: ${remarks}`}</p> }
          </div>)
      }
      <div className="my-8 grow flex flex-row justify-center px-24">
        <svg width="100%" viewBox="0 0 276 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80.288 21.5225C91.105 8.1044 107.676 4.4707 123.695 11.5255C151.351 23.7043 169.349 49.5061 169.349 81.508C161.968 206.994 -34.1211 132.916 67.563 16.14" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M163.421 170.681C179.507 211.505 190.298 253.26 193.924 295.597" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M193.922 294.145C212.18 273.89 228.643 234.474 246.212 206.994" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M250.201 159.062C251.467 176.593 249.189 193.376 247.665 208.447" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M253.475 186.91C274.13 170.773 256.904 202.161 257.011 202.637" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M256.866 196.722C279.95 190.231 261.733 208.927 250.569 215.709" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M44.312 170.681C56.597 225.686 63.195 245.96 63.195 330.457" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M163.313 170.681C164.876 196.075 148.897 254.993 148.896 331.91" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M42.8601 170.681C22.2416 188.111 1.45036 311.009 9.95236 327.552" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M93.698 82.078C93.698 78.689 93.698 77.333 93.698 71.91" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M124.201 82.078C124.201 78.689 124.201 75.299 124.201 71.91" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M116.938 114.533C108.608 116.962 99.636 114.533 95.15 109.676" stroke="black" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="font-brand">P.S. foods and drinks will be provided</p>
    </div>
  )
}