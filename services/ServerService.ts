import axios from 'axios'
import * as querystring from 'query-string'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export interface MiHistory {
  tripId: number;
  seq: number;
  time: string;
  address: string;
  elapsed: number;
  lat: number;
  lng: number;
  lazy?: boolean;
}

export interface MiStatus {
  start: string;
  epoch: number;
  tilEndEpoch: number;
  tripId: number;
  // elapsedEpoch: number; //  経過時間はおおよそはポイント時間 ただし最後の投入時間
  // targetEpoch: number;
  status: string;
  from: string;
  to: string;
  duration: string;
}

export interface StreetViewLocation {
  lat: number;
  lng: number;
  bearing: number;
  message?: string;
  tripId?: number;
  seq?: number;
  baseUrl?: string;
}

export class ServerService {
  baseURL = ''
  runnerLocalPath = '/runner'

  private options = {
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  };

  private async getAxios(url: string, query: any = null): Promise<object | string> {
    try {
      let u = url
      if (query) {
        const q = querystring.stringify(query)
        u = `${url}?${q}`
      }
      const tweets = await axios.get(u, this.options)
      if (tweets.status === 200) {
        return tweets.data
      } else {
        return tweets.statusText as string
      }
    } catch (e: any) {
      return e.message as string
    }
  }

  private async postAxios(url: string, reqBody: any = null) {
    try {
      const response = await axios.post(url, reqBody, this.options)
      if (response.status === 200) {
        return response.data
      } else {
        return response.statusText as string
      }
    } catch (e: any) {
      return e.message as string
    }
  }

  //  Mi-Runner 関係

  async doStartRunner(powMin: number): Promise<MiStatus | string> {
    return await this.postAxios(`${this.baseURL}/mi-runner/start-run`, {powMin})
  }

  async getRunnerLocation(runTime: number): Promise<StreetViewLocation | undefined> {
    return await this.getAxios(`${this.baseURL}/mi-runner/current-loc`, {runTime: runTime.toString()}) as StreetViewLocation | undefined
  }

  /** Trip 全体スケジュール */
  async getRunnerStartTime() {
    return await this.getAxios(`${this.baseURL}/mi-runner/start-run`) as MiStatus | string
  }

  async doLeapOut(loc: { lng: number; bearing: number; lat: number; message?: string }): Promise<{ status: string; visit?: MiHistory } | string> {
    return await this.getAxios(`${this.baseURL}/mi-runner/leap-out`, loc) as { status: string; visit?: any } | string
  }

  /**
   * runnerのhistoryローカル取得
   →ローカル取得をrestからローカルjsonに変更
   * @param trip
   */
  async getMiHistory(trip: { tripId: number; seq: number[] }): Promise<MiHistory[]> {
    return (await Promise.all(trip.seq.map(async (q: number) => {
      return await this.getAxios(`${this.runnerLocalPath}/${trip.tripId}/${q}.json`) as MiHistory
    }))).sort((a, b) => a.seq - b.seq)
  }

  /**
   * 日付指定でのtripIdリストのローカル取得
   * →ローカル取得をrestからローカルjsonに変更
   */
  async getTripList(): Promise<{ tripId: number; seq: number[] }[] | undefined> {
    return await this.getAxios(`${this.runnerLocalPath}/trips.json`) as { tripId: number, seq: number[] }[] | undefined
  }

  async getMapLocation(addressName: string): Promise<{ status: string; address: string; lat: number; lng: number } | string> {
    return await this.getAxios(`${this.baseURL}/mi-runner/map-loc`, {address: addressName}) as { status: string; address: string; lat: number; lng: number } | string
  }

  //  イメージスタック関係
  async getImageStackSourceInfo(): Promise<string[]> {
    const data = await this.getAxios(`${this.baseURL}/static-store/pictInfo`)
    if (data) {
      return (data as any[]).map(value => value as string)
    }
    return []
  }

  /** ブログサービスurl設定 */
  setServerBaseUrl(url: string) {
    this.baseURL = url
  }
}

export default new ServerService()
