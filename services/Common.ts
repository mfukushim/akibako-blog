import jp from 'jsonpath'
import {IContentDocumentBase} from '@nuxt/content/types/content'

export interface BlogInfo {
  title: string;
  slug: string;
  date: string;
  categories: string[];
  //
  open: boolean;
  summary: string;
  //
  post: any,
  image?: string;
  //
  year: string;
  month: string;
  day: string;
  link: string;
  cid?: string;
}

export class Common {
  public static getPostList(posts: IContentDocumentBase | IContentDocumentBase[]): BlogInfo[] {
    const reg = /\/(.+)\/(\d{4})-(\d{2})-(\d{2})-(.+)\/index/
    return posts.reduce((p: BlogInfo[], c: any) => {
      const m = c.path.match(reg)
      if (m) {
        const pick = Common.pickBody(c)
        p.push({
          year: m[2],
          month: m[3],
          day: m[4],
          link: m[5],
          slug: `/${m[2]}/${m[3]}/${m[4]}/${m[5]}`,
          open: false,
          ...pick
        })
        // const pick = jp.query(c, '$.body..children[?(@.type=="text")]') as { value: string }[]
        // const img = jp.query(c, '$.body..children[?(@.type=="element" && @.tag=="img")]') as { props: { src: string } }[]
        // p.push({
        //   year: m[2],
        //   month: m[3],
        //   day: m[4],
        //   link: m[5],
        //   slug: `/${m[2]}/${m[3]}/${m[4]}/${m[5]}`,
        //   cid: c.parentCid,
        //   title: c.title,
        //   date: c.date,
        //   open: false,
        //   categories: [],
        //   summary: (pick && pick.length > 0) ? pick.map(value => value.value.trim()).join('').substring(0, 50) + '...' : '',
        //   image: (img && img.length > 0) ? img[0].props.src : undefined,
        //   post: c
        // })
      }
      return p
    }, [])
  }

  public static pickBody(post: any): { date: string; summary: string; image?: string; post: any; categories: string[]; title: string; cid: string } {
    const pick = jp.query(post, '$.body..children[?(@.type=="text")]') as { value: string }[]
    const img = jp.query(post, '$.body..children[?(@.type=="element" && @.tag=="img")]') as { props: { src: string } }[]
    return {
      cid: post.parentCid,
      title: post.title,
      date: post.date,
      categories: [],
      summary: (pick && pick.length > 0) ? pick.map(value => value.value.trim()).join('').substring(0, 50) + '...' : '',
      image: (img && img.length > 0) ? img[0].props.src : undefined,
      post
    }
  }
}
