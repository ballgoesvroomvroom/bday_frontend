"use client"

import config from "@/config"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function Login() {
	const router = useRouter()

	const [clickedDebounce, setClickDebounce] = useState(true)
	const domainRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	return (
		<div className="w-svw">
			<div className="flex flex-col gap-2 w-full md:w-[512px] mx-auto p-8">
				<h1 className="text-4xl font-brand">Login</h1>
				<form className="flex flex-col gap-2 mt-6">
					<label className="font-bold">Domain</label>
					<input ref={domainRef} id="domain" type="text" className="p-2 px-3 bg-zinc-100 rounded border-1 border-solid border-zinc-200" placeholder="Login domain" />
					<label className="font-bold mt-2">Password</label>
					<input ref={passwordRef} id="password" type="password" className="p-2 px-3 bg-zinc-100 rounded border-1 border-solid border-zinc-200" placeholder="Ask jayden" />
					<button type="button" className="p-2 px-4 self-end rounded bg-emerald-500 text-white disabled:text-zinc-400 disabled:bg-emerald-900 transition-colors font-bold mt-2" disabled={!clickedDebounce} onClick={async () => {
						console.log("CLICKING")
						if (domainRef.current == null || passwordRef.current == null) {
							// missing ref
							console.warn("Missing reference to formRef.current")
							return
						} else if (domainRef.current.value.length === 0 || domainRef.current.value.length >= 256) {
							// exceed length
							console.warn("Domain input sanity check failed")
							return
						} else if (passwordRef.current.value.length === 0 || passwordRef.current.value.length >= 256) {
							// exceed length
							console.warn("Password input sanity check failed")
							return
						}

						// check debounce
						if (!clickedDebounce) {
							// debounce not yet reset
							console.warn("Debounce yet to reset")
							return
						}
						// set debounce
						setClickDebounce(false)

						try {
							console.log("SENDING")
							const resp = await fetch(`/api/login`, {
								method: "POST",
								headers: {
									"content-type": "application/json"
								},
								body: JSON.stringify({
									domain: domainRef.current.value,
									password: passwordRef.current.value
								})
							}).then(r => {
								if (r.status === 200) {
									return r.json()
								}
							})

							console.log("FINISH", resp)
							if (resp) {
								console.log("PUSHING HOMWE")
								router.push(`/home`)
							}
						} catch (err) {
							console.error(err)
						} finally {
							setClickDebounce(true) // reset debounce
						}
					}}>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}