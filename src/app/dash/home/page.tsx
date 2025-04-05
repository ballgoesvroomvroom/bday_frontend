"use client"

import config from "@/config"
import { useEffect, useRef, useState } from "react"
import { Copy } from "@phosphor-icons/react"
import { flushSync } from "react-dom"

const EVENT_ID = "b4d8304c-24fe-48d8-b977-e0dbbd91d7d0"

type inviteData = {
	id: string,
	event_id: string,
	status: 0|1,
	name: string, // empty string if status is 0
	accepted_tz: Date, 
	created_on: Date
}

export default function DashboardHome() {
	const [data, setData] = useState<inviteData[]>([])
	const pData = useRef<inviteData[]>([])
	useEffect(() => {
		fetch(`/api/${EVENT_ID}/home`, {
			credentials: "include"
		}).then(r => {
			if (r.status === 200) {
				return r.json()
			}
		}).then(data => {
			setData(data.map((item: any) => {
				item.accepted_tz = new Date(item.accepted_tz ?? 0) // item.accepted_tz from server is a timestamp in UTC milliseconds, also null if status is 0
				item.created_on = new Date(item.created_on) // item.created_on from server is a timestamp in ISO format
				return item
			}))
		})
	}, [])

	useEffect(() => {
		setData(pData.current.concat(data))
	}, [pData])

	console.log("REMOUNTING")

	return (
		<div className="w-svw">
			<div className="flex flex-col gap-2 w-full md:w-[754px] mx-auto p-8">
				<div className="flex flex-row gap-2 justify-between items-start">
					<h1 className="font-bold text-2xl md:text-4xl"><span className="text-3xl md:text-6xl text-accent">{data.filter(item => item.status === 1).length}</span> attendees</h1>
					<button type="button" className="rounded p-2 px-3 text-accent border-1 hover:bg-accent hover:text-white focus:bg-accent focus:text-white transition-colors" onClick={() => {
						fetch(`/api/${EVENT_ID}/create`, {
							credentials: "include"
						}).then(r => {
							if (r.status === 200) {
								return r.json()
							}
						}).then(({ code }: { code: string }) => {
							pData.current.push({
								id: code,
								event_id: EVENT_ID,
								status: 0,
								name: "",
								accepted_tz: new Date(0),
								created_on: new Date()
							})
						})
					}}>Create</button>
				</div>
				<table className="table-fixed w-full mt-8">
					<thead>
						<tr className="[&>td]:p-2 font-bold border-b-[1px] border-zinc-800">
							<td>Status</td>
							<td>Code</td>
							<td>Name</td>
							<td className="hidden md:table-row">Accepted on</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
					{
						data.map((item, idx) =>
							<tr key={idx} className="[&>td]:p-2">
								<td style={{
									color: ["#d87708", "#007b0e"][item.status]
								}}>{["Pending", "Accepted"][item.status]}</td>
								<td>{item.id}</td>
								<td style={{
									color: ["rgb(183 183 183)", "currentColor"][item.status]
								}}>{item.name.length === 0 ? "Not yet" : item.name}</td>
								<td className="hidden md:table-row">{item.status === 1 ? item.accepted_tz.toLocaleString("en-SG") : ""}</td>
								<td>
									<button className="inline-flex gap-2 items-center justify-center px-2 py-1 border-1 text-zinc-800 rounded hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white" onClick={() => {
										navigator.clipboard.writeText(`blowmycandles.com/${item.id}`)
									}}>
										<Copy size={16} />
										<span className="hidden md:inline">Copy</span>
									</button>
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}