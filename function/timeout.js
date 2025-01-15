export default function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay))
}
