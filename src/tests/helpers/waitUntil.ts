import { sleep } from './sleep'

export async function waitUntil (callback: () => unknown) {
  while (!await callback()) {
    await sleep(300)
  }
}
