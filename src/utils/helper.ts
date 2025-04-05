export function titleCase(x: string) {
  /**
   * converts string x into title casing, splitting by whitespace
   */
  return x.split(" ").map(token => token.slice(0, 1).toUpperCase().concat(token.slice(1).toLowerCase())).join(" ")
}

export function timeRepr(d: Date) {
  /**
   * converts date d into desired time string without whitespace between time and am/pm component
   * 
   * e.g. returns "12:30pm", "8:00pm"
   */
  return d.toLocaleTimeString("en-SG", { hour: "numeric", minute: "2-digit" }).replaceAll(" ", "") // remove whitespace
}