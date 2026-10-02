import { useEffect, useState } from 'react'
import { choose, loadConfig, type PageConfig } from './config'
import './style.css'

const names = ['林知远', '周予安', '陈若川', '许清和', '沈言川']
const roles = ['独立开发者', '产品设计师', '软件工程师', '数字创作者', '研究助理']
const essays = [
  ['创造一块属于自己的数字花园', '从信息收集到日常写作，我如何维护一个可以持续生长的个人空间。'],
  ['少即是多，也是一种技术选择', '更少的依赖、更清晰的边界，以及那些经得起时间检验的简单方案。'],
  ['在项目之外保留好奇心', '阅读、散步与观察，常常比刻意寻找答案更接近答案。'],
  ['写给未来自己的年度备忘', '记录这一年的变化、没有完成的计划，以及仍然愿意相信的事情。'],
]

function Journal({ config }: { config: PageConfig }) {
  const name = choose(names, config.seed, 'name')
  const role = choose(roles, config.seed, 'role')
  return <main className="journal"><header><a href="#top" className="logo">{name}<small>FIELD NOTES</small></a><nav><a href="#writing">文章</a><a href="#notes">短记</a><a href="#about">关于</a></nav></header>
    <section className="intro" id="top"><p>ISSUE NO. {new Date().getFullYear()}</p><h1>写作是整理<br/><i>生活的方式</i></h1><div><span>一份关于创造、技术与日常观察的个人刊物。</span><b>{config.domain}</b></div></section>
    <section className="featured" id="writing"><div className="feature-number">01</div><article><span>本期文章 · 8 MIN READ</span><h2>{essays[0][0]}</h2><p>{essays[0][1]}</p><a href="#top">继续阅读 →</a></article><aside><blockquote>“长期写作不是展示答案，而是持续修正自己看待世界的方式。”</blockquote><small>— {name}，{role}</small></aside></section>
    <section className="archive" id="notes"><div className="archive-title"><p>THE ARCHIVE</p><h2>近期记录</h2></div><div>{essays.slice(1).map((essay, index) => <article key={essay[0]}><span>0{index + 2}</span><div><h3>{essay[0]}</h3><p>{essay[1]}</p></div><time>{['三月', '二月', '一月'][index]}</time></article>)}</div></section>
    <section className="bio" id="about"><span className="portrait">{name.slice(0, 1)}</span><div><p>ABOUT THE AUTHOR</p><h2>{name}</h2><span>一名{role}。关心清晰的表达、耐用的工具，以及技术如何帮助普通人创造自己的空间。</span></div></section>
    <footer><span>© {new Date().getFullYear()} {name}</span><span>{config.domain} · 独立发布</span></footer>
  </main>
}

export default function App() {
  const [config, setConfig] = useState<PageConfig | null>(null)
  useEffect(() => { loadConfig().then(setConfig) }, [])
  return config ? <Journal config={config} /> : <div className="loading">Loading</div>
}
