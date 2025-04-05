import { Homepage, After } from "./invite"

export default function DataFetcher() {
  return (
    <div className="w-svw">
{/*      <After data={{
        name: "tishan",
        location: "The Loft - All in One (BGL), Little India",
        start: new Date(1745640000000),
        end: new Date(1745658000000)
      }}/>*/}
      <Homepage data={{
        domain: "teagan",
        location: "The Loft - All in One (BGL), Little India",
        start: new Date(1745640000000),
        end: new Date(1745658000000)
      }}/>
    </div>
  )
}