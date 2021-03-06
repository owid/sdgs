import * as React from 'react'

import {SiteHeader} from './SiteHeader'
import SiteFooter from './SiteFooter'
import {Head} from './Head'
import {sdgsUrl, absoluteSdgsUrl} from './settings'
import {formatSDG, parseMarkdown, stripMarkdown, firstParagraph} from './formatting'

export interface GoalPageProps {
    isPreview?: boolean
    slug: string
    goalNum: number
    name: string
    title: string
    description: string
    featuredImage: string
    body: string
}

export default class GoalPage extends React.Component<GoalPageProps> {
    body?: HTMLBodyElement
    // HACK (Mispy): Make chart embeds work in Netlify CMS preview
    /*componentDidMount() {
        const script = document.createElement("script")
        script.src = "https://ourworldindata.org/grapher/embedCharts.js"
        script.async = true
        this.body.appendChild(script)
    }*/

    render() {
        const {isPreview, slug, goalNum, name, title, description, featuredImage, body} = this.props

        const pageTitle = `${title}`
    
        return <html lang="en">
            <Head canonicalUrl={absoluteSdgsUrl(slug)} pageTitle={pageTitle} pageDesc={firstParagraph(stripMarkdown(description))} imageUrl={absoluteSdgsUrl(featuredImage)}/>
            <body ref={e => this.body = e as HTMLBodyElement}>
                <SiteHeader/>
                <article className="AboutPage">
                    <header className="container">
                        <div className="breadcrumb">
                            <span><a href={sdgsUrl("/")}>Sustainable Development Goals</a><span style={{"paddingLeft": ".5rem", "paddingRight": ".5rem"}}>/</span>{name}</span>
                        </div>
                    </header>
                    <div className="container">
                        <img src={sdgsUrl(featuredImage)}/>
                        <h1>{pageTitle}</h1>
                        {formatSDG(body, isPreview)}
                    </div>
                </article>
                <SiteFooter/>
            </body>
        </html>
    }
}
