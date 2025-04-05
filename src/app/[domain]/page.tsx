"use server"

import { headers } from "next/headers";
import { Homepage, After } from "./invite"

import config from "@/config"

export default async function DataFetcher() {
  const headerList = await headers()
  const code = headerList.get("X-Current-Path")

  // validate code, remove first character because it is a forward slash
  if (code == null || code.slice(1).length >= 7) {
    return <div>Invalid invite code</div>
  }

  // fetch data from backend
  const data = await fetch(`${config.BACKEND_URL}/api/events/${code.slice(1)}`).then(r => {
    if (r.status === 200) {
      // success
      return r.json()
    }
  })
  if (data == null) {
    return (
      <div>Failed to retrieve data</div>
    )
  }
  console.log("data", data)

  return (
    <div className="w-svw">
    {
      data.invite.status === 0 ?
        <Homepage data={{
          code: code.slice(1), // remove leading forward slash
          domain: data.event.domain_id,
          location: data.event.location,
          start: new Date(data.event.start),
          end: new Date(data.event.end)
        }}/>
        : <After data={{
          name: data.invite.name,
          location: data.event.location,
          start: new Date(data.event.start),
          end: new Date(data.event.end)
        }}/>
    }
    </div>
  )
}