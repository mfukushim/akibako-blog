import jp from 'jsonpath'
import { IContentDocument } from '@nuxt/content/types/content'

export interface BlogInfo {
  title: string;
  slug: string;
  date: string;
  categories: string[];
  open: boolean;
  // toc: string[];
  // body: any;
  summary:string;
  post: any | undefined,
  year: string;
  month:string;
  day:string;
  link: string;
  image: string | undefined;
}

export class Common {
  public static getPost () {

  }

  public static getPostList (posts: IContentDocument | IContentDocument[]) {
    const reg = /\/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)/
    const links = posts.reduce((p: BlogInfo[], c: any) => {
      const m = c.path.match(reg)
      if (m) {
        const pick = jp.query(c, '$.body..children[?(@.type=="text")]') as { value: string }[]
        const img = jp.query(c, '$.body..children[?(@.type=="element" && @.tag=="img")]') as { props: { src: string } }[]
        p.push({
          year: m[1],
          month: m[2],
          day: m[3],
          link: m[4],
          slug: `/${m[1]}/${m[2]}/${m[3]}/${m[4]}`,
          title: c.title,
          date: c.date,
          open: false,
          categories: [],
          summary: (pick && pick.length > 0) ? pick.map(value => value.value.trim()).join('').substring(0, 50) + '...' : '',
          image: (img && img.length > 0) ? img[0].props.src : undefined,
          post: c
        })
      }
      return p
    }, [])
    return links
  }
}

/*
export function getPostList (posts: IContentDocument | IContentDocument[]) {
  const reg = /\/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)/
  const links = posts.reduce((p: BlogInfo[], c: any) => {
    const m = c.path.match(reg)
    if (m) {
      const pick = jp.query(c, '$.body..children[?(@.type=="text")]') as { value: string }[]
      const img = jp.query(c, '$.body..children[?(@.type=="element" && @.tag=="img")]') as { props: { src: string } }[]
      p.push({
        year: m[1],
        month: m[2],
        day: m[3],
        link: m[4],
        slug: `/${m[1]}/${m[2]}/${m[3]}/${m[4]}`,
        title: c.title,
        date: c.date,
        open: false,
        categories: [],
        summary: (pick && pick.length > 0) ? pick.map(value => value.value.trim()).join('').substring(0, 50) + '...' : '',
        image: (img && img.length > 0) ? img[0].props.src : undefined,
        post: undefined
      })
    }
    return p
  }, [])
  return links
}*/
