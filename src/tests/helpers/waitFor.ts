import { sleep } from './sleep'

export async function waitFor (callback: () => unknown) {
  while (await callback()) {
    await sleep(300)
  }
}
